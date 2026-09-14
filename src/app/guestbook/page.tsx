"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { V4, V4Head, V4Shell } from "@/components/v4/Shell";

// 방명록 항목 타입
type GuestbookEntry = {
  id: string;
  name: string;
  message: string;
  createdAt: string;
  updatedAt?: string;
};

// 방명록 페이지 컴포넌트
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

  const totalPages = Math.ceil(total / itemsPerPage);

  return (
    <V4Shell back={{ href: "/#guestbook", label: "홈" }}>
      <V4Head sub="Guestbook" title="방명록">
        <p className="mt-2 max-w-[640px] text-[17px] leading-relaxed text-[#3a3750]">
          함께 일했던 이야기도, 응원 한마디도, 그냥 지나가다 남기는 인사도 좋습니다. 이름은 일부만 표시됩니다.
        </p>
      </V4Head>

      <div className="mt-12 grid grid-cols-1 gap-8 lg:grid-cols-[400px_1fr]">
        {/* write */}
        <section className={`${V4.card} p-7 lg:sticky lg:top-24 lg:self-start`}>
          <h2 className={`${V4.eyebrow} mb-5`}>남기기</h2>
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <label className="flex flex-col gap-2 text-[14px] font-medium">
              이름
              <input type="text" value={name} onChange={(e) => setName(e.target.value)} maxLength={50} required className={V4.input} placeholder="어떻게 불러드릴까요?" />
            </label>
            <label className="flex flex-col gap-2 text-[14px] font-medium">
              메시지
              <textarea value={message} onChange={(e) => setMessage(e.target.value)} maxLength={500} required rows={5} className={`${V4.input} resize-none`} placeholder="함께한 기억, 전하고 싶은 말" />
              <span className="text-right text-[12px] font-normal text-[#a2a0b3]">{message.length}/500</span>
            </label>
            <label className="flex flex-col gap-2 text-[14px] font-medium">
              비밀번호 <span className="font-normal text-[#a2a0b3]">(선택 · 나중에 수정·삭제할 때)</span>
              <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} minLength={4} className={V4.input} placeholder="4자 이상" />
            </label>
            {error && !showPasswordModal && <div className="rounded-xl bg-[#ffe4ea] px-4 py-3 text-[14px] text-[#b3264a]">{error}</div>}
            {success && <div className="rounded-xl bg-[#dff6e8] px-4 py-3 text-[14px] text-[#1f6b45]">남겨주셔서 감사합니다!</div>}
            <button type="submit" disabled={submitting} className={`${V4.btn} mt-1 w-full`}>{submitting ? "남기는 중…" : "남기기"}</button>
          </form>
        </section>

        {/* list */}
        <section className="flex flex-col gap-4">
          <div className="flex items-baseline justify-between px-1">
            <h2 className={V4.eyebrow}>메시지</h2>
            {total > 0 && <span className="text-[13px] text-[#7a7690]">{total}개</span>}
          </div>

          {loading ? (
            <div className={`${V4.card} p-10 text-center text-[#7a7690]`}>불러오는 중…</div>
          ) : entries.length === 0 ? (
            <div className={`${V4.card} p-10 text-center text-[#7a7690]`}>아직 첫 메시지가 없습니다. 첫 번째로 남겨주세요.</div>
          ) : (
            entries.map((entry) => (
              <article key={entry.id} className={`${V4.card} group relative p-6 transition-transform duration-300 hover:-translate-y-0.5`}>
                <div className="mb-3 flex items-start justify-between gap-4">
                  <div className="flex items-center gap-3">
                    <span className="grid h-9 w-9 place-items-center rounded-full bg-[#ece9f8] text-[14px] font-bold text-[#5b4bd6]">{entry.name.slice(0, 1)}</span>
                    <div>
                      <div className="text-[15px] font-semibold">{maskName(entry.name)}</div>
                      <div className="text-[12px] text-[#a2a0b3]">
                        {formatDate(entry.updatedAt || entry.createdAt)}{entry.updatedAt && " · 수정됨"}
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-1 text-[12px] transition-opacity sm:opacity-0 sm:group-hover:opacity-100 sm:focus-within:opacity-100">
                    <button onClick={() => handleEditClick(entry)} disabled={editingId === entry.id} className="rounded-full px-2.5 py-1 text-[#5b4bd6] hover:bg-[#ece9f8] disabled:opacity-50">{editingId === entry.id ? "수정 중…" : "수정"}</button>
                    <button onClick={() => handleDeleteClick(entry.id)} disabled={deletingId === entry.id} className="rounded-full px-2.5 py-1 text-[#b3264a] hover:bg-[#ffe4ea] disabled:opacity-50">{deletingId === entry.id ? "삭제 중…" : "삭제"}</button>
                  </div>
                </div>
                <p className="whitespace-pre-wrap text-[15px] leading-[1.75] text-[#3a3750]">{entry.message}</p>
              </article>
            ))
          )}

          {hasMore && (
            <div ref={observerTarget} className="py-6 text-center sm:hidden">
              {loadingMore && <p className="text-[13px] text-[#7a7690]">더 불러오는 중…</p>}
            </div>
          )}

          {total > itemsPerPage && (
            <div className="hidden items-center justify-center gap-2 py-6 sm:flex">
              <button onClick={() => fetchEntries(false, currentPage - 1)} disabled={currentPage === 1 || loading} className={V4.btnGhost}>이전</button>
              <div className="flex items-center gap-1">
                {Array.from({ length: totalPages }, (_, i) => i + 1)
                  .filter((page) => totalPages <= 7 || page === 1 || page === totalPages || (page >= currentPage - 2 && page <= currentPage + 2))
                  .map((page, index, arr) => {
                    const prev = arr[index - 1];
                    return (
                      <div key={page} className="flex items-center gap-1">
                        {prev && page - prev > 1 && <span className="px-1 text-[#a2a0b3]">…</span>}
                        <button onClick={() => fetchEntries(false, page)} disabled={loading} className={`min-w-[40px] rounded-full px-3 py-2 text-[14px] font-medium transition-colors ${currentPage === page ? "bg-[#1c1b2e] text-white" : "bg-white text-[#3a3750] hover:bg-[#ece9f8]"}`}>{page}</button>
                      </div>
                    );
                  })}
              </div>
              <button onClick={() => fetchEntries(false, currentPage + 1)} disabled={currentPage >= totalPages || loading} className={V4.btnGhost}>다음</button>
            </div>
          )}
        </section>
      </div>

      {/* password modal */}
      {showPasswordModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#1c1b2e]/40 p-4 backdrop-blur-sm" onClick={(e) => { if (e.target === e.currentTarget) { setShowPasswordModal(false); setModalPassword(""); setEditMessage(""); setTargetId(null); setError(""); } }}>
          <div className={`${V4.card} w-full max-w-md p-7`} role="dialog" aria-modal="true">
            <h3 className="text-[22px] font-bold tracking-tight">{modalType === "delete" ? "메시지 삭제" : "메시지 수정"}</h3>
            <p className="mt-2 text-[14px] text-[#7a7690]">
              {modalType === "delete" ? "작성할 때 설정한 비밀번호 또는 관리자 비밀번호를 입력해주세요." : "작성할 때 설정한 비밀번호를 입력해주세요."}
            </p>
            <div className="mt-5 flex flex-col gap-4">
              {modalType === "edit" && (
                <label className="flex flex-col gap-2 text-[14px] font-medium">
                  메시지
                  <textarea value={editMessage} onChange={(e) => setEditMessage(e.target.value)} maxLength={500} required rows={5} className={`${V4.input} resize-none`} />
                  <span className="text-right text-[12px] font-normal text-[#a2a0b3]">{editMessage.length}/500</span>
                </label>
              )}
              <label className="flex flex-col gap-2 text-[14px] font-medium">
                비밀번호
                <input type="password" value={modalPassword} onChange={(e) => setModalPassword(e.target.value)} onKeyDown={(e) => { if (e.key === "Enter" && modalType === "delete") handlePasswordConfirm(); }} className={V4.input} placeholder="비밀번호" autoFocus />
              </label>
              {error && <div className="rounded-xl bg-[#ffe4ea] px-4 py-3 text-[14px] text-[#b3264a]">{error}</div>}
              <div className="flex justify-end gap-2">
                <button onClick={() => { setShowPasswordModal(false); setModalPassword(""); setEditMessage(""); setTargetId(null); setError(""); }} className={V4.btnGhost}>취소</button>
                <button
                  onClick={handlePasswordConfirm}
                  disabled={!modalPassword || (modalType === "edit" && !editMessage.trim()) || deletingId !== null || editingId !== null}
                  className={`${V4.btn} ${modalType === "delete" ? "!bg-[#b3264a] hover:!bg-[#8f1d3b]" : ""}`}
                >
                  {modalType === "delete" ? (deletingId ? "삭제 중…" : "삭제") : editingId ? "수정 중…" : "수정"}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </V4Shell>
  );
}

