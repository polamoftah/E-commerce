import React, { useContext } from "react";
import { Navigate, NavLink, useNavigate } from "react-router-dom";
import { usercountext } from "../../Context/UserContext";
import { useEffect } from "react";
import { cartcontext } from "../../Context/CartContext";
import image from "../../assets/images/freshcart-logo.svg";
export default function Navbar() {
  let { getCart } = useContext(cartcontext);
  useEffect(() => {
    getCart();
  }, [getCart]);

  let { settoken, token } = useContext(usercountext);
  let navigate = useNavigate();

  function logout() {
    localStorage.removeItem("token");
    settoken(null);
    navigate("/Login");
  }
  return (
    <>
      <nav className="bg-gray-400 border-gray-200">
        <div className="flex flex-wrap items-center justify-between mx-auto max-w-screen-xl p-4">
          {/* Logo and Brand Name */}
          <div className="flex items-center gap-5">
            <NavLink
              to="https://flowbite.com"
              className="flex items-center space-x-3 rtl:space-x-reverse"
            >
              <img src={image} className="h-8" alt="Flowbite Logo" />
              <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">
                Flowbite
              </span>
            </NavLink>
          </div>

          {/* Navbar Content */}
          <div className="flex items-center justify-between w-full xl:w-auto gap-5">
            {/* Main Navigation Links */}
            <div id="navbar" className="hidden md:flex md:items-center gap-5">
              {token && (
                <ul className="flex gap-5 text-gray-700 md:items-center">
                  <li>
                    <NavLink to="" className="hover:text-green-500">
                      Home
                    </NavLink>
                  </li>
                  <li>
                    <NavLink to="Cart" className="hover:text-green-500">
                      Cart
                    </NavLink>
                  </li>
                  <li>
                    <NavLink to="Products" className="hover:text-green-500">
                      Products
                    </NavLink>
                  </li>
                  <li>
                    <NavLink to="brands" className="hover:text-green-500">
                      Brand
                    </NavLink>
                  </li>
                  <li>
                    <NavLink to="Categories" className="hover:text-green-500">
                      Categories
                    </NavLink>
                  </li>
                  <li>
                    <NavLink to="Wishlist" className="hover:text-green-500">
                      Wishlist
                    </NavLink>
                  </li>
                </ul>
              )}
            </div>

            {/* Right-Side Content: Icons and Auth Links */}
            <div className="flex items-center gap-4 ml-auto">
              {/* Social Icons */}
              <ul className="flex gap-4 justify-center">
                <li>
                  <i className="fab fa-facebook"></i>
                </li>
                <li>
                  <i className="fab fa-twitter"></i>
                </li>
                <li>
                  <i className="fab fa-tiktok"></i>
                </li>
                <li>
                  <i className="fa-brands fa-instagram"></i>
                </li>
              </ul>

              {/* Auth Links */}
              {!token ? (
                <div className="flex gap-4">
                  <NavLink
                    to="Login"
                    className="text-sm text-gray-800 dark:text-white hover:underline"
                  >
                    Login
                  </NavLink>
                  <NavLink
                    to="Register"
                    className="text-sm text-gray-800 dark:text-white hover:underline"
                  >
                    Register
                  </NavLink>
                </div>
              ) : (
                <span
                  onClick={logout}
                  className="cursor-pointer text-sm text-gray-600 dark:text-white hover:underline"
                >
                  Logout
                </span>
              )}
            </div>
          </div>
        </div>
      </nav>
    </>
  );
}
