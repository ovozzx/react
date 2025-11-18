export default function Section({
  color,
  backgroundColor = "#fff",
  children,
  onMouseOver = () => {
    console.log("마우스 오버 기본 함수");
  }, // 이벤트 함수 값 없으면 기본함수를 넣어라
}) {
  const sectionCss = {
    backgroundColor, // key value 이름 같으니까 하나로 줄이기
    color,
  };

  return (
    <div style={sectionCss} onMouseOver={onMouseOver}>
      This is Component {children}
    </div>
  );
}
