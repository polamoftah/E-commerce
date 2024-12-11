import React, { useEffect, useState } from "react";
import style from "./Brands.module.css";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";
export default function Brands() {
  function getBrands() {
    return axios.get(`https://ecommerce.routemisr.com/api/v1/brands`);
  }
  let { data, error, isError, isFetching, isLoading } = useQuery({
    queryKey: ["products"],
    queryFn: getBrands,
    select: (data) => data.data.data,
    staleTime: 6000,
    retry: 3,
    retryDelay: 3000,
  });
  console.log(data);
  if (isLoading) {
    return <i className="fa fa-spin fa-spinner"></i>;
  }
  if (isError) {
    return <p> {error}</p>;
  }

  console.log(data);
  return (
    <>
      {!isLoading && (
        <div className="grid lg:grid-cols-6 md:grid-cols-4 sm:grid-cols-2 gap-5">
          {data?.map((Brands) => (
            <div
              key={Brands._id}
              className="group overflow-hidden text-start p-3 shadow-sm relative"
            >
              <Link to={`/Branddetails/${Brands._id}`}>
                <img
                  src={Brands.image}
                  alt={Brands.name}
                  className="w-full h-48 object-cover rounded-md"
                />
                <h3 className="text-green-500">{Brands.name}</h3>
                {/* <h2>{Brands.name.split(" ", 2).join(" ")}</h2> */}
                <div className="justify-between flex items-center">
                  {Brands.priceAfterDiscount ? (
                    <div className="text-sm">
                      <span className="line-through text-red-700 mr-2">
                        {Brands.price} EGP
                      </span>
                      <span>{Brands.priceAfterDiscount}</span>
                    </div>
                  ) : (
                    <span>{Brands.price} </span>
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
            </div>
          ))}
        </div>
      )}
    </>
  );
}
