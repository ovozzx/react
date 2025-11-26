/**
 * React.createContext(defaultValue)
 * 컴포넌트 트리 깊숙이 props 없이 값을 공유할 수 있게 해주는 문법입니다.
 * 핵심 흐름
 * - createContext → Context 객체 생성
 * - Provider value={...} → 하위 컴포넌트에 값 전달
 * - useContext(Context) → 자식에서 값 가져오기
 * --- props 없이 트리 깊숙이 값 전달 가능
 * --- 상태, 테마, 로그인 정보 등 공유용으로 자주 사용
 */

// 여러 개의 <MyContext.Provider>가 중첩되면, 가장 가까운 Provider의 value가 적용됩니다.
// 값을 받는 자식 컴포넌트 기준으로 가장 가까운 Provider의 value가 적용됩니다.

// * useContext 사용 가능 범위
// useContext(MyContext)는 컴포넌트가 렌더링되는 순간 → 트리 상에서 위로 올라가며 Provider를 탐색
// 가장 가까운 Provider를 찾으면 그 value를 반환
// 저 Provider를 만나기 전에 최상단에 도달하면 → createContext(defaultValue)의 defaultValue 사용

import { createContext, useContext } from "react";

const MyContext = createContext(); // () 안에 값이 디폴트 값

export default function ContextApp() {
  return (
    <>
      <MyContext.Provider value="컨텍스트 예제 입니다 (가장 먼)">
        <div>---</div>
        <MiddleChild />
      </MyContext.Provider>
    </>
  );
}

function MiddleChild() {
  return (
    <>
      <MyContext.Provider value="컨텍스트 예제 입니다 (가장 가까운 거)">
        <div>------MiddleChild</div>
        <GrandChild />
      </MyContext.Provider>
    </>
  );
}

function GrandChild() {
  const value = useContext(MyContext);
  return (
    <>
      <div>---------GrandChild</div>
      <div>{value}</div>
    </>
  );
}

/*
 import { createContext, useContext } from "react";

const MyContext = createContext(); // 바깥에 선언

function GreatGrandchild() {
  const value = useContext(MyContext); // 직접 Context 접근
  return <div>GreatGrandchild: {value}</div>;
}

function MiddleChild() {
  // 값이 안 거침
  return (
    <div>
      <p>MiddleChild</p>
      <GreatGrandchild />
    </div>
  );
}

export default function ContextApp() {
  return (
    <MyContext.Provider value="컨텍스트 예제 입니다.">
      <div>
        <p>Parent</p>
        <MiddleChild /> 
        MiddleChild는 Context 값 몰라도 됨
      </div>
    </MyContext.Provider>
  );
}

*/
