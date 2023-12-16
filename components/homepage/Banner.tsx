'use client'

import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css"
import ProjectSlide from '@/components/homepage/ProjectSlide'

export default function HomePageBanner() {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1
  }

  return (
    <div className="w-full h-full desktop:py-[60px] mx-auto">
      <div className="text-heading-md text-body-16 text-white hidden" />
      <Slider {...settings}>
        <ProjectSlide />
      </Slider>
    </div>
  )
}