import axios from "axios";
import { useFormik } from "formik";
import React, { useState, useContext } from "react";
import { cartcontext } from "../../Context/CartContext"; // Correct the import
import { data, useNavigate } from "react-router-dom";

export default function Payment() {
  const [cash, setCash] = useState(false);
  let token = localStorage.getItem("token");
  let navigate = useNavigate();

  const { CartId } = useContext(cartcontext);

  function handelpayment(values) {
    let apiobj = {
      shippingAddress: values,
    };
    if (cash) {
      handleCashPayment(apiobj); // Handle cash payment
    } else {
      handelonlinepayment(apiobj); // Handle online payment
    }
  }

  // Cash Payment handler
  function handleCashPayment(values) {
    let apiobj = {
      shippingAddress: values,
    };

    axios
      .post(`https://ecommerce.routemisr.com/api/v1/orders/${CartId}`, apiobj, {
        headers: {
          token: token,
        },
      })
      .then((res) => {
        console.log("Payment success:", res.data);
        navigate("/Allorders"); // Navigate to Allorders after successful payment
      })
      .catch((error) => {
        console.error("Payment error:", error);
      });
  }
  function handelonlinepayment(values) {
    let apiobj = {
      shippingAddress: values,
    };

    // axios
    // .post(
    //   `https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${CartId}?url=http://localhost:3000`,
    //   {
    //     apiobj
    //   }

    //     headers: {
    //       token: token,
    //     },

    // )
    axios
      .post(
        `https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${CartId}?url=http://localhost:3000`,
        {
          apiobj,
        },
        {
          headers: {
            token: token,
          },
        }
      )
      .then((response) => {
        console.log("Online Payment Success:", response.data);
        window.open(response.data.session.url); // Assuming session URL is returned
      })
      .catch((error) => {
        console.error("Online Payment Error:", error);
      });
  }

  // Formik payment handler
  const formikPayment = useFormik({
    initialValues: {
      details: "", // Ensure details are empty initially
      phone: "", // Default phone value, replace if needed
      city: "", // Default city value, replace if needed
    },
    onSubmit: handelpayment, // Pass the function reference correctly
  });

  return (
    <>
      <form
        onSubmit={formikPayment.handleSubmit}
        className="max-w-xl mx-auto text-black"
      >
        {/* Address input */}
        <div className="relative z-0 w-full mb-5 group">
          <input
            onBlur={formikPayment.handleBlur}
            onChange={formikPayment.handleChange}
            value={formikPayment.values.details}
            type="text"
            name="details"
            id="details"
            className="block py-2.5 px-0 w-full text-sm text-black bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-green-600 peer"
            placeholder=" "
            required
          />
          <label
            htmlFor="details"
            className="start-0 peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-green-600 peer-focus:dark:text-green-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
          >
            Enter your details address
          </label>
        </div>

        {/* Phone input */}
        <div className="relative z-0 w-full mb-5 group">
          <input
            onBlur={formikPayment.handleBlur}
            onChange={formikPayment.handleChange}
            value={formikPayment.values.phone}
            type="tel"
            name="phone"
            id="phone"
            className="block py-2.5 px-0 w-full text-sm text-black bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-green-600 peer"
            placeholder=" "
            required
          />
          <label
            htmlFor="phone"
            className="start-0 peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-green-600 peer-focus:dark:text-green-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
          >
            Enter your phone
          </label>
        </div>

        {/* City input */}
        <div className="relative z-0 w-full mb-5 group">
          <input
            onBlur={formikPayment.handleBlur}
            onChange={formikPayment.handleChange}
            value={formikPayment.values.city}
            type="text"
            name="city"
            id="city"
            className="block py-2.5 px-0 w-full text-sm text-black bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-green-600 peer"
            placeholder=" "
            required
          />
          <label
            htmlFor="city"
            className="start-0 peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-green-600 peer-focus:dark:text-green-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
          >
            Enter your city
          </label>
        </div>

        {/* Cash Payment Button */}
        <button
          onClick={() => {
            setCash(true); // Set payment method to cash
          }}
          type="submit"
          className="text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
        >
          Cash Payment
        </button>

        {/* Online Payment Button */}
        <button
          onClick={() => {
            setCash(false); // Set payment method to online
          }}
          type="submit"
          className="text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
        >
          Online Payment
        </button>
      </form>
    </>
  );
}
