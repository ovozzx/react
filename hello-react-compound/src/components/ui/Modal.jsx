import { useImperativeHandle, useRef, useState } from "react";
import { createPortal } from "react-dom";

/**
 * 논리 연산자 - 빠른 연산.
 *  && ==> 앞의 피 연산자 값이 false면 뒤의 피 연산자는 실행하지 않는다 또는 판단하지 않는다.
 *  || ==> 앞의 피 연산자 값이 true면 뒤의 피 연산자는 실행하지 않는다 또는 판단하지 않는다.
 */

export default function Alert({ children, alertRef, onClose }) {
  console.log("-- Alert 실행됨");
  const modalRef = useRef();

  useImperativeHandle(alertRef, () => ({
    open() {
      modalRef.current.showModal();
    },
    close() {
      modalRef.current.close();
    },
  }));

  const onCloseClickHandler = () => {
    alertRef.current.close();
    onClose();
  };

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

export function Confirm({ confirmRef, children, onClickOk, onClickCancel }) {
  console.log("-- Confirm 실행됨");
  const modalRef = useRef();

  const [show, setShow] = useState(false);

  useImperativeHandle(confirmRef, () => ({
    open() {
      setShow(true);
    },
    close() {
      setShow(false);
    },
  }));

  const confirmStyle = {
    display: show ? "block" : "none",
    backgroundColor: "#fff",
    position: "fixed",
    minWidth: "10rem",
  };

  const onCloseClickHandler = () => {
    confirmRef.current.close();
    onClickCancel();
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
            <section>
              <button type="button" className="confirm-ok" onClick={onClickOk}>
                OK
              </button>
              <button
                type="button"
                className="confirm-cancel"
                onClick={onCloseClickHandler}
              >
                Cancel
              </button>
            </section>
          </div>
        </div>,
        document.querySelector("#modals")
      )}
    </>
  );
}
