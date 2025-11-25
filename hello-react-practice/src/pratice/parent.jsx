import React, { useRef } from "react";
import Child from "./Child";

function Parent() {
  const childRef = useRef();

  const handleClick = () => {
    // 자식 컴포넌트의 함수 직접 호출
    childRef.current.focusInput();
  };

  return (
    <div>
      <Child ref={childRef} />
      <button onClick={handleClick}>자식 input focus</button>
    </div>
  );
}

export default Parent;
