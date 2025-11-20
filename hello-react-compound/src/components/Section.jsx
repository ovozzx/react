export default function Section({
  title,
  color,
  backgroundColor = "#fff",
  children,
  onMouseOver = () => {
    console.log("마우스 오버 기본 함수");
  },
}) {
  const sectionStyle = {
    color,
    backgroundColor,
  };
  return (
    <div style={sectionStyle} onMouseOver={onMouseOver}>
      This is a {title} component.
      {children}
    </div>
  );
}
