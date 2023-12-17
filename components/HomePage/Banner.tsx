'use client'

import Slider from "react-slick";
import ProjectSlide from '@/components/homepage/ProjectSlide'
import Icon from '@/components/Icon'

export default function HomePageBanner() {
  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    nextArrow: (
        <Icon className="text-primary" name="arrow-right" width={32} height={32} />
    ),
    prevArrow: (
        <Icon className="text-primary" name="arrow-left" width={32} height={32} />
    )
  }

  return (
    <div className="w-full h-full desktop:py-[60px] mx-auto">
      <div className="text-heading-md text-body-16 text-white hidden" />
      <Slider {...settings}>
        <ProjectSlide />
        <ProjectSlide />
      </Slider>
    </div>
  )
}