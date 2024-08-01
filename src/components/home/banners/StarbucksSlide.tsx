import { pageLevelLocalization } from '@/constants/localization'
import Image from 'next/image'
import React from 'react'

export default function StarbucksSlide() {
  return (
    <div className="flex  h-[400px] w-full rounded-2xl px-20 py-8 bg-gradient-to-r from-green-800 to-emerald-300">
    <div className="relative w-full h-1/2 flex justify-center drop-shadow-2xl ">
      <div className="absolute left-1/3 ml-40 rotate-6 z-10 top-8 w-1/3 ">
        <Image
          src="/images/vanilaone.png"
          height={500}
          width={300}
          alt="mug"
          className="ml-0 "
        />
      </div>
      <div className="absolute left-1/3 ml-64 rotate-12 top-5 w-1/3 ">
        <Image
          src="/images/cookieone.png"
          height={500}
          width={300}
          alt="mug"
          className="ml-0 "
        />
      </div>
      <div className="absolute left-1/3 z-30  w-1/3 ">
        <Image
          src="/images/vanilboxstar.png"
          height={500}
          width={500}
          alt="mug"
          className="ml-0 "
        />
      </div>
      <div className="absolute right-1/2 mr-44 -rotate-12 z-0 top-11 w-1/4">
        <Image
          src="/images/carameltakeaway.png"
          height={270}
          width={270}
          alt="gold cappuccino"
          className=""
        />
      </div>

      <div className=" absolute right-1/2 mr-12 -rotate-6 top-12 z-10 w-1/4">
        <Image
          src="/images/espersostarr.png"
          height={250}
          width={280}
          alt="andus"
        />
      </div>
      <div className=" absolute right-0 w-1/2 top-1/2 pt-8 pr-4 text-3xl text-white">
        <h1>
          {pageLevelLocalization.home.banner.starbucksTitle.summer}
        </h1>
      </div>
      <div className="absolute right-0  top-1/2 pt-20 pr-32 text-5xl text-white font-bold">
        <p className="drop-shadow-lg">{pageLevelLocalization.home.banner.starbucksTitle.just}</p>
      </div>
      <div className="absolute left-0 top-1/2 pt-20 pl-7  text-white">
        <p className="font-bold text-5xl drop-shadow-lg">
          {pageLevelLocalization.home.banner.starbucksDesc.drink}
        </p>
        <div className="absolute left-0 text-2xl  pt-3 ">
          <p>
            {pageLevelLocalization.home.banner.starbucksDesc.cold}{" "}
            {pageLevelLocalization.home.banner.starbucksDesc.cool}
          </p>
        </div>
      </div>
    </div>
  </div>
  )
}
