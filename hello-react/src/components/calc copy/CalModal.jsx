import { Children, useState, useImperativeHandle } from "react";

export default function CalModal({ clickRef, children }) {
  const [show, setShow] = useState(false); // div 상태 제어

  useImperativeHandle(clickRef, () => ({
    open() {
      setShow(true);
    },
    close() {
      setShow(false);
    },
  }));

  const divStyle = {
    display: show ? "block" : "none",
    backgoroundColor: "#fff",
    position: "fixed",
    minWidth: "10rem",
  };
  const onCloseClickHandler = () => {
    clickRef.current.close();
  };
  return (
    <>
      <div style={divStyle}>
        <section onClick={onCloseClickHandler}>X</section>
        {children}
      </div>
    </>
  );
}
