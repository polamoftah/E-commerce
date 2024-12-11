import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import Products from "../products/products";
import { Link } from "react-router-dom";
import { cartcontext } from "../../Context/CartContext";
import toast from "react-hot-toast";
/* import style from"./.module.css " */
export default function Productdetails() {
  const [productdetails, setproductdetails] = useState({});
  const [relatedproducts, setrelatedproducts] = useState(null);
  const [isloading, setisloading] = useState(false);
  let navigate = useNavigate();
  let { addTocart } = useContext(cartcontext);
  let { id, category } = useParams();
  console.log(id);

  function getspificproduct(id) {
    setisloading(true);
    axios
      .get(`https://ecommerce.routemisr.com/api/v1/products/${id}`)
      .then((res) => {
        console.log(res.data.data);

        setproductdetails(res.data.data);
        setisloading(false).catch((error) => {
          console.log(error);
          setisloading(false);
        });
      });
  }
  useEffect(() => {
    getspificproduct(id);
    getProducts(category);
  }, [id, category]);

  function getProducts(category) {
    // Set loading before the request
    axios
      .get(`https://ecommerce.routemisr.com/api/v1/products`)
      .then((res) => {
        let result = res.data.data.filter(
          (Product) => Product.category.name == category
        );
        console.log(result);
        setrelatedproducts(result);

        // Turn off loading after success
      })
      .catch((error) => {
        console.error(error);
        // Turn off loading on error
      });
  }

  return (
    <>
      <div className="grid items-center grid-cols-[1fr_2fr] gap-5 p-5">
        {isloading ? (
          <i className="fa fa-spin fa-spinner items-center text-center "></i>
        ) : null}
        {/* Product Image */}
        <div>
          <img
            src={productdetails.imageCover}
            alt={productdetails.title}
            className="w-full h-auto rounded-lg"
          />
        </div>

        {/* Product Information */}
        <div>
          <h2 className="font-bold text-2xl mb-3">{productdetails.title}</h2>
          <p className=" p-4 rounded-lg">{productdetails.description}</p>

          {/* Pricing Section */}
          <div className="mt-4">
            {productdetails.priceAfterDiscount ? (
              <div className="text-sm">
                <span className="line-through text-red-700 mr-2">
                  {productdetails.price} EGP
                </span>

                <span className="text-green-600 font-bold">
                  {productdetails.priceAfterDiscount} EGP
                </span>
              </div>
            ) : (
              <span className="text-lg font-bold">
                {productdetails.price} EGP
              </span>
            )}
            <span className="">
              <i className=" text-yellow-400 fas fa-star"></i>
              {productdetails.ratingsAverage}
            </span>
            <button className="btn group-hover:translate-y-[0] translate-y-[200%]">
              add to cart
            </button>
          </div>
        </div>
      </div>

      {isloading ? (
        <div className="w-full h-screen flex items-center justify-center">
          <i className="fa fa-spin fa-spinner text-black text-4xl"></i>
        </div>
      ) : (
        <div className="grid lg:grid-cols-6 md:grid-cols-4 sm:grid-cols-2 gap-5">
          {relatedproducts?.length > 0 ? (
            relatedproducts.map((product) => (
              <div
                key={product.id}
                className="group overflow-hidden text-start p-3 shadow-sm relative"
              >
                <Link
                  to={`/productdetails/${product.id}/${product.category?.name}`}
                >
                  <img
                    src={product.imageCover}
                    alt={product.title}
                    className="w-full h-48 object-cover rounded-md"
                  />
                  <h3 className="text-green-500">{product.category?.name}</h3>
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
                  // onClick={() => {
                  //   addproductcart(product.id);
                  // }}
                  className="btn group-hover:translate-y-0 translate-y-[200%]"
                >
                  Add to Cart
                </button>
              </div>
            ))
          ) : (
            <p className="col-span-full text-center">
              No related products found.
            </p>
          )}
        </div>
      )}
    </>
  );
}
