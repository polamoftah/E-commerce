import React, { useContext } from "react";
import style from "./products.module.css";
import axios from "axios";
import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { cartcontext } from "../../Context/CartContext";
import { Wishcontext } from "../../Context/Wishlistcontext";
import toast from "react-hot-toast";

export default function Products() {
  let { addWish } = useContext(Wishcontext);
  let { addTocart } = useContext(cartcontext);

  // Handle adding to wishlist
  async function addtowish(id) {
    let flag = await addWish(id); // Receive the flag (true/false) from addWish
    if (flag) {
      toast.success("Product added to your wishlist");
    } else {
      toast.error("Error  wishlist");
    }
  }

  // Handle adding to cart
  async function addproductcart(id) {
    let flag = await addTocart(id);
    if (flag) {
      toast.success("Product added successfully to your cart");
    } else {
      toast.error("Error adding product to your cart");
    }
  }

  // Fetch products
  function getproduct() {
    return axios.get(`https://ecommerce.routemisr.com/api/v1/products`);
  }

  let { data, error, isError, isFetching, isLoading } = useQuery({
    queryKey: ["products"],
    queryFn: getproduct,
    select: (data) => data.data.data,
    staleTime: 6000,
    retry: 3,
    retryDelay: 3000,
  });

  if (isLoading) {
    return <i className="fa fa-spin fa-spinner"></i>;
  }
  if (isError) {
    return <p>{error}</p>;
  }

  return (
    <>
      {!isLoading && (
        <div className="grid lg:grid-cols-6 md:grid-cols-4 sm:grid-cols-2 gap-5">
          {data?.map((product) => (
            <div
              key={product.id}
              className="group overflow-hidden text-start p-3 shadow-sm relative"
            >
              <Link
                to={`/productdetails/${product.id}/${product.category.name}`}
              >
                <img
                  src={product.imageCover}
                  alt={product.title}
                  className="w-full h-48 object-cover rounded-md"
                />
                <h3 className="text-green-500">{product.category.name}</h3>
                <h2>{product.title.split(" ", 2).join(" ")}</h2>
                <div className="justify-between flex items-center">
                  {product.priceAfterDiscount ? (
                    <div className="text-sm">
                      <span className="line-through text-red-700 mr-2">
                        {product.price} EGP
                      </span>
                      <span>{product.priceAfterDiscount} EGP</span>
                    </div>
                  ) : (
                    <span>{product.price} EGP</span>
                  )}
                  {product.priceAfterDiscount && (
                    <span className="bg-red-600 rounded-md text-white p-2 absolute top-0 left-0">
                      Sale
                    </span>
                  )}
                  <span>
                    <i className="text-yellow-400 fas fa-star"></i>
                    {product.ratingsAverage}
                  </span>
                </div>
              </Link>
              <button
                onClick={() => {
                  addproductcart(product.id);
                }}
                className="btn group-hover:translate-y-0 translate-y-[200%]"
              >
                Add to Cart
              </button>
              <span
                onClick={() => {
                  addtowish(product.id);
                }}
              >
                <i className="fa-solid fa-heart text-red-800"></i>
              </span>
            </div>
          ))}
        </div>
      )}
    </>
  );
}
