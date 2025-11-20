import { NextResponse } from "next/server";
import { kv } from "@vercel/kv";
import { readFile, writeFile, mkdir } from "fs/promises";
import { existsSync } from "fs";
import path from "path";
import bcrypt from "bcryptjs";

// 방명록 데이터 타입
type GuestbookEntry = {
  id: string;
  name: string;
  message: string;
  createdAt: string;
  updatedAt?: string;
  passwordHash?: string; // 작성자 비밀번호 해시
};

// Vercel KV 키
const GUESTBOOK_KEY = "guestbook:entries";

// 로컬 파일 시스템 경로 (fallback용)
const dataDir = path.join(process.cwd(), "data");
const dataFile = path.join(dataDir, "guestbook.json");

// Vercel KV 사용 가능 여부 확인
const isKVAvailable = () => {
  return !!(process.env.KV_REST_API_URL && process.env.KV_REST_API_TOKEN);
};

// 로컬 파일 시스템 초기화
async function ensureDataFile() {
  if (!existsSync(dataDir)) {
    await mkdir(dataDir, { recursive: true });
  }
  if (!existsSync(dataFile)) {
    await writeFile(dataFile, JSON.stringify([], null, 2), "utf-8");
  }
}

// 방명록 데이터 읽기
async function readGuestbook(): Promise<GuestbookEntry[]> {
  try {
    // Vercel KV가 설정되어 있으면 사용
    if (isKVAvailable()) {
      const entries = await kv.get<GuestbookEntry[]>(GUESTBOOK_KEY);
      return entries || [];
    }
    // 배포 환경에서는 KV가 필수
    if (process.env.VERCEL || process.env.NODE_ENV === "production") {
      console.error(
        "Vercel KV가 설정되지 않았습니다. 환경 변수를 확인해주세요."
      );
      return [];
    }
    // 로컬 개발 환경에서만 파일 시스템 사용
    await ensureDataFile();
    const data = await readFile(dataFile, "utf-8");
    return JSON.parse(data);
  } catch (error) {
    console.error("Error reading guestbook:", error);
    return [];
  }
}

// 방명록 데이터 쓰기
async function writeGuestbook(entries: GuestbookEntry[]) {
  try {
    // Vercel KV가 설정되어 있으면 사용
    if (isKVAvailable()) {
      await kv.set(GUESTBOOK_KEY, entries);
      return;
    }
    // 배포 환경에서는 KV가 필수
    if (process.env.VERCEL || process.env.NODE_ENV === "production") {
      throw new Error(
        "Vercel KV가 설정되지 않았습니다. Vercel 대시보드에서 KV를 생성하고 환경 변수를 확인해주세요."
      );
    }
    // 로컬 개발 환경에서만 파일 시스템 사용
    await ensureDataFile();
    await writeFile(dataFile, JSON.stringify(entries, null, 2), "utf-8");
  } catch (error) {
    console.error("Error writing guestbook:", error);
    const errorMessage =
      error instanceof Error ? error.message : "알 수 없는 오류";
    throw new Error(`데이터 저장 실패: ${errorMessage}`);
  }
}

// GET: 방명록 목록 조회 (페이징 지원)
export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const limit = parseInt(searchParams.get("limit") || "20", 10);
    const offset = parseInt(searchParams.get("offset") || "0", 10);

    const entries = await readGuestbook();
    // 최신순으로 정렬
    const sortedEntries = entries.sort(
      (a, b) =>
        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    );

    // 페이징 처리
    const paginatedEntries = sortedEntries.slice(offset, offset + limit);
    const hasMore = offset + limit < sortedEntries.length;

    return NextResponse.json({
      entries: paginatedEntries,
      total: sortedEntries.length,
      hasMore,
    });
  } catch (error) {
    console.error("Error reading guestbook:", error);
    return NextResponse.json(
      { entries: [], total: 0, hasMore: false },
      { status: 500 }
    );
  }
}

// POST: Crew Talk 작성
export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, message, password } = body;

    // 입력 검증
    if (
      !name ||
      !message ||
      name.trim().length === 0 ||
      message.trim().length === 0
    ) {
      return NextResponse.json(
        { error: "이름과 메시지를 입력해주세요." },
        { status: 400 }
      );
    }

    if (name.length > 50) {
      return NextResponse.json(
        { error: "이름은 50자 이하로 입력해주세요." },
        { status: 400 }
      );
    }

    if (message.length > 500) {
      return NextResponse.json(
        { error: "메시지는 500자 이하로 입력해주세요." },
        { status: 400 }
      );
    }

    // 비밀번호 해시 생성 (선택사항)
    let passwordHash: string | undefined;
    if (password && password.trim().length > 0) {
      if (password.length < 4) {
        return NextResponse.json(
          { error: "비밀번호는 4자 이상 입력해주세요." },
          { status: 400 }
        );
      }
      passwordHash = await bcrypt.hash(password.trim(), 10);
    }

    const entries = await readGuestbook();
    const newEntry: GuestbookEntry = {
      id: Date.now().toString(),
      name: name.trim(),
      message: message.trim(),
      createdAt: new Date().toISOString(),
      passwordHash,
    };

    entries.push(newEntry);
    await writeGuestbook(entries);

    // 응답 시 비밀번호 해시 제외
    const entryResponse = {
      id: newEntry.id,
      name: newEntry.name,
      message: newEntry.message,
      createdAt: newEntry.createdAt,
    };
    return NextResponse.json({ success: true, entry: entryResponse });
  } catch (error) {
    console.error("Error writing guestbook:", error);
    const errorMessage =
      error instanceof Error ? error.message : "작성에 실패했습니다.";
    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
}

// PUT: Crew Talk 수정
export async function PUT(request: Request) {
  try {
    const body = await request.json();
    const { id, message, password } = body;

    if (!id || !message) {
      return NextResponse.json(
        { error: "ID와 메시지가 필요합니다." },
        { status: 400 }
      );
    }

    if (message.trim().length === 0) {
      return NextResponse.json(
        { error: "메시지를 입력해주세요." },
        { status: 400 }
      );
    }

    if (message.length > 500) {
      return NextResponse.json(
        { error: "메시지는 500자 이하로 입력해주세요." },
        { status: 400 }
      );
    }

    if (!password) {
      return NextResponse.json(
        { error: "비밀번호를 입력해주세요." },
        { status: 400 }
      );
    }

    const entries = await readGuestbook();
    const entryIndex = entries.findIndex((entry) => entry.id === id);

    if (entryIndex === -1) {
      return NextResponse.json(
        { error: "해당 항목을 찾을 수 없습니다." },
        { status: 404 }
      );
    }

    const entry = entries[entryIndex];

    // 비밀번호 확인
    if (entry.passwordHash) {
      const isValid = await bcrypt.compare(password, entry.passwordHash);
      if (!isValid) {
        return NextResponse.json(
          { error: "비밀번호가 올바르지 않습니다." },
          { status: 401 }
        );
      }
    } else {
      return NextResponse.json(
        { error: "이 항목은 수정할 수 없습니다." },
        { status: 403 }
      );
    }

    // 메시지 업데이트
    entries[entryIndex] = {
      ...entry,
      message: message.trim(),
      updatedAt: new Date().toISOString(),
    };

    await writeGuestbook(entries);

    const updatedEntry = {
      id: entries[entryIndex].id,
      name: entries[entryIndex].name,
      message: entries[entryIndex].message,
      createdAt: entries[entryIndex].createdAt,
      updatedAt: entries[entryIndex].updatedAt,
    };
    return NextResponse.json({ success: true, entry: updatedEntry });
  } catch (error) {
    console.error("Error updating guestbook:", error);
    const errorMessage =
      error instanceof Error ? error.message : "수정에 실패했습니다.";
    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
}

// DELETE: Crew Talk 삭제 (작성자 또는 관리자)
export async function DELETE(request: Request) {
  try {
    const body = await request.json();
    const { id, password } = body;

    if (!id) {
      return NextResponse.json(
        { error: "삭제할 항목 ID가 필요합니다." },
        { status: 400 }
      );
    }

    if (!password) {
      return NextResponse.json(
        { error: "비밀번호를 입력해주세요." },
        { status: 400 }
      );
    }

    const entries = await readGuestbook();
    const entry = entries.find((e) => e.id === id);

    if (!entry) {
      return NextResponse.json(
        { error: "해당 항목을 찾을 수 없습니다." },
        { status: 404 }
      );
    }

    // 관리자 비밀번호 확인
    const adminPassword = process.env.GUESTBOOK_ADMIN_PASSWORD || "admin123";
    const isAdmin = password === adminPassword;

    // 작성자 비밀번호 확인
    let isAuthor = false;
    if (entry.passwordHash) {
      isAuthor = await bcrypt.compare(password, entry.passwordHash);
    }

    if (!isAdmin && !isAuthor) {
      return NextResponse.json(
        { error: "비밀번호가 올바르지 않습니다." },
        { status: 401 }
      );
    }

    const filteredEntries = entries.filter((entry) => entry.id !== id);
    await writeGuestbook(filteredEntries);

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error deleting guestbook:", error);
    const errorMessage =
      error instanceof Error ? error.message : "삭제에 실패했습니다.";
    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
}
