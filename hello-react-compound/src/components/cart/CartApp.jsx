import { useState } from "react";
import Item from "./Item";
import Cart from "./Cart";

export default function CartApp() {
  const [items, setItems] = useState([
    { itemId: "item_1", name: "Item 1", price: 10000, stock: 0 },
    { itemId: "item_2", name: "Item 2", price: 3000, stock: 10 },
    { itemId: "item_3", name: "Item 3", price: 5000, stock: 5 },
  ]);

  const [cart, setCart] = useState([]);

  const onAddCartHandler = (id, name, price) => {
    setItems((prevItems) => {
      const newItems = prevItems.map((item) => {
        if (item.itemId === id) {
          let stock = item.stock - 1;
          if (stock < 0) {
            stock = 0;
          }

          return { ...item, stock };
        }
        return item;
      });
      return newItems;
    });

    setCart((prevCart) => {
      //const newCart = [...prevCart, { itemId: id, name, price, order: 1 }];
      const newCart = prevCart.map((item) => {
        if (item.itemId === id) {
          let order = item.order + 1;
          return { ...item, order };
        }
        return item;
      });
      const cartItem = newCart.find(({ itemId }) => itemId === id);

      if (!cartItem) {
        newCart.push({ itemId: id, name, price, order: 1 });
      }
      return newCart;
    });
  };

  return (
    <div>
      {items.map(({ itemId, name, price, stock }) => (
        <Item
          key={itemId}
          id={itemId}
          name={name}
          price={price}
          stock={stock}
          onClickCart={onAddCartHandler}
        />
      ))}
      <div>
        <Cart items={cart} />
      </div>
    </div>
  );
}
