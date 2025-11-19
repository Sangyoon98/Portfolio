"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { profile } from "@/data/portfolio";

// 방명록 항목 타입
type GuestbookEntry = {
  id: string;
  name: string;
  message: string;
  createdAt: string;
};

// 방명록 페이지 컴포넌트
export default function GuestbookPage() {
  const [entries, setEntries] = useState<GuestbookEntry[]>([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const [password, setPassword] = useState("");
  const [targetDeleteId, setTargetDeleteId] = useState<string | null>(null);

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

  // 방명록 삭제 버튼 클릭
  const handleDeleteClick = (id: string) => {
    setTargetDeleteId(id);
    setShowPasswordModal(true);
    setPassword("");
    setError("");
  };

  // 비밀번호 확인 후 삭제
  const handleDeleteConfirm = async () => {
    if (!targetDeleteId || !password) {
      setError("비밀번호를 입력해주세요.");
      return;
    }

    setDeletingId(targetDeleteId);
    setError("");
    try {
      const response = await fetch(
        `/api/guestbook?id=${targetDeleteId}&password=${encodeURIComponent(password)}`,
        {
          method: "DELETE",
        }
      );

      const data = await response.json();

      if (!response.ok) {
        setError(data.error || "방명록 삭제에 실패했습니다.");
        setDeletingId(null);
        return;
      }

      // 성공 시 모달 닫기 및 목록 새로고침
      setShowPasswordModal(false);
      setPassword("");
      setTargetDeleteId(null);
      await fetchEntries();
    } catch (error) {
      setError("방명록 삭제에 실패했습니다.");
    } finally {
      setDeletingId(null);
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
    <div className="min-h-screen bg-white dark:bg-white/[0.02]">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-background/80 backdrop-blur border-b border-black/5 dark:border-white/10">
        <nav className="mx-auto max-w-7xl px-6 lg:px-8 h-16 flex items-center justify-between">
          <Link href="/" className="text-base font-semibold tracking-tight">
            {profile.name}
          </Link>
          <Link
            href="/"
            className="text-base hover:underline underline-offset-4"
          >
            ← 포트폴리오로
          </Link>
        </nav>
      </header>

      {/* Main Content */}
      <main className="mx-auto max-w-4xl px-6 lg:px-8 py-24">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        >
          <h1 className="text-4xl sm:text-5xl font-semibold tracking-tight mb-4">
            Guestbook
          </h1>
          <p className="text-lg text-black/70 dark:text-white/70 mb-12">
            방문해주셔서 감사합니다. 간단한 인사말을 남겨주세요!
          </p>

          {/* 방명록 작성 폼 */}
          <motion.div
            className="mb-12 p-6 rounded-lg border border-black/5 dark:border-white/10 bg-white/70 dark:bg-white/[0.02]"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
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
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="p-3 rounded-lg bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 text-sm"
                >
                  {error}
                </motion.div>
              )}
              {success && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="p-3 rounded-lg bg-green-50 dark:bg-green-900/20 text-green-600 dark:text-green-400 text-sm"
                >
                  방명록이 작성되었습니다!
                </motion.div>
              )}
              <button
                type="submit"
                disabled={submitting}
                className="w-full px-6 py-3 rounded-lg bg-purple-600 dark:bg-purple-500 text-white font-medium hover:bg-purple-700 dark:hover:bg-purple-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {submitting ? "작성 중..." : "방명록 남기기"}
              </button>
            </form>
          </motion.div>

          {/* 방명록 목록 */}
          {loading ? (
            <div className="text-center py-12">
              <p className="text-gray-600 dark:text-gray-400">
                방명록을 불러오는 중...
              </p>
            </div>
          ) : entries.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-600 dark:text-gray-400">
                아직 방명록이 없습니다. 첫 번째 방명록을 남겨주세요!
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              <h2 className="text-2xl font-semibold mb-6">방명록 목록</h2>
              <AnimatePresence>
                {entries.map((entry, index) => (
                  <motion.div
                    key={entry.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.3, delay: index * 0.05 }}
                    className="p-6 rounded-lg border border-black/5 dark:border-white/10 bg-white/70 dark:bg-white/[0.02] hover:bg-white/90 dark:hover:bg-white/[0.05] transition-all relative group"
                  >
                    <div className="flex items-start justify-between mb-3">
                      <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200">
                        {entry.name}
                      </h3>
                      <div className="flex items-center gap-3">
                        <span className="text-xs text-gray-500 dark:text-gray-400 whitespace-nowrap">
                          {formatDate(entry.createdAt)}
                        </span>
                        <button
                          onClick={() => handleDeleteClick(entry.id)}
                          disabled={deletingId === entry.id}
                          className="opacity-0 group-hover:opacity-100 transition-opacity px-2 py-1 text-xs text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 rounded disabled:opacity-50"
                          title="삭제"
                        >
                          {deletingId === entry.id ? "삭제 중..." : "삭제"}
                        </button>
                      </div>
                    </div>
                    <p className="text-gray-700 dark:text-gray-300 whitespace-pre-wrap leading-relaxed">
                      {entry.message}
                    </p>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          )}
        </motion.div>
      </main>

      {/* 비밀번호 확인 모달 */}
      {showPasswordModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="bg-white dark:bg-gray-800 rounded-lg p-6 max-w-md w-full mx-4 shadow-xl"
          >
            <h3 className="text-lg font-semibold mb-4 text-gray-800 dark:text-gray-200">
              방명록 삭제
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
              방명록을 삭제하려면 관리자 비밀번호를 입력해주세요.
            </p>
            <div className="space-y-4">
              <div>
                <label
                  htmlFor="delete-password"
                  className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300"
                >
                  비밀번호
                </label>
                <input
                  type="password"
                  id="delete-password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      handleDeleteConfirm();
                    }
                  }}
                  className="w-full px-4 py-2 rounded-lg border border-black/10 dark:border-white/15 bg-white dark:bg-white/[0.05] focus:outline-none focus:ring-2 focus:ring-purple-500 dark:focus:ring-purple-400"
                  placeholder="비밀번호를 입력하세요"
                  autoFocus
                />
              </div>
              {error && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="p-3 rounded-lg bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 text-sm"
                >
                  {error}
                </motion.div>
              )}
              <div className="flex gap-3 justify-end">
                <button
                  onClick={() => {
                    setShowPasswordModal(false);
                    setPassword("");
                    setTargetDeleteId(null);
                    setError("");
                  }}
                  className="px-4 py-2 rounded-lg border border-black/10 dark:border-white/15 bg-white dark:bg-white/[0.05] hover:bg-gray-50 dark:hover:bg-white/[0.1] transition-colors"
                >
                  취소
                </button>
                <button
                  onClick={handleDeleteConfirm}
                  disabled={!password || deletingId !== null}
                  className="px-4 py-2 rounded-lg bg-red-600 dark:bg-red-500 text-white font-medium hover:bg-red-700 dark:hover:bg-red-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {deletingId ? "삭제 중..." : "삭제"}
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
}

