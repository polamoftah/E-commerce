import React, { useEffect, useState } from 'react'
import style from './Home.module.css'
import Products from "../products/products";
import  MainSlider from "../MainSlider/MainSlider"
import CategorySlider from '../CategorySlider/CategorySlider';


export default function Home() {

  return <>
  < MainSlider/>
  <CategorySlider/>
  <div className='text-center mx-auto'>
  <Products />

  </div>
  </>
}
