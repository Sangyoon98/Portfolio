import { NextResponse } from "next/server";
import { readFile, writeFile, mkdir } from "fs/promises";
import { existsSync } from "fs";
import path from "path";

// 방명록 데이터 타입
type GuestbookEntry = {
  id: string;
  name: string;
  message: string;
  createdAt: string;
};

// 데이터 파일 경로
const dataDir = path.join(process.cwd(), "data");
const dataFile = path.join(dataDir, "guestbook.json");

// 데이터 디렉토리 및 파일 초기화
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
  await ensureDataFile();
  try {
    const data = await readFile(dataFile, "utf-8");
    return JSON.parse(data);
  } catch {
    return [];
  }
}

// 방명록 데이터 쓰기
async function writeGuestbook(entries: GuestbookEntry[]) {
  await ensureDataFile();
  await writeFile(dataFile, JSON.stringify(entries, null, 2), "utf-8");
}

// GET: 방명록 목록 조회
export async function GET() {
  try {
    const entries = await readGuestbook();
    // 최신순으로 정렬
    const sortedEntries = entries.sort(
      (a, b) =>
        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    );
    return NextResponse.json({ entries: sortedEntries });
  } catch (error) {
    console.error("Error reading guestbook:", error);
    return NextResponse.json({ entries: [] }, { status: 500 });
  }
}

// POST: 방명록 작성
export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, message } = body;

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

    const entries = await readGuestbook();
    const newEntry: GuestbookEntry = {
      id: Date.now().toString(),
      name: name.trim(),
      message: message.trim(),
      createdAt: new Date().toISOString(),
    };

    entries.push(newEntry);
    await writeGuestbook(entries);

    return NextResponse.json({ success: true, entry: newEntry });
  } catch (error) {
    console.error("Error writing guestbook:", error);
    return NextResponse.json(
      { error: "방명록 작성에 실패했습니다." },
      { status: 500 }
    );
  }
}

// DELETE: 방명록 삭제 (인증 필요)
export async function DELETE(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");
    const password = searchParams.get("password");

    if (!id) {
      return NextResponse.json(
        { error: "삭제할 방명록 ID가 필요합니다." },
        { status: 400 }
      );
    }

    // 비밀번호 확인
    const adminPassword = process.env.GUESTBOOK_ADMIN_PASSWORD || "admin123";
    if (!password || password !== adminPassword) {
      return NextResponse.json(
        { error: "비밀번호가 올바르지 않습니다." },
        { status: 401 }
      );
    }

    const entries = await readGuestbook();
    const filteredEntries = entries.filter((entry) => entry.id !== id);

    if (entries.length === filteredEntries.length) {
      return NextResponse.json(
        { error: "해당 방명록을 찾을 수 없습니다." },
        { status: 404 }
      );
    }

    await writeGuestbook(filteredEntries);

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error deleting guestbook:", error);
    return NextResponse.json(
      { error: "방명록 삭제에 실패했습니다." },
      { status: 500 }
    );
  }
}
