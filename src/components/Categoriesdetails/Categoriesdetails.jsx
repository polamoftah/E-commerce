import React, { useEffect, useState } from "react";
import axios from "axios";
import { data, Link, useParams } from "react-router-dom";
export default function Categoriesdetails() {
  const [Catygorydetails, setCatygorydetails] = useState(null);
  const [isloading, setIsLoading] = useState(true); // Start with loading as true
  let { id, name } = useParams();
  //if we have related catygories
  // const [relatedcatygory, setrelatedcatygory] = useState(null);
  // function getCatygory(name) {
  //   // Set loading before the request
  //   axios
  //     .get(`https://ecommerce.routemisr.com/api/v1/categories`)
  //     .then((res) => {
  //       let result = res.data.data.filter(
  //         (Catygory) => Catygory.category.name == name
  //       );
  //       console.log(result);
  //       setrelatedcatygory(result);

  //       // Turn off loading after success
  //     })
  //     .catch((error) => {
  //       console.error(error);
  //       // Turn off loading on error
  //     });
  // }

  function getSpecificCategory(id) {
    setIsLoading(true); // Start loading when the request begins
    axios
      .get(`https://ecommerce.routemisr.com/api/v1/categories/${id}`)
      .then((res) => {
        console.log(res.data); // Inspect the response
        setCatygorydetails(res.data); // Set the fetched data
        setIsLoading(false); // Stop loading after data is fetched
      })
      .catch((error) => {
        console.log(error);
        setIsLoading(false); // Stop loading if there is an error
      });
  }

  useEffect(() => {
    getSpecificCategory(id);
    // getCatygory(name);
  }, [id, name]);

  if (isloading) {
    return (
      <div className="w-full h-screen flex items-center justify-center">
        <i className="fa fa-spin fa-spinner text-black text-4xl"></i>
      </div>
    );
  }

  if (!Catygorydetails) {
    return <p>No data found.</p>; // Handle case where no data is available
  }

  return (
    <>
      <div className="grid items-center grid-cols-[1fr_2fr] gap-5 p-5">
        {/* Product Image */}
        <div>
          <img
            src={Catygorydetails.data.image}
            alt={Catygorydetails.data.name}
            className="w-full h-auto rounded-lg"
          />
        </div>

        {/* Product Information */}
        <div>
          <h2 className="font-bold text-2xl mb-3">
            {Catygorydetails.data.name}
          </h2>
          <p className="p-4 rounded-lg">{Catygorydetails.description}</p>

          {/* Pricing Section */}
          <div className="mt-4">
            {Catygorydetails.priceAfterDiscount ? (
              <div className="text-sm">
                <span className="line-through text-red-700 mr-2">
                  {Catygorydetails.price}
                </span>
                <span className="text-green-600 font-bold">
                  {Catygorydetails.priceAfterDiscount}
                </span>
              </div>
            ) : (
              <span className="text-lg font-bold">{Catygorydetails.price}</span>
            )}
            <span className="">{Catygorydetails.ratingsAverage}</span>
            <button className="btn group-hover:translate-y-[0] translate-y-[200%]">
              Add to Cart
            </button>
          </div>
        </div>
      </div>
      {/* if we have relatde catygories */}

      {/* <div className="grid lg:grid-cols-6 md:grid-cols-4 sm:grid-cols-2 gap-5">
        {relatedcatygory?.length > 0 ? (
          relatedcatygory.map((product) => (
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
      </div> */}
    </>
  );
}
