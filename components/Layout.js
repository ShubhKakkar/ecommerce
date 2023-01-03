import React, { useContext } from "react";
import Link from "next/link";
import { StoreContext } from "../contexts/store";
import { signOut, useSession } from "next-auth/react";
import { Menu } from "@headlessui/react";
import DropdownLink from "./DropdownLink";

const Layout = ({ children }) => {
  const { data: session } = useSession();
  const [cart, addToCart, updateQuantity, removeFromCart, clearCart] =
    useContext(StoreContext);
  let totalQuantity = 0;
  for (let i = 0; i < cart.length; i++) {
    totalQuantity += cart[i].quantity;
  }
  return (
    <>
      <div className="flex flex-col min-h-screen justify-between">
        <header>
          <nav className="flex h-12 justify-between shadow-md items-center px-4">
            <Link href="/" className="text-lg font-bold">
              AyQ Beverages
            </Link>
            <div>
              <Link href="/cart" className="p-2">
                Cart
                {cart.length > 0 && (
                  <span className="ml-1 rounded-full bg-red-600 px-2 py-1 text-xs font-bold text-white">
                    {totalQuantity}
                  </span>
                )}
              </Link>
              {session ? (
                <Menu as="div" className="relative inline-block">
                  <Menu.Button className="text-blue-600">
                    {session.user.name}
                  </Menu.Button>
                  <Menu.Items className="absolute right-0 w-56 origin-top-right shadow-lg">
                    <Menu.Item>
                      <DropdownLink
                        className="dropdownLink"
                        href="/user/profile"
                      >
                        Profile
                      </DropdownLink>
                    </Menu.Item>
                    <Menu.Item>
                      <DropdownLink
                        className="dropdownLink"
                        href="/user/history"
                      >
                        Order history
                      </DropdownLink>
                    </Menu.Item>
                    <Menu.Item>
                      <button
                        className="dropdownLink w-full"
                        onClick={() => {
                          signOut();
                          clearCart();
                          localStorage.removeItem("shippingAddress");
                          localStorage.removeItem("paymentMethod");
                        }}
                      >
                        Logout
                      </button>
                    </Menu.Item>
                  </Menu.Items>
                </Menu>
              ) : (
                <Link href="/auth/login" className="p-2">
                  Login
                </Link>
              )}
            </div>
          </nav>
        </header>
        <main className="m-auto mt-4 mx-4">{children}</main>
        <footer className="flex justify-center items-center h-10 shadow-inner">
          Copyright @2023 AyQ Beverages
        </footer>
      </div>
    </>
  );
};

export default Layout;
