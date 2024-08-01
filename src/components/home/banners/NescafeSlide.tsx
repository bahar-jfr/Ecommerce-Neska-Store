import { pageLevelLocalization } from '@/constants/localization'
import Image from 'next/image'
import React from 'react'

export default function NescafeSlide() {
  return (
    <div className="flex  h-[400px] w-full rounded-2xl px-24 py-8 bg-gradient-to-r from-orange-400 to-yellow-200">
    <div className="relative w-full h-1/2 flex justify-center drop-shadow-2xl">
      <div className="absolute left-2  top-16 w-1/4 ">
        <Image
          src="/images/nescafemug.webp"
          height={500}
          width={500}
          alt="mug"
          className="ml-0 "
        />
      </div>
      <div className="absolute left-40 top-1 w-1/3 z-30 ">
        <Image
          src="/images/classic_FOPnescafe.png"
          height={320}
          width={320}
          alt="classic"
          className="mr-0"
        />
      </div>
      <div className="absolute left-28 z-20 top-11 w-1/4">
        <Image
          src="/images/gold.png"
          height={270}
          width={270}
          alt="gold cappuccino"
          className=""
        />
      </div>
      <div className=" absolute left-80 ml-8 top-16 z-10 w-1/4">
        <Image
          src="/images/cappuccino-qors.png"
          height={250}
          width={245}
          alt="cappuccino"
        />
      </div>
      <div className=" absolute left-96  top-40 z-10 w-1/4">
        <Image
          src="/images/nescafebarik.webp"
          height={250}
          width={245}
          alt="andus"
        />
      </div>
      <div className="pt-32 absolute right-0 w-1/2 text-3xl text-red-700">
          <h1 className="font-semibold">
            {pageLevelLocalization.home.banner.nescafeTitle}
          </h1>
          <p className="font-bold text-4xl pt-8 pr-60 drop-shadow-lg">{pageLevelLocalization.home.banner.nescafeDesc} 
          </p>
      </div>
    </div>
  </div>
  )
}
