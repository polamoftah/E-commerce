import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
export default function Categories() {
  function getCatrgory() {
    return axios.get(`https://ecommerce.routemisr.com/api/v1/categories`);
  }
  let { data, error, isError, isFetching, isLoading } = useQuery({
    queryKey: ["Ctegory"],
    queryFn: getCatrgory,
    select: (data) => data.data.data,
    staleTime: 6000,
    retry: 3,
    retryDelay: 3000,
  });
  // console.log(data);
  if (isLoading) {
    return <i className="fa fa-spin fa-spinner"></i>;
  }
  if (isError) {
    return <p> {error}</p>;
  }

  return (
    <>
      {!isLoading && (
        <div className="grid lg:grid-cols-6 md:grid-cols-4 sm:grid-cols-2 gap-5">
          {data?.map((Category) => (
            <div
              key={Category._id}
              className="group overflow-hidden text-start p-3 shadow-sm relative"
            >
              <Link to={`/Categoriesdetails/${Category._id}/${Category.name}`}>
                <img
                  src={Category.image}
                  alt={Category.name}
                  className="w-full h-48 object-cover rounded-md"
                />
                <h3 className="text-green-500">{Category.name}</h3>

                <div className="justify-between flex items-center">
                  {Category.priceAfterDiscount ? (
                    <div className="text-sm">
                      <span className="line-through text-red-700 mr-2">
                        {Category.price}
                      </span>
                      <span>{Category.priceAfterDiscount}</span>
                    </div>
                  ) : (
                    <span>{Category.price} </span>
                  )}
                  {Category.priceAfterDiscount && (
                    <span className="bg-red-600 rounded-md text-white p-2 absolute top-0 left-0">
                      Sale
                    </span>
                  )}
                  <span>{Category.ratingsAverage}</span>
                </div>
              </Link>
            </div>
          ))}
        </div>
      )}
    </>
  );
}
