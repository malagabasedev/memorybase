export function Heading({ children, level = 1, styles }) {
  const Tag = level <= 6 ? "h" + level : "h6";

  return <Tag className={styles}>{children}</Tag>;
}
