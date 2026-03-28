function StoryBody({ text }) {
  const paragraphs = text
    .trim()
    .split(/\n\n+/)
    .map((p) => p.trim())
    .filter(Boolean);

  return (
    <div className="font-paper text-paper-ink/90 text-[0.95rem] leading-relaxed md:columns-2 md:gap-10 [&>p+p]:mt-4">
      {paragraphs.map((p, i) => (
        <p key={i} className="text-justify hyphens-auto break-words">
          {p}
        </p>
      ))}
    </div>
  );
}

export default StoryBody;
