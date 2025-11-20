import Section from "./Section.jsx";

// 확장된 객체
var name = "홍길동";
var obj = { name };

// 확장된 객체를 구조 분해.
var { name, age = 66 } = obj;

export default function PropsApp() {
  const onMouseOverHandler = () => {
    console.log("마우스가 섹션 위에 있습니다!");
  };

  return (
    <>
      <Section
        title="첫번째"
        color="red"
        backgroundColor="#0f0"
        onMouseOver={onMouseOverHandler}
      />
      <Section title="두번째" color="green" />
      <Section title="세번째" color="blue" onMouseOver={onMouseOverHandler}>
        <div>세번째 섹션의 내용입니다.</div>
      </Section>
    </>
  );
}
