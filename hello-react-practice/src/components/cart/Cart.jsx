export default function Cart({ itemId, name, price, stock }) {
  return (
    <ul>
      <li>상품 번호 : {itemId}</li>
      <li>{name}</li>
      <li>단가 {price}</li>
    </ul>
  );
}
