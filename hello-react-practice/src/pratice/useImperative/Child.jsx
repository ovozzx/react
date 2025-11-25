import { forwardRef, useImperativeHandle, useRef } from "react";

export const Child = forwardRef((props, ref) => {
  const modalRef = useRef();
  useImperativeHandle(ref, () => ({
    modalUp() {
      modalRef.current.style.display = "block";
    },
  }));

  return <div ref={modalRef} style={{ display: "none" }}></div>;
});
