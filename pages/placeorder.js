import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useContext, useEffect, useState } from "react";
import CheckoutWizard from "../components/CheckoutWizard";
import { StoreContext } from "../contexts/store";

const PlaceOrder = () => {
  const router = useRouter();
  const [
    cart,
    addToCart,
    updateQuantity,
    removeFromCart,
    clearCart,
    shippingAddress,
    saveShippingAddress,
    savePaymentMethod,
  ] = useContext(StoreContext);
  let totalPrice = 0;
  cart.map((item, index) => {
    totalPrice += item.price * item.quantity;
  });
  totalPrice = Math.round(totalPrice * 100 + Number.EPSILON) / 100;
  const taxPrice = 2;
  const shippingPrice = 5;
  const [paymentMethod, setPaymentMethod] = useState("");
  useEffect(() => {
    if (!cart) {
      router.push("/cart");
      return;
    }
    if (!shippingAddress) {
      router.push("/shipping");
      return;
    }
    if (!localStorage.getItem("paymentMethod")) {
      router.push("/payment");
      return;
    }
    setPaymentMethod(localStorage.getItem("paymentMethod"));
  });

  const [loading, setLoading] = useState(false);

  // handleOrder
  const handleOrder = async () => {
    const datas = {
      orderItems: cart,
      shippingAddress,
      paymentMethod,
      itemsPrice: totalPrice,
      shippingPrice,
      taxPrice,
      totalPrice: totalPrice + taxPrice + shippingPrice,
    };
    try {
      setLoading(true);
      const response = await fetch("/api/orders/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(datas),
      });
      const data = await response.json();
      setLoading(false);
      router.push(`/orders/${data._id}`);
      clearCart();
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <div>
      <CheckoutWizard activeStep={3} />
      <h1 className="mb-4 text-xl">Place Order</h1>
      <div className="grid md:grid-cols-4 md:gap-5">
        <div className="overflow-x-auto md:col-span-3">
          <div className="card p-5">
            <h2 className="mb-2 text-lg">Shipping Address</h2>
            <div>
              {shippingAddress.name}, {shippingAddress.address},{" "}
              {shippingAddress.city},{shippingAddress.postalCode} ,
              {shippingAddress.country}
            </div>
            <div>
              <Link href="/shipping">Edit</Link>
            </div>
          </div>
          <div className="card p-5">
            <h2 className="mb-2 text-lg">Payment Method</h2>
            <h2>{paymentMethod}</h2>
            <div>
              <Link href="/payment">Edit</Link>
            </div>
          </div>
          <div className="card p-5">
            <h2 className="mb-2 text-lg">Order Items</h2>
            <table className="min-w-full">
              <thead className="border-b">
                <tr>
                  <th className="px-5 text-left">Item</th>
                  <th className="px-5 text-left">Quantity</th>
                  <th className="px-5 text-left">Price</th>
                  <th className="px-5 text-left">Subtotal</th>
                </tr>
              </thead>
              <tbody>
                {cart.map((item) => {
                  return (
                    <tr key={item._id} className="border-b">
                      <td>
                        <Link href={`/products/${item.slug}`}>
                          <span className="flex items-center">
                            <Image
                              src={item.images[0]}
                              alt={item.name}
                              width={50}
                              height={50}
                              className="w-8 h-8 mr-4 md:h-12 md:w-12 object-cover rounded-full"
                            />
                            &nbsp;{item.name}
                          </span>
                        </Link>
                      </td>
                      <td className="p-5 text-right">{item.quantity}</td>
                      <td className="p-5 text-right">${item.price}</td>
                      <td className="p-5 text-right">
                        ${item.quantity * item.price}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
            <div>
              <Link href="/cart">Edit</Link>
            </div>
          </div>
          <div className="card p-5">
            <h2 className="mb-2 flex justify-between">Order Summary</h2>
            <li>
              <div className="mb-2 flex justify-between">
                <div>Items</div>
                <div>${totalPrice}</div>
              </div>
            </li>
            <li>
              <div className="mb-2 flex justify-between">
                <div>Tax</div>
                <div>${taxPrice}</div>
              </div>
            </li>
            <li>
              <div className="mb-2 flex justify-between">
                <div>Shipping Price</div>
                <div>${shippingPrice}</div>
              </div>
            </li>
            <li>
              <div className="mb-2 flex justify-between">
                <div>Total Price</div>
                <div>${totalPrice + taxPrice + shippingPrice}</div>
              </div>
            </li>
            <li>
              <button className="primary-button w-full" onClick={handleOrder}>
                {loading ? "...Loading" : "Place Order"}
              </button>
            </li>
          </div>
        </div>
      </div>
    </div>
  );
};

PlaceOrder.auth = true;

export default PlaceOrder;
