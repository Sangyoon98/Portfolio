type Props = {
  text: string;
  className?: string;
};

function renderBold(line: string) {
  // Split by **bold** tokens and wrap them in <strong>
  const parts = line.split(/(\*\*[^*]+\*\*)/g);
  return parts.map((part, i) => {
    const isBold = part.startsWith("**") && part.endsWith("**");
    if (isBold) {
      const content = part.slice(2, -2);
      return (
        <strong key={`b-${i}`}>{content}</strong>
      );
    }
    return <span key={`t-${i}`}>{part}</span>;
  });
}

export default function RichText({ text, className = "" }: Props) {
  const paragraphs = text.split(/\n{2,}/);
  return (
    <div>
      {paragraphs.map((para, idx) => {
        const lines = para.split(/\n/);
        return (
          <p key={idx} className={[idx > 0 ? "mt-3" : "", className].filter(Boolean).join(" ")}> 
            {lines.map((line, j) => (
              <span key={`${idx}-${j}`}>
                {renderBold(line)}
                {j < lines.length - 1 ? <br /> : null}
              </span>
            ))}
          </p>
        );
      })}
    </div>
  );
}
