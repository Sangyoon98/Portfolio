"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import Link from "next/link";
import { profile } from "@/data/portfolio";

// Crew Talk 항목 타입
type GuestbookEntry = {
  id: string;
  name: string;
  message: string;
  createdAt: string;
  updatedAt?: string;
};

// Crew Talk 페이지 컴포넌트
export default function GuestbookPage() {
  const [entries, setEntries] = useState<GuestbookEntry[]>([]);
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [offset, setOffset] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [total, setTotal] = useState(0);
  const [submitting, setSubmitting] = useState(false);
  const itemsPerPage = 10;
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const [modalPassword, setModalPassword] = useState("");
  const [targetId, setTargetId] = useState<string | null>(null);
  const [modalType, setModalType] = useState<"delete" | "edit">("delete");
  const [editMessage, setEditMessage] = useState("");
  const observerTarget = useRef<HTMLDivElement>(null);

  // 방명록 목록 가져오기
  const fetchEntries = async (reset = false, page?: number) => {
    try {
      let currentOffset: number;
      let currentPageNum: number;

      if (page !== undefined) {
        // 페이지 번호로 직접 이동 (데스크톱)
        currentPageNum = page;
        currentOffset = (page - 1) * itemsPerPage;
        setCurrentPage(page);
      } else if (reset) {
        // 초기 로드 또는 리셋
        currentPageNum = 1;
        currentOffset = 0;
        setCurrentPage(1);
      } else {
        // 무한 스크롤 (모바일)
        currentOffset = offset;
        currentPageNum = currentPage;
      }

      const response = await fetch(
        `/api/guestbook?limit=${itemsPerPage}&offset=${currentOffset}`
      );
      const data = await response.json();

      if (reset || page !== undefined) {
        setEntries(data.entries || []);
        setOffset((page || 1) * itemsPerPage);
      } else {
        // 무한 스크롤: 기존 항목에 추가
        setEntries((prev) => [...prev, ...(data.entries || [])]);
        setOffset((prev) => prev + itemsPerPage);
      }
      setHasMore(data.hasMore || false);
      setTotal(data.total || 0);
    } catch (error) {
      console.error("Failed to fetch guestbook:", error);
    } finally {
      setLoading(false);
      setLoadingMore(false);
    }
  };

  // 무한 스크롤: 추가 데이터 로드
  const loadMore = useCallback(async () => {
    if (loadingMore || !hasMore) return;
    setLoadingMore(true);
    await fetchEntries(false);
  }, [loadingMore, hasMore, offset]);

  // Intersection Observer로 스크롤 감지
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasMore && !loadingMore) {
          loadMore();
        }
      },
      { threshold: 0.1 }
    );

    const currentTarget = observerTarget.current;
    if (currentTarget) {
      observer.observe(currentTarget);
    }

    return () => {
      if (currentTarget) {
        observer.unobserve(currentTarget);
      }
    };
  }, [hasMore, loadingMore, loadMore]);

  useEffect(() => {
    fetchEntries(true);
  }, []);

  // Crew Talk 작성
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
        body: JSON.stringify({ name, message, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.error || "작성에 실패했습니다.");
        return;
      }

      setSuccess(true);
      setName("");
      setMessage("");
      setPassword("");
      // 목록 새로고침
      setOffset(0);
      setCurrentPage(1);
      await fetchEntries(true);
      
      // 3초 후 성공 메시지 제거
      setTimeout(() => setSuccess(false), 3000);
    } catch (error) {
      setError("작성에 실패했습니다.");
    } finally {
      setSubmitting(false);
    }
  };

  // 삭제 버튼 클릭
  const handleDeleteClick = (id: string) => {
    setTargetId(id);
    setModalType("delete");
    setShowPasswordModal(true);
    setModalPassword("");
    setError("");
  };

  // 수정 버튼 클릭
  const handleEditClick = (entry: GuestbookEntry) => {
    setTargetId(entry.id);
    setEditMessage(entry.message);
    setModalType("edit");
    setShowPasswordModal(true);
    setModalPassword("");
    setError("");
  };

  // 비밀번호 확인 후 삭제/수정
  const handlePasswordConfirm = async () => {
    if (!targetId || !modalPassword) {
      setError("비밀번호를 입력해주세요.");
      return;
    }

    if (modalType === "edit" && !editMessage.trim()) {
      setError("메시지를 입력해주세요.");
      return;
    }

    if (modalType === "edit" && editMessage.length > 500) {
      setError("메시지는 500자 이하로 입력해주세요.");
      return;
    }

    setDeletingId(modalType === "delete" ? targetId : null);
    setEditingId(modalType === "edit" ? targetId : null);
    setError("");

    try {
      if (modalType === "delete") {
        const response = await fetch("/api/guestbook", {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            id: targetId,
            password: modalPassword,
          }),
        });

        const data = await response.json();

        if (!response.ok) {
          setError(data.error || "삭제에 실패했습니다.");
          setDeletingId(null);
          return;
        }
      } else {
        const response = await fetch("/api/guestbook", {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            id: targetId,
            message: editMessage.trim(),
            password: modalPassword,
          }),
        });

        const data = await response.json();

        if (!response.ok) {
          setError(data.error || "수정에 실패했습니다.");
          setEditingId(null);
          return;
        }
      }

      // 성공 시 모달 닫기 및 목록 새로고침
      setShowPasswordModal(false);
      setModalPassword("");
      setEditMessage("");
      setTargetId(null);
      setOffset(0);
      setCurrentPage(1);
      await fetchEntries(true);
    } catch (error) {
      setError(modalType === "delete" ? "삭제에 실패했습니다." : "수정에 실패했습니다.");
    } finally {
      setDeletingId(null);
      setEditingId(null);
    }
  };

  // 이름 마스킹 함수 (개인정보 보호)
  const maskName = (name: string): string => {
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
    <div className="bg-white dark:bg-white/[0.02]">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-background/80 backdrop-blur border-b border-black/5 dark:border-white/10">
        <nav className="mx-auto max-w-4xl px-6 lg:px-8 h-14 flex items-center justify-between">
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
        <div>
          <h1 className="text-4xl sm:text-5xl font-semibold tracking-tight mb-4">
            Crew Talk
          </h1>
          <p className="text-lg text-black/70 dark:text-white/70 mb-12">
            함께 일한 경험이 있으시다면 한마디 남겨주세요!
          </p>

          {/* Crew Talk 작성 폼 */}
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
              <div>
                <label
                  htmlFor="password"
                  className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300"
                >
                  비밀번호 (선택사항)
                </label>
                <input
                  type="password"
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  minLength={4}
                  className="w-full px-4 py-2 rounded-lg border border-black/10 dark:border-white/15 bg-white dark:bg-white/[0.05] focus:outline-none focus:ring-2 focus:ring-purple-500 dark:focus:ring-purple-400"
                  placeholder="나중에 수정/삭제할 때 사용할 비밀번호 (4자 이상)"
                />
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                  비밀번호를 설정하면 나중에 본인의 글을 수정하거나 삭제할 수 있습니다.
                </p>
              </div>
              {error && (
                <div className="p-3 rounded-lg bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 text-sm">
                  {error}
                </div>
              )}
              {success && (
                <div className="p-3 rounded-lg bg-green-50 dark:bg-green-900/20 text-green-600 dark:text-green-400 text-sm">
                  작성되었습니다!
                </div>
              )}
              <button
                type="submit"
                disabled={submitting}
                className="w-full px-6 py-3 rounded-lg bg-purple-600 dark:bg-purple-500 text-white font-medium hover:bg-purple-700 dark:hover:bg-purple-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {submitting ? "작성 중..." : "작성하기"}
              </button>
            </form>
          </div>

          {/* Crew Talk 목록 */}
          {loading ? (
            <div className="text-center py-12">
              <p className="text-gray-600 dark:text-gray-400">
                불러오는 중...
              </p>
            </div>
          ) : entries.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-600 dark:text-gray-400">
                아직 작성된 글이 없습니다. 첫 번째 글을 남겨주세요!
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              <h2 className="text-2xl font-semibold mb-6">Crew Talk</h2>
              {entries.map((entry) => (
                <div
                  key={entry.id}
                  className="p-6 rounded-lg border border-black/5 dark:border-white/10 bg-white/70 dark:bg-white/[0.02] hover:bg-white/90 dark:hover:bg-white/[0.05] transition-all relative group"
                >
                  <div className="flex items-start justify-between mb-3">
                    <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200">
                      {maskName(entry.name)}
                    </h3>
                    <div className="flex items-center gap-3">
                      <span className="text-xs text-gray-500 dark:text-gray-400 whitespace-nowrap">
                        {formatDate(entry.updatedAt || entry.createdAt)}
                        {entry.updatedAt && (
                          <span className="ml-1 text-gray-400">(수정됨)</span>
                        )}
                      </span>
                      <div className="hidden group-hover:flex items-center gap-2">
                        <button
                          onClick={() => handleEditClick(entry)}
                          disabled={editingId === entry.id}
                          className="px-2 py-1 text-xs text-blue-600 dark:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded disabled:opacity-50 transition-all"
                          title="수정"
                        >
                          {editingId === entry.id ? "수정 중..." : "수정"}
                        </button>
                        <button
                          onClick={() => handleDeleteClick(entry.id)}
                          disabled={deletingId === entry.id}
                          className="px-2 py-1 text-xs text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 rounded disabled:opacity-50 transition-all"
                          title="삭제"
                        >
                          {deletingId === entry.id ? "삭제 중..." : "삭제"}
                        </button>
                      </div>
                    </div>
                  </div>
                  <p className="text-gray-700 dark:text-gray-300 whitespace-pre-wrap leading-relaxed">
                    {entry.message}
                  </p>
                </div>
              ))}

            {/* 무한 스크롤 트리거 (모바일) */}
            {hasMore && (
              <div
                ref={observerTarget}
                className="py-8 text-center sm:hidden"
              >
                {loadingMore && (
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    더 불러오는 중...
                  </p>
                )}
              </div>
            )}

            {/* 데스크톱: 페이지네이션 */}
            {total > itemsPerPage && (
              <div className="hidden sm:flex items-center justify-center gap-2 py-8">
                <button
                  onClick={() => fetchEntries(false, currentPage - 1)}
                  disabled={currentPage === 1 || loading}
                  className="px-4 py-2 rounded-lg border border-black/10 dark:border-white/15 bg-white dark:bg-white/[0.05] hover:bg-gray-50 dark:hover:bg-white/[0.1] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  이전
                </button>

                <div className="flex items-center gap-1">
                  {Array.from(
                    { length: Math.ceil(total / itemsPerPage) },
                    (_, i) => i + 1
                  )
                    .filter((page) => {
                      // 현재 페이지 주변 2페이지씩만 표시
                      const totalPages = Math.ceil(total / itemsPerPage);
                      if (totalPages <= 7) return true; // 전체 페이지가 7개 이하면 모두 표시
                      if (page === 1 || page === totalPages) return true; // 첫 페이지와 마지막 페이지
                      return (
                        page >= currentPage - 2 && page <= currentPage + 2
                      );
                    })
                    .map((page, index, array) => {
                      // 생략 표시 추가
                      const prevPage = array[index - 1];
                      const showEllipsis = prevPage && page - prevPage > 1;

                      return (
                        <div key={page} className="flex items-center gap-1">
                          {showEllipsis && (
                            <span className="px-2 text-gray-500 dark:text-gray-400">
                              ...
                            </span>
                          )}
                          <button
                            onClick={() => fetchEntries(false, page)}
                            disabled={loading}
                            className={`min-w-[40px] px-3 py-2 rounded-lg border transition-colors disabled:opacity-50 disabled:cursor-not-allowed ${
                              currentPage === page
                                ? "bg-purple-600 dark:bg-purple-500 text-white border-purple-600 dark:border-purple-500"
                                : "border-black/10 dark:border-white/15 bg-white dark:bg-white/[0.05] hover:bg-gray-50 dark:hover:bg-white/[0.1]"
                            }`}
                          >
                            {page}
                          </button>
                        </div>
                      );
                    })}
                </div>

                <button
                  onClick={() => fetchEntries(false, currentPage + 1)}
                  disabled={
                    currentPage >= Math.ceil(total / itemsPerPage) || loading
                  }
                  className="px-4 py-2 rounded-lg border border-black/10 dark:border-white/15 bg-white dark:bg-white/[0.05] hover:bg-gray-50 dark:hover:bg-white/[0.1] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  다음
                </button>
              </div>
            )}
          </div>
        )}
      </div>
      </main>

      {/* 비밀번호 확인 모달 */}
      {showPasswordModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
          <div className="bg-white dark:bg-gray-800 rounded-lg p-6 max-w-md w-full mx-4 shadow-xl">
            <h3 className="text-lg font-semibold mb-4 text-gray-800 dark:text-gray-200">
              {modalType === "delete" ? "삭제" : "수정"}
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
              {modalType === "delete"
                ? "작성 시 설정한 비밀번호 또는 관리자 비밀번호를 입력해주세요."
                : "작성 시 설정한 비밀번호를 입력해주세요."}
            </p>
            <div className="space-y-4">
              {modalType === "edit" && (
                <div>
                  <label
                    htmlFor="edit-message"
                    className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300"
                  >
                    메시지
                  </label>
                  <textarea
                    id="edit-message"
                    value={editMessage}
                    onChange={(e) => setEditMessage(e.target.value)}
                    maxLength={500}
                    required
                    rows={4}
                    className="w-full px-4 py-2 rounded-lg border border-black/10 dark:border-white/15 bg-white dark:bg-white/[0.05] focus:outline-none focus:ring-2 focus:ring-purple-500 dark:focus:ring-purple-400 resize-none"
                    placeholder="메시지를 입력해주세요 (최대 500자)"
                  />
                  <div className="text-right text-xs text-gray-500 dark:text-gray-400 mt-1">
                    {editMessage.length}/500
                  </div>
                </div>
              )}
              <div>
                <label
                  htmlFor="modal-password"
                  className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300"
                >
                  비밀번호
                </label>
                <input
                  type="password"
                  id="modal-password"
                  value={modalPassword}
                  onChange={(e) => setModalPassword(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" && modalType === "delete") {
                      handlePasswordConfirm();
                    }
                  }}
                  className="w-full px-4 py-2 rounded-lg border border-black/10 dark:border-white/15 bg-white dark:bg-white/[0.05] focus:outline-none focus:ring-2 focus:ring-purple-500 dark:focus:ring-purple-400"
                  placeholder="비밀번호를 입력하세요"
                  autoFocus
                />
              </div>
              {error && (
                <div className="p-3 rounded-lg bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 text-sm">
                  {error}
                </div>
              )}
              <div className="flex gap-3 justify-end">
                <button
                  onClick={() => {
                    setShowPasswordModal(false);
                    setModalPassword("");
                    setEditMessage("");
                    setTargetId(null);
                    setError("");
                  }}
                  className="px-4 py-2 rounded-lg border border-black/10 dark:border-white/15 bg-white dark:bg-white/[0.05] hover:bg-gray-50 dark:hover:bg-white/[0.1] transition-colors"
                >
                  취소
                </button>
                <button
                  onClick={handlePasswordConfirm}
                  disabled={
                    !modalPassword ||
                    (modalType === "edit" && !editMessage.trim()) ||
                    deletingId !== null ||
                    editingId !== null
                  }
                  className={`px-4 py-2 rounded-lg text-white font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed ${
                    modalType === "delete"
                      ? "bg-red-600 dark:bg-red-500 hover:bg-red-700 dark:hover:bg-red-600"
                      : "bg-blue-600 dark:bg-blue-500 hover:bg-blue-700 dark:hover:bg-blue-600"
                  }`}
                >
                  {modalType === "delete"
                    ? deletingId
                      ? "삭제 중..."
                      : "삭제"
                    : editingId
                    ? "수정 중..."
                    : "수정"}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

