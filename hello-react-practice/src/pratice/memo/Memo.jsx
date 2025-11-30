/**
 * React는 렌더링할 때마다 함수, 객체, 배열 등을 새로 만드는 것이 기본 동작
 * 컴포넌트가 가진 state가 하나라도 바뀌면, 그 컴포넌트 전체가 리렌더링 됨
 * 3개 적용 대상 다르게 사용
 * (1) memo
 * Props가 바뀌지 않으면 컴포넌트를 다시 렌더링하지 않도록 메모이제이션한다.
 * - Props가 바뀌지 않아도 부모 컴포넌트가 렌더링될 때마다 자식 컴포넌트도 함께 재렌더링 됨
 * 문법 : export default memo(Component);
 * (2) useCallback
 * 함수를 메모이제이션하여 불필요한 함수 재생성을 막는다. ("함수의 참조값"이 바뀌지 않도록 해준다.)
 * - 컴포넌트가 리렌더링될 때마다 함수는 새로 만들어지는 다른 인스턴스가 됨
 * 문법 : const memoizedFn = useCallback(fn, [deps]);
 * (3) useMemo
 * 값을 메모이제이션하여 비용이 큰 계산을 다시 하지 않도록 한다.
 * 문법 : const memoizedValue = useMemo(() => compute(), [deps]);
 */

import { useEffect } from "react";
import { memo, useCallback, useMemo, useState } from "react";

const MemoChild = memo(({ value }) => {
  console.log("Child render 실행!");
  return <div>{value}</div>;
});

// export default memo(function Child({ value }) { 근데 이렇게 하면 출력 안됨
//   // 이 형태는 default만 가능
//   console.log("Child render 실행!");
//   return <div>{value}</div>;
// });

//export memo(Child);

const UseCallbackChild = memo(({ onCallback }) => {
  // 자식 컴포넌트가 memo()로 감싸져 있지 않으면 리렌더를 막지 못함
  console.log("콜백 리렌덩링");
  return <div onClick={onCallback}>CallbackChild</div>;
});

const UseMemoChild = memo(() => {
  console.log("객체 린데러링");
});

export default function MemoApp() {
  const [count, setCount] = useState(0);

  const onSetChangeHandler = useCallback(() => {
    console.log("캐싱 함수");
  }, []);

  const memoObj = useMemo(() => ({ value: 1 }), []);
  // useMemo는 ‘함수 → 값 리턴’ 구조가 필수이다.
  // () : 즉시 반환
  // {} : 반드시 return을 직접 써야 함

  // useEffect : 렌더 후에 실행되는 사이드 이펙트(부수효과) 함수를 등록하고, deps 배열을 통해 언제 실행·정리할지 제어하는 훅
  useEffect(() => {
    console.log("use Effect");
  }, []); // []이면 처음에만 실행, state 바뀌어도 처음 1번만 => 마운트 시 1회 실행

  // eslint-disable-next-line no-undef
  fetchTodo();
  Todo();

  return (
    <div>
      <MemoChild value="Hello" />
      {/* 부모 state가 바뀌어도 해당 자식은 props가 변경된 것이 아니기 때문에 리렌더 안됨! */}
      <UseCallbackChild onCallback={onSetChangeHandler} />
      <UseMemoChild memoObj={memoObj} />
      <button onClick={() => setCount(count + 1)}>state 변경!</button>
    </div>
  );
}

/**
 * fetch : fetch는 네트워크 요청을 보내고, Promise로 응답을 받는 브라우저 내장 API
 */

async function fetchTodo() {
  try {
    const response = await fetch(
      "https://jsonplaceholder.typicode.com/todos/1"
    ); // Promise 반환
    // const data = await response;
    const data = await response.json(); // 서버에서 받은 JSON 문자열을 JS에서 바로 쓸 수 있는 객체(Object)나 배열(Array)로 변환
    console.log("결과:", data);
  } catch (err) {
    console.error("에러 발생:", err);
  }
}

function Todo() {
  useEffect(() => {
    try {
      const postData = async () => {
        const res = await fetch("https://jsonplaceholder.typicode.com/posts", {
          method: "POST",
          headers: { "Content-Type": "application/json" }, // 서버에 보내는 데이터 형식(Content-Type)을 알려주기 위해 사용 (필수)
          body: JSON.stringify({ title: "hello", body: "world", useId: 1 }),
          // 서버로 보낼 실제 데이터. JS 객체를 바로 보내면 안 되고, JSON.stringify()로 문자열(JSON)로 변환해야 함
        });

        const data = await res.json();
        console.log("POST 결과:", data); // await를 붙이지 않으면, 완료를 기다리지 않고 콘솔 출력해버림 => Promise { <pending> } 출력
      };

      postData();
    } catch (err) {
      console.error("POST 에러:", err);
    }
  }, []);
}
