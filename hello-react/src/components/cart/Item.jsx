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
  return (
    <>
      <ul ref={itemRef}>
        <li>상품 번호 : {itemId}</li>
        <li>{name}</li>
        <li>단가 {price}</li>
        <li>재고 {stock}</li>
        <button onClick={onDataHandler}>장바구니 담기</button>
      </ul>
    </>
  );
}
