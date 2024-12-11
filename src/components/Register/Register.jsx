import React, { useContext } from 'react'
import style from './Register.module.css'
import {useFormik} from "formik"
import axios from "axios"
import { useNavigate } from 'react-router-dom';
import * as Yup from 'yup';
import { useState } from 'react';
import { usercountext } from '../../Context/UserContext';


 export default function Register() {
 let {settoken}= useContext(usercountext)
  const [errorApi, seterrorApi] = useState(null)
  const [loading, setloading] = useState(false)
let navigta=useNavigate()

 
let validationSchema = Yup.object().shape({
  name: Yup.string()
    .min(3, "name min 3")
    .max(10, "name max is 10")
    .required("name is required"),
  
  email: Yup.string()
    .email("email is invalid")
    .required("email is required"),
  
  phone: Yup.string()
    .matches(/^01[0152][0-9]{8}$/, "phone invalid")
    .required("phone is required"),
  
  password: Yup.string()
    .matches(/^[A-Za-z0-9]{6,10}$/, "password must include letters and numbers, min 6 and max 10 characters")
    .required("password is required"),
  
  rePassword: Yup.string()
    .oneOf([Yup.ref("password")], "rePassword must match password")
    .required("rePassword is required")
});

async function handelregister(values){
setloading(true)
 axios.post(`https://ecommerce.routemisr.com/api/v1/auth/signup`,values).then((res)=>{
  console.log(res);
  settoken(res.data.token)
  localStorage("token",res.data.token)
console.log(res);

  navigta("/")
  setloading(false);
 }).catch((res)=>{
console.log(res);

  seterrorApi(res.response.data.message)
  setloading(false);
 })


}
 let formikRegister= useFormik({
    initialValues:{
      name:"",
      email:"",
      password:"",
      rePassword:"",
      phone:"",
    },
    validationSchema:validationSchema,
  
    onSubmit:handelregister
  })
  return (
    <>


    <h2 className='text-center text-green-400'>register now</h2>

  {errorApi?      <div className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
{errorApi}
</div>:null}


      <form  onSubmit={formikRegister.handleSubmit} className="max-w-xl mx-auto">
        <div className="relative  z-0 w-full mb-5 group">
          <input onBlur={formikRegister.handleBlur} onChange={formikRegister.handleChange} value={formikRegister.values.name}  type="text"name="name"id="name"className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-green-500 focus:outline-none focus:ring-0 focus:border-green-600 peer"placeholder=" "/>
          <label htmlFor="name"className=" start-0 peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-green-600 peer-focus:dark:text-green-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
          user name
          </label>
        </div>
{formikRegister.errors.name&&formikRegister.touched.name?        <div className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
{formikRegister.errors.name}
</div>:null}
        <div className="relative  z-0 w-full mb-5 group">
          <input onBlur={formikRegister.handleBlur} onChange={formikRegister.handleChange} value={formikRegister.values.email}  type="email"name="email"id="email"className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-green-500 focus:outline-none focus:ring-0 focus:border-green-600 peer"placeholder=" "required/>
          <label htmlFor="email"className=" start-0 peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-green-600 peer-focus:dark:text-green-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
           enter your Email address
          </label>
          {formikRegister.errors.email&&formikRegister.touched.email?        <div className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
{formikRegister.errors.email}
</div>:null}
        </div>
        <div className="relative  z-0 w-full mb-5 group">
          <input onBlur={formikRegister.handleBlur}onChange={formikRegister.handleChange} value={formikRegister.values. password}  type="password"name="password"id="password"className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-green-500 focus:outline-none focus:ring-0 focus:border-green-600 peer"placeholder=" "required/>
          <label htmlFor="password"className=" start-0 peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-green-600 peer-focus:dark:text-green-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
           enter your password
          </label>
          {formikRegister.errors.email&&formikRegister.touched.password?        <div className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
{formikRegister.errors.password}
</div>:null}
        </div>
        <div className="relative  z-0 w-full mb-5 group">
          <input onBlur={formikRegister.handleBlur} onChange={formikRegister.handleChange} value={formikRegister.values.rePassword}  type="password"name="rePassword"id="rePassword"className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-green-500 focus:outline-none focus:ring-0 focus:border-green-600 peer"placeholder=" "/>
          <label htmlFor="rePassword"className=" start-0 peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-green-600 peer-focus:dark:text-green-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
           enter your rePassword
          </label>
          {formikRegister.errors.email&&formikRegister.touched.rePassword?        <div className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
{formikRegister.errors.rePassword}
</div>:null}
        </div>
        <div className="relative  z-0 w-full mb-5 group">
          <input  onBlur={formikRegister.handleBlur} onChange={formikRegister.handleChange} value={formikRegister.values.phone}  type="tel"name="phone"id="phone"className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-green-500 focus:outline-none focus:ring-0 focus:border-green-600 peer"placeholder=" "/>
          <label htmlFor="phone"className=" start-0 peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-green-600 peer-focus:dark:text-green-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
           enter your phone
          </label>
          {formikRegister.errors.phone&&formikRegister.touched.phone?        <div className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
{formikRegister.errors.phone}
</div>:null}
        </div>
        <button
    /*     disabled={formikRegister.isValid|| !formikRegister.dirty? true:false} */
         type="submit" class="text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800">
       {loading? <i class="fa-solid fa-spin fa-spinner"></i>: "Register"}
        </button>
      </form>
    </>
  )
}
