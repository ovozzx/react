import { useRef, useState } from "react";
import Item from "./Item.jsx";
import Cart from "./Cart.jsx";

export default function CartApp() {
  const [items, setItems] = useState([
    { itemId: "item_1", name: "Item 1", price: 10000, stock: 0 },
    { itemId: "item_2", name: "Item 2", price: 3000, stock: 10 },
    { itemId: "item_3", name: "Item 3", price: 5000, stock: 5 },
  ]);

  const [stock, setStock] = useState();

  const [cart, setCart] = useState([]);

  const itemRef = useRef();

  const onMoveHandler = (data) => {
    //console.log(event.currentTarget);
    // console.log(event);
    // console.log(itemRef.current);
    // console.log(itemId, name, price);
    console.log(data);
    console.log(data.itemId);
    // const movedItem = items.find((item) => item.name === name);
    // console.log(movedItem);

    var rst = stock - 1;
    // 재고 업데이트
    setItems((prevItems) => {
      const newItems = prevItems.map((item) => {
        console.log("~~~~~", data.itemId, rst);
        if (item.id === data.itemId) {
          setStock(rst);
          return {
            ...item, // 객체를 펼침
            stock: stock,
          };
        }
        return item; // 나머지 아이템들은 그대로 반환
      });
      return newItems;
    });

    // 데이터를 읽어서 cart 배열에 추가
    setCart((prevCarts) => {
      const newCarts = [
        ...prevCarts,
        { itemId: data.itemId, name: data.name, price: data.price },
      ];
      return newCarts;
    });
  };

  return (
    <>
      {items.map(
        (
          { itemId, name, price, stock } // 하나의 파라미터 {}
        ) => (
          <Item
            key={itemId}
            itemId={itemId}
            name={name}
            price={price}
            stock={stock}
            onMoveHandler={onMoveHandler}
            itemRef={itemRef}
          />
        )
      )}
      <div>장바구니 목록</div>
      {cart.map(({ itemId, name, price, stock }) => (
        <Cart
          key={itemId}
          itemId={itemId}
          name={name}
          price={price}
          stock={stock}
        />
      ))}
    </>
  );
}
