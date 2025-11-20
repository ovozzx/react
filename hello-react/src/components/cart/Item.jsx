import { useRef } from "react";

export default function Item({
  itemId,
  name,
  price,
  stock,
  onMoveHandler,
  itemRef,
}) {
  const onDataHandler = () => {
    onMoveHandler({ itemId, name, price, stock });
  };
  // 품절이면 경고 모달, 일반이면 원래함수
  return (
    <>
      <ul ref={itemRef}>
        <li>상품 번호 : {itemId}</li>
        <li>{name}</li>
        <li>단가 {price}</li>
        <li>재고 {stock}</li>
        <button onClick={onDataHandler}>
          {stock > 0 ? "장바구니 담기" : "품절"}
        </button>
      </ul>
    </>
  );
}
