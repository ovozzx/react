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

import { createContext, useContext } from "react";

const MyContext = createContext();

export default function ContextApp() {
  return (
    <>
      <MyContext.Provider value="컨텍스트 예제 입니다">
        <div>---</div>
        <MiddleChild />
      </MyContext.Provider>
    </>
  );
}

function MiddleChild() {
  return (
    <>
      <MyContext.Provider value="컨텍스트 예제 입니다2">
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
