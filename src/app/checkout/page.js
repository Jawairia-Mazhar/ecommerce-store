"use client";
//FormData is a built-in browser tool that can read all the named inputs from a <form> element at once, without needing separate useState
import {useCart} from "@/context/CartContext";
import React from 'react'

const page = () => {
    const {cart, removeFromCart, clearCart} = useCart();
    const [orderPlaced, setOrderPlaced] = React.useState(false);
    const [orderDetails, setOrderDetails] = React.useState(null); //the cart would get cleared so before it gets clear we need to have a state that holds the items total quantity and the total price

    const handleSubmit = (e) => {
        e.preventDefault();
        const formData = new FormData(e.target); //creates object that contains all data
        const fullName = formData.get("fullName");
        const address = formData.get("address");
        const phoneNo = formData.get("phone");

        const subTotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

        const orderDetails = {
            items : cart,
            total : subTotal,
            fullName : fullName,
            address : address,
            phone : phoneNo
        }

        setOrderDetails(orderDetails) //order details saved
        clearCart(); //cart cleared!
        setOrderPlaced(true); //order placed!
    };

//should I show the form, or the confirmation?
    if (orderPlaced) {
        return (
            <h1>Order Confirmed.</h1>
        );
    }

  return (
    <section>
      <h1>Checkout</h1>
      <form onSubmit={handleSubmit}>
        <input type="text" name="fullName" placeholder="Full Name" />
        <input type="text" name="address" placeholder="Complete Address" />
        <input type="tel" name="phone" placeholder="Phone Number" />
    
        <button type="submit">Confirm Order</button>
      </form>
    </section>
  )
}

export default page