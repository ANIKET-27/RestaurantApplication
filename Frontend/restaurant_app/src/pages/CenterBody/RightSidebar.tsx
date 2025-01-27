import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { CartItem } from "../../data/api/modals/cartModal";
import Trash from "@mui/icons-material/DeleteOutline";
import { AppDispatch } from "../../state/store";
import { placeOrder, removeCartItem } from "../../state/user/cartSlice";
import ShoppingCartCheckoutIcon from '@mui/icons-material/ShoppingCartCheckout';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';

function RightSidebar() {
  const list: CartItem[] = useSelector((state: any) => state.cart.cartList);

  return (
    <div>
       <div className="p-4 text-center rounded-tl-lg rounded-tr-lg bg-color-darkGreen shadow-md">
            <div className="text-2xl font-bold text-color-cream">
                <ShoppingCartIcon className="mr-4"></ShoppingCartIcon>
                  Your Cart
            </div>
            </div>
      <div className="w-96 max-h-full h-auto bg-color-cream border-2 border-green-800 rounded-bl-lg rounded-br-lg">
      {list.length === 0 ? <EmptyCart /> : <CartView list={list} />}
      </div>
      </div>
  );
}

const EmptyCart: React.FC = () => {
  return (
    <div className="flex flex-col justify-center items-center w-full h-72 bg-color-cream rounded-lg shadow-md">
      <p className="text-lg font-semibold text-color-darkGreen">Your cart is Empty</p>
    </div>
  );
};


type CartViewProps = {
  list: CartItem[];
};

const CartView: React.FC<CartViewProps> = ({ list }) => {
  const dispatch = useDispatch<AppDispatch>();

  return (
     <div className="w-full h-full max-h-full" >
      <div className="w-full float-start">
        <TotalBill />
        <div
          className="text-black text-xl font-bold text-center p-4 m-2 bg-orange-200"
          onClick={async (e) => {
            e.preventDefault();

            if (sessionStorage.getItem("accessToken") == null) {
              alert("Please log in before placing an order.");
              return;
            }

            try {
              await dispatch(placeOrder()).unwrap();
              alert("Order placed successfully!");
            } catch (error) {
              alert(error.message || "Failed to place order. Please try again.");
            }
          }}
        >
          Place Order
        </div>  
       </div>

      {list.map((item, index) => (
        <div className="m-4 p-2 bg-color-lightGreen flex" key={index}>
          <img src={item.dish.url} className="m-2 size-24 rounded-lg" alt={item.dish.name} />
          <div className="flex-1">
            <p className="text-xl text-color-darkGreen font-bold">{item.dish.name}</p>
            <p className="text-normal">Quantity: x{item.quantity}</p>
            <p>Price: {item.dish.price * item.quantity}</p>
          </div>
          <div
            className="m-4 w-5 flex items-center justify-center"
            onClick={() => {
              dispatch(removeCartItem(index));
            }}
          >
            <Trash fontSize="large" />
          </div>
        </div>
      ))}
    </div>
  );
};

const TotalBill: React.FC = () => {
  const price = useSelector((state: any) => state.cart.total);

  return (
    <div className="m-4 p-2 bg-gray-200">
      <p className="text-center">Billing Amount</p>
      <div className="my-2 flex justify-between">
        <div>Total Items</div>
        <div>{price}</div>
      </div>
      <div className="my-2 flex justify-between">
        <div>Delivery Charges</div>
        <div>50</div>
      </div>
      <div className="w-full h-0.5 bg-black"></div>
      <div className="my-2 flex justify-between">
        <div>Total Amount</div>
        <div className="text-large font-bold">Rs. {price + 50}</div>
      </div>
    </div>
  );
};

export default RightSidebar;
