"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { V4 } from "@/components/v4/Shell";

type Entry = { id: string; name: string; message: string; createdAt: string; updatedAt?: string };

// 이름 일부만 표시 (방명록 페이지와 같은 규칙)
function maskName(name: string) {
  if (!name) return name;
  if (name.length === 1) return name;
  if (name.length === 2) return name[0] + "*";
  return name[0] + "*".repeat(name.length - 2) + name[name.length - 1];
}
function fmt(d: string) {
  try {
    return new Date(d).toLocaleDateString("ko-KR", { year: "numeric", month: "long", day: "numeric" });
  } catch {
    return d;
  }
}

/** 홈 하단: 최근 방명록 3개 + 남기기 버튼 */
export default function GuestbookPreview() {
  const [entries, setEntries] = useState<Entry[] | null>(null);
  const [total, setTotal] = useState(0);
  useEffect(() => {
    fetch("/api/guestbook?limit=3&offset=0")
      .then((r) => r.json())
      .then((d) => { setEntries(d.entries ?? []); setTotal(d.total ?? 0); })
      .catch(() => setEntries([]));
  }, []);

  return (
    <div className="flex flex-col gap-6">
      <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
        {entries === null
          ? [0, 1, 2].map((i) => <div key={i} className={`${V4.card} h-[168px] animate-pulse bg-white/70`} />)
          : entries.length === 0
            ? (
              <div className={`${V4.card} p-7 text-[15px] text-[#7a7690] md:col-span-3`}>
                아직 첫 글이 없습니다. 첫 번째로 남겨주세요.
              </div>
            )
            : entries.map((e) => (
              <article key={e.id} className={`${V4.card} flex flex-col gap-3 p-6`}>
                <div className="flex items-center gap-3">
                  <span className="grid h-9 w-9 place-items-center rounded-full bg-[#ece9f8] text-[14px] font-bold text-[#5b4bd6]">{e.name.slice(0, 1)}</span>
                  <div>
                    <div className="text-[15px] font-semibold">{maskName(e.name)}</div>
                    <div className="text-[12px] text-[#a2a0b3]">{fmt(e.updatedAt || e.createdAt)}</div>
                  </div>
                </div>
                <p className="line-clamp-3 whitespace-pre-wrap text-[15px] leading-relaxed text-[#3a3750]">{e.message}</p>
              </article>
            ))}
      </div>
      <div className="flex flex-wrap items-center justify-between gap-4">
        <span className="text-[14px] text-[#7a7690]">{total > 3 ? `외 ${total - 3}개의 글이 더 있습니다.` : "방문해 주신 분 누구든 환영합니다."}</span>
        <Link href="/guestbook" className={V4.btn}>방명록 남기기 →</Link>
      </div>
    </div>
  );
}
