// 섹션 제목과 설명을 표시하는 공통 컴포넌트
type SectionTitleProps = {
  title: string;
  description?: string;
  id?: string;
  className?: string;
};

export default function SectionTitle({
  title,
  description,
  id,
  className = "",
}: SectionTitleProps) {
  return (
    <div className={className}>
      <h2
        id={id}
        className="text-2xl sm:text-3xl font-semibold tracking-tight"
      >
        {title}
      </h2>
      {description && (
        <p className="mt-2 text-base text-black/70 dark:text-white/70">
          {description}
        </p>
      )}
    </div>
  );
}

