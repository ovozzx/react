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
        <MiddleChild /> {/* MiddleChild는 Context 값 몰라도 됨 */}
      </div>
    </MyContext.Provider>
  );
}
