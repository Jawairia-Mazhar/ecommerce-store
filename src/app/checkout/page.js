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
        setOrderPlaced(true); //order placed! Will trigger the confirmation page to show
    }; 
    // This is what happen with orderDetails useState. By default it was kept null, then when the customer submits the checkout details, the orderDetails get updated to new object and we updated setOrderDetails with that.orderDetails hold the real data.

//should I show the form, or the confirmation?
    if (orderPlaced) {
        return (
            <section className="max-w-2xl mx-auto px-4 py-16 text-center">
            <h1 className="text-3xl font-bold text-green-600 mb-2">Order Confirmed!</h1>
            <p className="text-gray-500 mb-8">Thank you, your order is on its way.</p>
            
            <div className="text-left bg-gray-50 border border-gray-200 rounded-lg p-6 mb-6">
                <h2 className="font-semibold text-gray-900 mb-2">Shipping Details</h2>
                <p className="text-sm text-gray-700">{orderDetails.fullName}</p>
                <p className="text-sm text-gray-700">{orderDetails.address}</p>
                <p className="text-sm text-gray-700">{orderDetails.phone}</p>
            </div>
            <div className="text-left bg-gray-50 border border-gray-200 rounded-lg p-6">
                <h2 className="font-semibold text-gray-900 mb-4">Order Summary</h2>

            {orderDetails.items.map((item) => (
            <div key={item.id} className="flex justify-between text-sm text-gray-700 py-1">
                <p>{item.title} × {item.quantity}</p>
                <p>${(item.price * item.quantity).toFixed(2)}</p>
            </div>
            ))}
            <div className="flex justify-between font-semibold text-gray-900 mt-4 pt-4 border-t border-gray-200">
                <span>Total</span>
                <span>${orderDetails.total.toFixed(2)}</span>
            </div>
            </div>
            </section>
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