import axios from 'axios';
import React, { useEffect, useState } from 'react'
/* import style from"./CategorySlider.module.css " */
import  Slider from 'react-slick'
export default function CategorySlider() {
  const [Categories, setCategories] = useState(null)
  function getCategories(){
    axios.get('https://ecommerce.routemisr.com/api/v1/categories')
    .then((res)=>{console.log(res.data.data);
     setCategories(res.data.data)
    })
    .catch((error)=>{console.log(error);
    })
  }
useEffect(()=>{
  getCategories()
},[])
  var settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 7,
    slidesToScroll: 1,
    autoplay: true,
    autoplayspeed: 1000,
  };
  return <>
 <Slider {...settings} className='mb-10'>
     {Categories?.map((Category)=>    <div  key={Category.id}><img src={Category.image} className='w-full h-[200px] object-cover' alt="" />
     <h3 >{Category.name}</h3></div> )}
   
    </Slider>

  </>
}
