import Section from "./Section.jsx";

// 확장된 객체

function PropsApp() {
  const onMouseOverHandler = () => {
    console.log("마우스가 섹션 위에 있습니다!");
  };

  return (
    <>
      <Section
        title="Section"
        color="#F00"
        onMouseOver={onMouseOverHandler}
        backgroundColor="#fbdbff"
      />
      <Section title="Section2" color="#0F0" />
      <Section title="Section3" color="#00F" onMouseOver={onMouseOverHandler} />
      <Section color="#F00">
        <div>This is a Section Components 끼어들기</div> {/* children */}
      </Section>
    </>
  );
}

export default PropsApp;
