import { useRef } from "react";
import Child from "./Child";

export default function Parent() {
  const childRef = useRef();

  const onModalUpHandler = () => {
    childRef.current.modalUp();
  };

  return (
    <>
      <Child ref={childRef}></Child>
      <button onClick={onModalUpHandler}>클릭</button>
    </>
  );
}
