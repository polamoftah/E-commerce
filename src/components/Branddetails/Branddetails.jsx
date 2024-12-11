import React, { useEffect, useState } from "react";
import axios from "axios";
import { data, Link, useParams } from "react-router-dom";
export default function Branddetails() {
  const [Brandsdetails, setBrandsdetails] = useState([]);
  const [relatedbrands, setrelatedbrands] = useState(null);
  let { name } = useParams();
  function getBrands(name) {
    // Set loading before the request
    axios
      .get(`https://ecommerce.routemisr.com/api/v1/brands`)
      .then((res) => {
        let result = res.data.data.filter(
          (Brand) => Brand.category.name == name
        );
        console.log(result);
        setrelatedbrands(result);

        // Turn off loading after success
      })
      .catch((error) => {
        console.error(error);
        // Turn off loading on error
      });
  }

  let { id } = useParams();
  function getSpecificBrand(id) {
    // Start loading when the request begins
    axios
      .get(`https://ecommerce.routemisr.com/api/v1/brands/${id}`)
      .then((res) => {
        console.log(res);
        setBrandsdetails(res.data.data); // Inspect the response
        // Set the fetched data
      })
      .catch((error) => {
        console.log(error);
      });
  }
  useEffect(() => {
    getSpecificBrand(id);
    getBrands(name);
  }, [id, name]);

  return (
    <>
      <div className="grid items-center grid-cols-[1fr_2fr] gap-5 p-5">
        {/* Product Image */}
        <div>
          <img
            src={Brandsdetails.image}
            alt={Brandsdetails.name}
            className="w-full h-auto rounded-lg"
          />
        </div>

        {/* Product Information */}
        <div>
          <h2 className="font-bold text-2xl mb-3">{Brandsdetails.name}</h2>
          <p className="p-4 rounded-lg">{Brandsdetails.description}</p>

          {/* Pricing Section */}
          <div className="mt-4">
            {Brandsdetails.priceAfterDiscount ? (
              <div className="text-sm">
                <span className="line-through text-red-700 mr-2">
                  {Brandsdetails.price}
                </span>
                <span className="text-green-600 font-bold">
                  {Brandsdetails.priceAfterDiscount}
                </span>
              </div>
            ) : (
              <span className="text-lg font-bold">{Brandsdetails.price}</span>
            )}

            <button className="btn group-hover:translate-y-[0] translate-y-[200%]">
              Add to Cart
            </button>
          </div>
        </div>
      </div>
      <div className="grid lg:grid-cols-6 md:grid-cols-4 sm:grid-cols-2 gap-5">
        {relatedbrands?.length > 0 ? (
          relatedbrands.map((Brands) => (
            <div
              key={Brands.id}
              className="group overflow-hidden text-start p-3 shadow-sm relative"
            >
              <Link to={`/Brandsdetails/${Brands.id}/${Brands.category?.name}`}>
                <img
                  src={Brands.imageCover}
                  alt={Brands.title}
                  className="w-full h-48 object-cover rounded-md"
                />
                <h3 className="text-green-500">{Brands.category?.name}</h3>
                <h2>{Brands.title.split(" ", 2).join(" ")}</h2>
                <div className="justify-between flex items-center">
                  {Brands.priceAfterDiscount ? (
                    <div className="text-sm">
                      <span className="line-through text-red-700 mr-2">
                        {Brands.price} EGP
                      </span>
                      <span>{Brands.priceAfterDiscount} EGP</span>
                    </div>
                  ) : (
                    <span>{Brands.price} EGP</span>
                  )}
                  {Brands.priceAfterDiscount && (
                    <span className="bg-red-600 rounded-md text-white p-2 absolute top-0 left-0">
                      Sale
                    </span>
                  )}
                  <span>
                    <i className="text-yellow-400 fas fa-star"></i>
                    {Brands.ratingsAverage}
                  </span>
                </div>
              </Link>
              <button
                // onClick={() => {
                //   addBrandscart(Brands.id);
                // }}
                className="btn group-hover:translate-y-0 translate-y-[200%]"
              >
                Add to Cart
              </button>
            </div>
          ))
        ) : (
          <p className="col-span-full text-center">No related Brandss found.</p>
        )}
      </div>
    </>
  );
}
