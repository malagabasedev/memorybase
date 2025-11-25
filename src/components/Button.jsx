export function Button({ children, variant, styles, onClick }) {
  let btnStyles = `btn-${variant}`;
  if (styles) btnStyles += ` ${styles}`;

  return (
    <button type="button" className={btnStyles} onClick={onClick}>
      {children}
    </button>
  );
}
