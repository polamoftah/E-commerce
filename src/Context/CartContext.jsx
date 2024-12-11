import axios from "axios";
import React, { createContext, useState } from "react";

export let cartcontext = createContext();

export default function CartContextprovider({ children }) {
  const [numberOfcart, setnumberOfcart] = useState(0);
  const [totalPrice, settotalPrice] = useState(0);
  const [productCarts, setproductCarts] = useState([]);
  const [CartId, setCartId] = useState(null);
  const token = localStorage.getItem("token"); // Access token here

  // Fetch the cart data
  function getCart() {
    if (!token) return; // Prevent API call if no token is available
    axios
      .get("https://ecommerce.routemisr.com/api/v1/cart", {
        headers: {
          token: token,
        },
      })
      .then((res) => {
        console.log(res);
        // Assuming the API returns data with these properties
        setnumberOfcart(res.data.numberOfCart);
        settotalPrice(res.data.data.totalPrice);
        setproductCarts(res.data.data.products);
        setCartId(res.data.cartId);
      })
      .catch((error) => {
        console.error(
          "Error fetching cart data:",
          error.response?.data || error.message
        );
      });
  }

  async function updateQuantity(id, count) {
    if (!token) return false; // Prevent update if no token is available
    return axios
      .put(
        `https://ecommerce.routemisr.com/api/v1/cart/${id}`,
        { count },
        {
          headers: {
            token,
          },
        }
      )
      .then((res) => {
        console.log(res);
        console.log(res.data.cartId);
        setCartId(res.data.cartId);
        setnumberOfcart(res.data.numberOfCart);
        settotalPrice(res.data.data.totalPrice);
        setproductCarts(res.data.data.products);
        return true;
      })
      .catch((error) => {
        console.error(
          "Error updating quantity:",
          error.response?.data || error.message
        );
        return false;
      });
  }

  // Add product to the cart
  async function addTocart(productId) {
    if (!token) return false; // Prevent adding if no token is available
    return axios
      .post(
        "https://ecommerce.routemisr.com/api/v1/cart",
        {
          productId: productId,
        },
        {
          headers: {
            token: token,
          },
        }
      )
      .then((res) => {
        getCart(); // Optionally update cart after adding the product
        return true;
      })
      .catch((error) => {
        console.error(
          "Error adding product to cart:",
          error.response?.data || error.message
        );
        return false;
      });
  }

  // Delete product from the cart
  function deleteitem(id) {
    if (!token) return; // Prevent delete if no token is available
    axios
      .delete(`https://ecommerce.routemisr.com/api/v1/cart/${id}`, {
        headers: {
          token: token,
        },
      })
      .then((res) => {
        console.log("Product deleted:", res.data);
        setnumberOfcart(res.data.numberOfCart);
        settotalPrice(res.data.data.totalPrice);
        setproductCarts(res.data.data.products);
      })
      .catch((error) => {
        console.error(
          "Error deleting product:",
          error.response?.data || error.message
        );
      });
  }

  return (
    <cartcontext.Provider
      value={{
        deleteitem,
        addTocart,
        getCart,
        updateQuantity,
        numberOfcart,
        totalPrice,
        productCarts,
        CartId,
      }}
    >
      {children}
    </cartcontext.Provider>
  );
}
