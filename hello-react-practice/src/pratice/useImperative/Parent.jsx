import { useRef, useState } from "react";
import Child from "./Child";
/**
 *
 * useImperativeHandle
 * 부모 → 자식 컴포넌트 내부 기능을 직접 호출해서 자식의 DOM을 제어하는 구조
 * useImperativeHandle(ref, () => ({ … }))
 * ({...}) : 화살표 함수에서 객체로 바로 반환하기 위해 밖에 () 필요
 * {}만 쓰면 함수 본문으로 해석돼서 객체 반환 못함
 * 부모가 ref를 통해 자식의 특정 함수나 값을 직접 호출/조작할 수 있게 만드는 Hook입니다.
 */
export default function Parent() {
  const childRef = useRef();
  const [show, setShow] = useState(false);

  const onModalHandler = () => {
    setShow(!show);
    childRef.current.Modal();
  };

  return (
    <>
      <Child childRef={childRef} show={show} />
      <button onClick={onModalHandler}>click</button>
    </>
  );
}

/*
import { useRef, useState } from "react";
import Child from "./Child";

export default function Parent() {
  const childRef = useRef();
  const [show, setShow] = useState(false);

  const onModalUpHandler = () => {
    setShow(!show);
    childRef.current.modal();
  };

  return (
    <>
      <Child childRef={childRef} show={show}></Child>
      <button onClick={onModalUpHandler}>클릭</button>
    </>
  );
}
*/
