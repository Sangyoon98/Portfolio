"use client";

import dynamic from "next/dynamic";

const LabScene = dynamic(() => import("@/components/lab/LabScene"), {
  ssr: false,
  loading: () => (
    <div className="h-screen grid place-items-center bg-[#0b0d12] text-white/50 text-sm">
      엔진 로딩 중…
    </div>
  ),
});

export default function LabPage() {
  return <LabScene />;
}
