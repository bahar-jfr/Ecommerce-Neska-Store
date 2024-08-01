import { pageLevelLocalization } from "@/constants/localization";
import Aos, * as AOS from "aos";
import "aos/dist/aos.css";
import Image from "next/image";
import { useEffect } from "react";

export default function Brands() {
  useEffect(() => {
    Aos.init();
    AOS.refresh();
  }, []);
  return (
    <div className="flex flex-col gap-8  ">
      <p className="text-3xl text-primary-foreground font-semibold">
        {pageLevelLocalization.home.brands}
      </p>
      <div className="flex flex-col gap-16 items-center justify-center ">
        <div
          className=" self-start rounded-full w-2/3 p-2 shadow-[1px_3px_10px_1px_rgb(0,0,0,0.1)] hover:shadow-[1px_3px_20px_1px_rgb(0,0,0,0.1)] cursor-pointer has-tooltip transition-all"
          data-aos="fade-left"
          data-aos-duration="300"
          data-aos-delay="100"
        >
          <span className="tooltip text-quaternary w-full text-left mr-64 mt-12">
            {pageLevelLocalization.home.clickToSee}
          </span>
        <div className="flex gap-6 items-center">
        <Image
            src={"/images/fitness-logo.png"}
            height={300}
            width={130}
            alt="nestele fitness logo"
          />
          <p className="text-primary-foreground leading-10 px-6">
            {pageLevelLocalization.home.brandsDescription.fitness}
          </p>
        </div>
        </div>
        <div
          className="  self-end w-2/3 flex flex-row-reverse rounded-full p-3.5 shadow-[1px_3px_10px_1px_rgb(0,0,0,0.1)] hover:shadow-[1px_3px_20px_1px_rgb(0,0,0,0.1)] cursor-pointer has-tooltip "
          data-aos="fade-right"
          data-aos-duration="300"
          data-aos-delay="100"
        >
          <span className="tooltip text-quaternary w-full text-right ml-64 mt-12">
            {pageLevelLocalization.home.clickToSee}
          </span>
          <div className="flex flex-row-reverse gap-6 items-center">
          <div className="py-11 px-3 w-fit bg-orange-950 rounded-full">
           <Image
              src={"/images/nescafe_logo_white.webp"}
              height={120}
              width={90}
              alt="nescafe  logo"
            />
           </div>
              <p className="text-primary-foreground leading-10 px-6 pr-10">
            {pageLevelLocalization.home.brandsDescription.nescafe}
          </p>
          </div>
        </div>
        <div
          className=" self-start w-2/3 rounded-full p-4 shadow-[1px_3px_10px_1px_rgb(0,0,0,0.1)] hover:shadow-[1px_3px_20px_1px_rgb(0,0,0,0.1)] cursor-pointer has-tooltip"
          data-aos="fade-left"
          data-aos-duration="300"
          data-aos-delay="100"
        >
          <span className="tooltip text-quaternary w-full text-left mr-64 mt-12">
            {pageLevelLocalization.home.clickToSee}
          </span>
          <div className="flex gap-6 items-center">
          <Image
            src={"/images/Starbucks_Logo.png"}
            height={300}
            width={112}
            alt="nescafe  logo"
          />
            <p className="text-primary-foreground leading-10 px-6">
            {pageLevelLocalization.home.brandsDescription.starbucks}
          </p>
          </div>
        </div>
      </div>
    </div>
  );
}
