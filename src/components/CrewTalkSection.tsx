"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

type CrewTalkEntry = {
  id: string;
  name: string;
  message: string;
  createdAt: string;
};

function maskName(name: string): string {
  if (!name || name.length === 0) return name;
  const nameLength = name.length;
  if (nameLength === 2) return name[0] + "*";
  if (nameLength === 3) return name[0] + "*" + name[2];
  if (nameLength >= 4) return name[0] + "*".repeat(nameLength - 2) + name[nameLength - 1];
  return name;
}

export default function CrewTalkSection() {
  const [crewTalks, setCrewTalks] = useState<CrewTalkEntry[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCrewTalks = async () => {
      try {
        const response = await fetch("/api/guestbook?limit=5&offset=0");
        const data = await response.json();
        if (data.entries && data.entries.length > 0) {
          setCrewTalks(data.entries);
        }
      } catch (error) {
        console.error("Failed to fetch crew talks:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchCrewTalks();
  }, []);

  if (loading || crewTalks.length === 0) {
    return null;
  }

  return (
    <section
      id="crew-talk"
      aria-labelledby="crew-talk-title"
      className="bg-[#f4f4f5] dark:bg-white/[0.04] scroll-mt-14"
    >
      <div className="mx-auto max-w-4xl px-6 lg:px-8 py-16 sm:py-24">
        <h2
          id="crew-talk-title"
          className="text-xl font-bold tracking-tight mb-6 pb-2 border-b border-black/10 dark:border-white/10"
        >
          Crew Talk
        </h2>

        <p className="text-sm text-black/60 dark:text-white/60 mb-6">
          함께 일한 동료들이 남긴 평가와 응원의 메시지입니다.
        </p>

        <div className="space-y-4">
          {crewTalks.map((entry) => (
            <div
              key={entry.id}
              className="p-4 rounded-lg border border-black/5 dark:border-white/10 bg-white/70 dark:bg-white/[0.02]"
            >
              <p className="text-sm font-medium mb-2">{maskName(entry.name)}</p>
              <p className="text-sm text-black/70 dark:text-white/70 leading-relaxed">
                {entry.message}
              </p>
            </div>
          ))}
        </div>

        <div className="mt-6">
          <Link
            href="/guestbook"
            className="text-sm text-purple-600 dark:text-purple-400 hover:underline underline-offset-4"
          >
            Crew Talk 전체 보기 →
          </Link>
        </div>
      </div>
    </section>
  );
}

