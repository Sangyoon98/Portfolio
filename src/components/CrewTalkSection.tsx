"use client";

import { useState, useEffect, useMemo } from "react";
import { motion } from "framer-motion";
import Link from "next/link";

// Crew Talk 항목 타입
type CrewTalkEntry = {
  id: string;
  name: string;
  message: string;
  createdAt: string;
};

// 이름 마스킹 함수 (개인정보 보호)
function maskName(name: string): string {
  if (!name || name.length === 0) return name;
  
  const nameLength = name.length;
  
  // 2글자: 첫 글자만 보이게 (예: "김*")
  if (nameLength === 2) {
    return name[0] + "*";
  }
  
  // 3글자: 첫 글자와 마지막 글자만 보이게 (예: "김*수")
  if (nameLength === 3) {
    return name[0] + "*" + name[2];
  }
  
  // 4글자 이상: 첫 글자와 마지막 글자만 보이게 (예: "김*수", "이*영")
  if (nameLength >= 4) {
    return name[0] + "*".repeat(nameLength - 2) + name[nameLength - 1];
  }
  
  // 1글자: 그대로 표시
  return name;
}

// 말풍선 컴포넌트
function SpeechBubble({ entry, position }: { entry: CrewTalkEntry; position: { top: number; left: number; rotate: number } }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ 
        opacity: 0.7,
        scale: 1,
      }}
      transition={{
        duration: 0.5,
        ease: [0.22, 1, 0.36, 1],
      }}
      whileHover={{ 
        opacity: 1,
        scale: 1.05,
        zIndex: 50,
      }}
      className="absolute max-w-[280px] z-10"
      style={{
        top: `${position.top}%`,
        left: `${position.left}%`,
        transform: `rotate(${position.rotate}deg)`,
      }}
    >
      <Link
        href="/guestbook"
        className="block group"
      >
        <div className="relative bg-white/80 dark:bg-gray-800/80 backdrop-blur-md rounded-2xl p-4 shadow-xl border border-black/20 dark:border-white/20 hover:shadow-2xl transition-all">
          {/* 말풍선 꼬리 */}
          <div
            className="absolute -bottom-2 left-6 w-4 h-4 bg-white/80 dark:bg-gray-800/80 border-r border-b border-black/20 dark:border-white/20"
            style={{
              transform: "rotate(45deg)",
            }}
          />
          
          <div className="relative">
            <div className="flex items-center gap-2 mb-2">
              <span className="text-sm font-semibold text-gray-800 dark:text-gray-200">
                {maskName(entry.name)}
              </span>
            </div>
            <p className="text-sm text-gray-700 dark:text-gray-300 line-clamp-3 leading-relaxed">
              {entry.message}
            </p>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}

// 동료 평가 섹션 컴포넌트
export default function CrewTalkSection() {
  const [crewTalks, setCrewTalks] = useState<CrewTalkEntry[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // 최신 Crew Talk 최대 10개 가져오기
    const fetchCrewTalks = async () => {
      try {
        const response = await fetch("/api/guestbook?limit=10&offset=0");
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

  // 랜덤 위치 생성 (각 항목마다 고정)
  const positions = useMemo(() => {
    return crewTalks.map(() => ({
      top: 10 + Math.random() * 70, // 10% ~ 80%
      left: 5 + Math.random() * 85, // 5% ~ 90%
      rotate: -10 + Math.random() * 20, // -10도 ~ 10도
    }));
  }, [crewTalks.length]);

  if (loading) {
    return null;
  }

  if (crewTalks.length === 0) {
    return null;
  }

  return (
    <motion.section
      id="crew-talk"
      aria-labelledby="crew-talk-title"
      className="relative bg-[#f4f4f5] dark:bg-white/[0.04] scroll-mt-14 min-h-[600px] overflow-hidden"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{
        duration: 0.6,
        ease: [0.22, 1, 0.36, 1],
      }}
    >
      <div className="mx-auto max-w-7xl px-6 lg:px-8 py-24 relative">
        {/* 타이틀 */}
        <div className="text-center mb-16">
          <h2
            id="crew-talk-title"
            className="text-3xl sm:text-4xl font-semibold tracking-tight mb-4"
          >
            동료들이 평가한 나
          </h2>
          <div className="w-16 h-1 bg-purple-500 mx-auto mb-4"></div>
          <p className="text-base text-black/70 dark:text-white/70">
            함께 일한 동료들이 남긴 평가와 응원의 메시지입니다.
          </p>
        </div>

        {/* 말풍선들 */}
        <div className="relative min-h-[500px] hidden lg:block">
          {crewTalks.map((entry, index) => (
            <SpeechBubble
              key={entry.id}
              entry={entry}
              position={positions[index]}
            />
          ))}
        </div>

        {/* 모바일: 리스트 형태 */}
        <div className="lg:hidden space-y-4">
          {crewTalks.slice(0, 5).map((entry) => (
            <motion.div
              key={entry.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-md rounded-2xl p-4 shadow-lg border border-black/10 dark:border-white/10"
            >
              <div className="flex items-center gap-2 mb-2">
                <span className="text-sm font-semibold text-gray-800 dark:text-gray-200">
                  {maskName(entry.name)}
                </span>
              </div>
              <p className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed">
                {entry.message}
              </p>
            </motion.div>
          ))}
        </div>

        {/* 더보기 링크 */}
        <div className="text-center mt-12">
          <Link
            href="/guestbook"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-purple-600 dark:bg-purple-500 text-white font-medium hover:bg-purple-700 dark:hover:bg-purple-600 transition-colors"
          >
            Crew Talk 전체 보기
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5l7 7-7 7"
              />
            </svg>
          </Link>
        </div>
      </div>
    </motion.section>
  );
}

