import React, { useContext } from 'react'
import style from './Login.module.css'
import {useFormik} from "formik"
import axios from "axios"
import { useNavigate } from 'react-router-dom';
import * as Yup from 'yup';
import { useState } from 'react';
import { usercountext } from '../../Context/UserContext';


 export default function Login() {
 let {settoken}= useContext(usercountext)
  const [errorApi, seterrorApi] = useState(null)
  const [loading, setloading] = useState(false)
let navigta=useNavigate()

 
let validationSchema = Yup.object().shape({

  email: Yup.string()
    .email("email is invalid")
    .required("email is required"),
  

  
  password: Yup.string()
    .matches(/^[A-Za-z0-9]{6,10}$/, "password must include letters and numbers, min 6 and max 10 characters")
    .required("password is required"),
  

});

async function handelLogin(values){
setloading(true)
 axios.post(`https://ecommerce.routemisr.com/api/v1/auth/signin`,values).then((res)=>{
  

  navigta("/")
  console.log(res);
  
  settoken(res.data.token)
  localStorage.setItem("token",res.data.token)
  setloading(false);
 }).catch((res)=>{

  seterrorApi(res.response.data.message)
  setloading(false);
 })


}
 let formikLogin= useFormik({
    initialValues:{
    
      email:"",
      password:"",
    
    },
    validationSchema:validationSchema,
  
    onSubmit:handelLogin
  })
  return (
    <>


    <h2 className='text-center text-green-400'>Login. now</h2>

  {errorApi?      <div className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
{errorApi}
</div>:null}


      <form  onSubmit={formikLogin.handleSubmit} className="max-w-xl mx-auto">
    

        <div className="relative  z-0 w-full mb-5 group">
          <input onBlur={formikLogin.handleBlur} onChange={formikLogin.handleChange} value={formikLogin.values.email}  type="email"name="email"id="email"className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-green-500 focus:outline-none focus:ring-0 focus:border-green-600 peer"placeholder=" "required/>
          <label htmlFor="email"className=" start-0 peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-green-600 peer-focus:dark:text-green-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
           enter your Email address
          </label>
          {formikLogin.errors.email&&formikLogin.touched.email?        <div className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
{formikLogin.errors.email}
</div>:null}
        </div>
        <div className="relative  z-0 w-full mb-5 group">
          <input onBlur={formikLogin.handleBlur}onChange={formikLogin.handleChange} value={formikLogin.values. password}  type="password"name="password"id="password"className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-green-500 focus:outline-none focus:ring-0 focus:border-green-600 peer"placeholder=" "required/>
          <label htmlFor="password"className=" start-0 peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-green-600 peer-focus:dark:text-green-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
           enter your password
          </label>
          {formikLogin.errors.email&&formikLogin.touched.password?        <div className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
{formikLogin.errors.password}
</div>:null}
        </div>
       
       
        <button
      /*   disabled={formikRegister.isValid || !formikRegister.dirty? true:false} */
         type="submit" className="text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800">
       {loading? <i className="fa-solid fa-spin fa-spinner"></i>: "Login"}
        </button>
      </form>
    </>
  )
}
