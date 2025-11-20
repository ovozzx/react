import CartItem from "./CartItem";

export default function Cart({ items }) {
  return (
    <div>
      <h1>장바구니 목록</h1>
      <h3>
        총 주문 금액{" "}
        {items.reduce((amount, item) => amount + item.order * item.price, 0)}원
      </h3>
      {items.map(({ itemId, name, price, order }) => (
        <CartItem
          key={`cart_${itemId}`}
          id={itemId}
          name={name}
          price={price}
          order={order}
        />
      ))}
    </div>
  );
}
