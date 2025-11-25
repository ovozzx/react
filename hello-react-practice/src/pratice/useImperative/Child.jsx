import { useRef, useImperativeHandle } from "react";

export default function Child({ show, childRef }) {
  // props를 받는 파라미터는 순서와 상관 없음 (이름으로 매칭)
  const modalRef = useRef();

  useImperativeHandle(childRef, () => ({
    Modal() {
      if (show) {
        modalRef.current.style.display = "block";
      } else {
        modalRef.current.style.display = "none";
      }
    },
  }));

  return (
    <div ref={modalRef} style={{ display: "none" }}>
      짜잔
    </div>
  );
}
/*
import { forwardRef, useImperativeHandle, useRef } from "react";

export default function Child({ show, childRef }) {
  // ref 객체를 props로 전달할 수 있음 (이름만 ref로 쓰지말기)
  // (props, ref)
  const modalRef = useRef();
  useImperativeHandle(childRef, () => ({
    modal() {
      if (show) {
        modalRef.current.style.display = "block";
      } else {
        modalRef.current.style.display = "none";
      }
    },
  }));

  return (
    <div ref={modalRef} style={{ display: "none" }}>
      짜잔
    </div>
  );
}
*/
