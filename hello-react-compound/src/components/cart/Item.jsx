import { useRef } from "react";
import Alert from "../ui/Modal";

export default function Item({ id, name, price, stock, onClickCart }) {
  const alertRef = useRef();
  const itemStyle = {
    padding: "0.625rem",
  };
  const addCart = () => {
    if (stock === 0) {
      alertRef.current.open();
    } else {
      onClickCart(id, name, price);
    }
  };

  return (
    <div style={itemStyle}>
      <div>상품 번호: {id}</div>
      <div>{name}</div>
      <div>단가 {price}원</div>
      <div>재고 {stock}개</div>
      <div>
        <button type="button" onClick={addCart}>
          {stock > 0 ? "장바구니에 담기" : "품절"}
        </button>
      </div>
      <Alert alertRef={alertRef}>
        <div>품절된 상품입니다!</div>
      </Alert>
    </div>
  );
}
