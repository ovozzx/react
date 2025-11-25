import { useImperativeHandle, useRef, useState } from "react";
import { createPortal } from "react-dom";

/**
 * 논리 연산자 - 빠른 연산.
 * && => 앞의 피 연산자 값이 false면 뒤의 피 연산자는 실행하지 않는다 또는 판단하지 않는다.
 * || => 앞의 피 연산자 값이 true면 뒤의 피 연산자는 실행하지 않는다 또는 판단하지 않는다.
 */
export default function Alert({ children, alertRef, onClose }) {
  const modalRef = useRef();

  useImperativeHandle(
    alertRef, // alertRef에 객체가 들어감
    () => ({
      open() {
        modalRef.current.showModal();
      },
      close() {
        modalRef.current.close();
      },
    }) // ({}) => 객체 반환
  );

  const onCloseClickHandler = () => {
    alertRef.current.close();
    onClose();
  };
  // default는 한번만 씀
  return (
    <>
      {createPortal(
        <dialog className="modal" ref={modalRef}>
          <div className="modal-body">
            <section
              className="modal-close-button"
              onClick={onCloseClickHandler}
            >
              X
            </section>
            {children}
          </div>
        </dialog>,
        document.querySelector("#modals")
      )}
    </>
  );
}

export function Confirm({ confirmRef, children, onClickOK, onClickCancle }) {
  const modalRef = useRef();

  const [show, setShow] = useState(false); // div 상태 제어

  useImperativeHandle(confirmRef, () => ({
    open() {
      setShow(true);
    },
    close() {
      setShow(false);
    },
  })); // 객체를 반환시키는 함수

  const confirmStyle = {
    display: show ? "block" : "none",
    backgoroundColor: "#fff",
    position: "fixed",
    minWidth: "10rem",
  };

  const onCloseClickHandler = () => {
    confirmRef.current.close();
    onClickCancle();
  };

  return (
    <>
      {createPortal(
        <div className="modal" ref={modalRef} style={confirmStyle}>
          <div className="modal-body">
            <section
              className="modal-close-button"
              onClick={onCloseClickHandler}
            >
              X
            </section>
            {children}
            <section
            // className="modal-close-button"
            // onClick={onCloseClickHandler}
            >
              <button type="button" className="confirm-ok" onClick={onClickOK}>
                OK
              </button>
              <button
                type="button"
                className="confirm-cancel"
                onClick={onCloseClickHandler}
              >
                Cancle
              </button>
            </section>
          </div>
        </div>,
        document.querySelector("#modals")
      )}
    </>
  );
}
