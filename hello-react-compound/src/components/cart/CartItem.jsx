export default function CartItem({ id, name, price, order }) {
  const itemStyle = {
    padding: "0.625rem",
  };

  return (
    <div style={itemStyle}>
      <div>상품 번호: {id}</div>
      <div>{name}</div>
      <div>단가 {price}원</div>
      <div>개수 {order}개</div>
    </div>
  );
}
