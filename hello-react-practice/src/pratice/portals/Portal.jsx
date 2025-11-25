/**
 * createPortal(children, container)
 * 부모 DOM 계층과 상관없이 children을 지정한 container DOM에 렌더링하는 React 문법입니다.
 *
 */

import { createPortal } from "react-dom";

export default function Portal() {
  // 컴포넌트 정의만 한 것 => 호출 필요! (=ReactDOM이 처리하도록 함)
  // 루트로 직접 호출해도 되고
  // 부모 컴포넌트의 자식으로 넣어 호출해도 됨
  return createPortal(
    <div>여기로 렌더링~</div>,
    document.getElementById("modals")
    // 이미 id라서 # 빼기
  );
}
