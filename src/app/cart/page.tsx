'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation'; // Import useRouter
import { useCart } from '../../context/CartContext';

const CartPage = () => {
  const { cart, removeFromCart, clearCart } = useCart();
  const router = useRouter(); // Initialize useRouter

  const [customerDetails, setCustomerDetails] = useState({
    name: '',
    phone: '',
    address: '',
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setCustomerDetails((prev) => ({ ...prev, [name]: value }));
  };

  const calculateTotal = () => {
    return cart.reduce((total, item) => total + item.discountedPrice * item.quantity, 0);
  };

  const handleCheckout = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!customerDetails.name || !customerDetails.phone || !customerDetails.address) {
      alert('Please fill in all customer details.');
      return;
    }

    console.log('Proceeding to checkout with cart:', cart, 'and details:', customerDetails);
    
    // Record the "Checkout" event in the backend
    try {
      const response = await fetch('/api/checkout', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          cartItems: cart.map(item => ({ productId: item.id, quantity: item.quantity })),
          totalAmount: calculateTotal(),
          customerDetails: customerDetails,
          userId: 'anonymous', // You can replace this with actual user ID if available
          status: 'completed'
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to record checkout event');
      }

      // After successful order placement:
      clearCart(); // Clear the cart
      alert('Your order has been placed successfully!'); // User feedback
      router.push('/'); // Redirect to home page or an order confirmation page
    } catch (error) {
      console.error('Checkout error:', error);
      alert('There was an error processing your order. Please try again.');
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold text-center mb-8">Your Shopping Cart</h1>

      {cart.length === 0 ? (
        <p className="text-center text-gray-600 text-lg">Your cart is empty.</p>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            {cart.map((item) => (
              <div key={item.id} className="flex items-center border-b border-gray-200 py-4">
                <div className="relative w-24 h-24 mr-4 flex-shrink-0">
                  <Image
                    src={item.image}
                    alt={item.name}
                    layout="fill"
                    objectFit="cover"
                    className="rounded-lg"
                  />
                </div>
                <div className="flex-grow">
                  <h2 className="text-xl font-semibold text-gray-800">{item.name}</h2>
                  <p className="text-gray-600">Quantity: {item.quantity}</p>
                  <p className="text-green-700 font-bold">PKR. {item.discountedPrice}</p>
                </div>
                <button
                  onClick={() => removeFromCart(item.id)}
                  className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg transition-colors duration-200"
                >
                  Remove
                </button>
              </div>
            ))}
          </div>

          <div className="lg:col-span-1">
            <div className="bg-gray-50 p-6 rounded-lg shadow-md mb-6">
              <h2 className="text-2xl font-bold mb-4">Customer Details</h2>
              <form onSubmit={handleCheckout}>
                <div className="mb-4">
                  <label className="block text-gray-700 font-semibold mb-2" htmlFor="name">Full Name</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={customerDetails.name}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                    placeholder="Enter your name"
                    required
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-gray-700 font-semibold mb-2" htmlFor="phone">Phone Number</label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={customerDetails.phone}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                    placeholder="Enter your phone number"
                    required
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-gray-700 font-semibold mb-2" htmlFor="address">Shipping Address</label>
                  <textarea
                    id="address"
                    name="address"
                    value={customerDetails.address}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                    placeholder="Enter your full address"
                    rows={3}
                    required
                  ></textarea>
                </div>

                <div className="border-t border-gray-200 pt-4 mt-6">
                  <div className="flex justify-between items-center mb-2">
                    <p className="text-gray-700">Subtotal:</p>
                    <p className="text-gray-900 font-semibold">PKR. {calculateTotal().toFixed(2)}</p>
                  </div>
                  <div className="flex justify-between items-center mb-4">
                    <p className="text-gray-700">Shipping:</p>
                    <p className="text-gray-900 font-semibold">Free</p>
                  </div>
                  <div className="flex justify-between items-center mb-6">
                    <p className="text-xl font-bold">Total:</p>
                    <p className="text-xl font-bold text-green-700">PKR. {calculateTotal().toFixed(2)}</p>
                  </div>
                  <button
                    type="submit"
                    className="w-full bg-green-600 hover:bg-green-700 text-white text-lg font-semibold py-3 rounded-lg transition-colors duration-200"
                  >
                    Confirm Order
                  </button>
                </div>
              </form>
            </div>
            <button
              onClick={clearCart}
              className="w-full bg-gray-300 hover:bg-gray-400 text-gray-800 text-lg font-semibold py-3 rounded-lg transition-colors duration-200"
            >
              Clear Cart
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default CartPage;
