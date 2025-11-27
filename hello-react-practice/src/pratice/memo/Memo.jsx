/**
 * React는 렌더링할 때마다 함수, 객체, 배열 등을 새로 만드는 것이 기본 동작
 * 컴포넌트가 가진 state가 하나라도 바뀌면, 그 컴포넌트 전체가 리렌더링 됨
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

import { memo, useCallback, useMemo, useState } from "react";

const Child = memo(({ value }) => {
  console.log("Child render");
  return <div>{value}</div>;
});

export default function MemoApp() {
  const [count, setCount] = useState(0);
  return (
    <div>
      <Child value="Hello" />
      <button onClick={() => setCount(count + 1)}>+</button>
    </div>
  );
}

export function CallbackApp() {
  const [count, setCount] = useState(0);

  const handleClick = useCallback(() => {
    console.log("Clicked");
  }, []);

  return <button onClick={handleClick}>Click</button>;
}

export function UseMemoApp() {
  const [num, setNum] = useState(1);

  const double = useMemo(() => {
    console.log("Calculating...");
    return num * 2;
  }, [num]);

  return (
    <div>
      {double}
      <button onClick={() => setNum(num + 1)}>+</button>
    </div>
  );
}
