import "../styles/ColorCard.css";

export function ColorCard({
  color,
  variant = "normal",
  onClick,
  inlineStyles,
}) {
  const cardStyles = `color-card color-card-${variant} ${color.className}`;

  return (
    <button
      type="button"
      className={cardStyles}
      onClick={onClick}
      style={inlineStyles}
    >
      {variant !== "expert" && (
        <div className="color-card_content">{color.name}</div>
      )}
    </button>
  );
}
