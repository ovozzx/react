import React, { useImperativeHandle, forwardRef, useRef } from "react";

const Child = forwardRef((props, ref) => {
  // forwardRef로 감싸야만 ref를 부모에서 자식으로 전달 가능
  // forwardRef 없이는 ref가 자식 컴포넌트 내부로 전달될 수 없다.
  const inputRef = useRef();

  // useImperativeHandle :
  // 부모가 자식 컴포넌트의 특정 기능(메서드)을 직접 호출할 수 있게 해주는 React Hook
  // 부모에게 노출할 메서드 정의
  useImperativeHandle(
    ref, //ref 파라미터는 부모가 전달한 ref 객체이다.
    // useImperativeHandle에 부모에서 전달한 ref를 넣어줘야만
    // 그 ref를 통해 부모가 자식을 제어할 수 있음
    // => 부모 ref → Child 전달 → useImperativeHandle(ref, …)로 메서드 등록 → 부모가 ref.current.xxx()로 제어
    () => ({
      // 함수 : 부모가 사용할 수 있는 기능(메서드, 값)을 정의한 객체
      focusInput() {
        inputRef.current.focus();
      },
    })
  );

  return <input ref={inputRef} placeholder="여기에 입력하세요" />;
});

export default Child;
