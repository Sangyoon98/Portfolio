"use client";

import { useState, useEffect } from "react";
import SectionTitle from "@/components/SectionTitle";

// 방명록 항목 타입
type GuestbookEntry = {
  id: string;
  name: string;
  message: string;
  createdAt: string;
};

// 방명록 섹션 컴포넌트
export default function GuestbookSection() {
  const [entries, setEntries] = useState<GuestbookEntry[]>([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  // 방명록 목록 가져오기
  const fetchEntries = async () => {
    try {
      const response = await fetch("/api/guestbook");
      const data = await response.json();
      setEntries(data.entries || []);
    } catch (error) {
      console.error("Failed to fetch guestbook:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEntries();
  }, []);

  // 방명록 작성
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccess(false);
    setSubmitting(true);

    try {
      const response = await fetch("/api/guestbook", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, message }),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.error || "방명록 작성에 실패했습니다.");
        return;
      }

      setSuccess(true);
      setName("");
      setMessage("");
      // 목록 새로고침
      await fetchEntries();
      
      // 3초 후 성공 메시지 제거
      setTimeout(() => setSuccess(false), 3000);
    } catch (error) {
      setError("방명록 작성에 실패했습니다.");
    } finally {
      setSubmitting(false);
    }
  };

  // 날짜 포맷팅
  const formatDate = (dateString: string) => {
    try {
      const date = new Date(dateString);
      return date.toLocaleDateString("ko-KR", {
        year: "numeric",
        month: "long",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      });
    } catch {
      return dateString;
    }
  };

  return (
    <section
      id="guestbook"
      aria-labelledby="guestbook-title"
      className="bg-white dark:bg-white/[0.02] min-h-screen scroll-mt-14"
    >
      <div className="mx-auto max-w-4xl px-6 lg:px-8 py-24">
        <SectionTitle
          id="guestbook-title"
          title="Guestbook"
          description="방문해주셔서 감사합니다. 간단한 인사말을 남겨주세요!"
          className="mb-12"
        />

        {/* 방명록 작성 폼 */}
        <div className="mb-12 p-6 rounded-lg border border-black/5 dark:border-white/10 bg-white/70 dark:bg-white/[0.02]">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label
                htmlFor="name"
                className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300"
              >
                이름
              </label>
              <input
                type="text"
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                maxLength={50}
                required
                className="w-full px-4 py-2 rounded-lg border border-black/10 dark:border-white/15 bg-white dark:bg-white/[0.05] focus:outline-none focus:ring-2 focus:ring-purple-500 dark:focus:ring-purple-400"
                placeholder="이름을 입력해주세요"
              />
            </div>
            <div>
              <label
                htmlFor="message"
                className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300"
              >
                메시지
              </label>
              <textarea
                id="message"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                maxLength={500}
                required
                rows={4}
                className="w-full px-4 py-2 rounded-lg border border-black/10 dark:border-white/15 bg-white dark:bg-white/[0.05] focus:outline-none focus:ring-2 focus:ring-purple-500 dark:focus:ring-purple-400 resize-none"
                placeholder="메시지를 입력해주세요 (최대 500자)"
              />
              <div className="text-right text-xs text-gray-500 dark:text-gray-400 mt-1">
                {message.length}/500
              </div>
            </div>
            {error && (
              <div className="p-3 rounded-lg bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 text-sm">
                {error}
              </div>
            )}
            {success && (
              <div className="p-3 rounded-lg bg-green-50 dark:bg-green-900/20 text-green-600 dark:text-green-400 text-sm">
                방명록이 작성되었습니다!
              </div>
            )}
            <button
              type="submit"
              disabled={submitting}
              className="w-full px-6 py-3 rounded-lg bg-purple-600 dark:bg-purple-500 text-white font-medium hover:bg-purple-700 dark:hover:bg-purple-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {submitting ? "작성 중..." : "방명록 남기기"}
            </button>
          </form>
        </div>

        {/* 방명록 목록 */}
        {loading ? (
          <div className="text-center py-12">
            <p className="text-gray-600 dark:text-gray-400">방명록을 불러오는 중...</p>
          </div>
        ) : entries.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-600 dark:text-gray-400">
              아직 방명록이 없습니다. 첫 번째 방명록을 남겨주세요!
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            {entries.map((entry) => (
              <div
                key={entry.id}
                className="p-6 rounded-lg border border-black/5 dark:border-white/10 bg-white/70 dark:bg-white/[0.02] hover:bg-white/90 dark:hover:bg-white/[0.05] transition-all"
              >
                <div className="flex items-start justify-between mb-3">
                  <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200">
                    {entry.name}
                  </h3>
                  <span className="text-xs text-gray-500 dark:text-gray-400 whitespace-nowrap ml-4">
                    {formatDate(entry.createdAt)}
                  </span>
                </div>
                <p className="text-gray-700 dark:text-gray-300 whitespace-pre-wrap leading-relaxed">
                  {entry.message}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

