import axios from "axios";
import React, { createContext, useState, useEffect } from "react";

// Create the context for the wishlist
export let Wishcontext = createContext();

export default function Wishlistcontextprovider({ children }) {
  const [token, setToken] = useState(localStorage.getItem("token"));

  const [countt, setcountt] = useState(0);

  function getWishlist() {
    axios
      .get(`https://ecommerce.routemisr.com/api/v1/wishlist`, {
        headers: {
          token: token,
        },
      })
      .then((res) => {
        console.log(res.data);
        // Assuming the API response has a 'count' property in res.data
        if (res.data && res.data.count) {
          setcountt(res.data.count); // Update the countt state
        } else {
          console.log("No count found in the response data");
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }

  // If token changes, update the context
  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    if (storedToken) {
      setToken(storedToken);
    }
  }, []);

  // Async function to add item to the wishlist
  async function addWish(id) {
    try {
      const response = await axios.post(
        `https://ecommerce.routemisr.com/api/v1/wishlist`,
        { productId: id },
        {
          headers: {
            token: token, // Add token to the headers
          },
        }
      );
      console.log(response);
      return true; // Return true on successful addition
    } catch (error) {
      console.error(error);
      return false; // Return false if an error occurs
    }
  }

  // Providing the addWish function, getWishlist function, and countt value via context
  return (
    <Wishcontext.Provider value={{ addWish, getWishlist, countt }}>
      {children}
    </Wishcontext.Provider>
  );
}
