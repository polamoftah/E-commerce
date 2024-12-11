import React from "react";
import slid1 from "../../assets/images/slider-image-1.jpeg";
import slid2 from "../../assets/images/slider-image-2.jpeg";
import slid3 from "../../assets/images/slider-image-3.jpeg";
import grocery1 from "../../assets/images/grocery-banner-2.jpeg";
import grocery2 from "../../assets/images/grocery-banner.png";
import Slider from "react-slick";

export default function MainSlider() {
  var settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1, // Adjusted for responsiveness
    slidesToScroll: 1,
  /*   autoplay: true,
    autoplaySpeed: 1000, */ // Corrected spelling: "autoplaySpeed"
  };

  return (
  
    <>
      <div className="grid grid-cols-[2fr_1fr]">
<div className="overflow-hidden">
<Slider {...settings} className="mb-10">
        <img src={slid1} className="w-[100%] h-[200px] object-cover"  alt="" />
        <img src={slid2}className="w-[100%] h-[200px] object-cover"  alt="" />
        <img src={slid3}className="w-[100%] h-[200px] object-cover"  alt="" />

        </Slider>
</div>
<div>
  <img src={grocery1} className="w-full h-[100px] object-cover"  alt="" />
  <img src={grocery2} className="w-full h-[100px] object-cover"  alt="" />
</div>
      </div>
     
    </>
  );
}
