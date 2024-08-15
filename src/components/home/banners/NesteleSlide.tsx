import Image from "next/image";

export default function NesteleSlide() {
  return (
    <div className="flex  h-[400px] w-full rounded-2xl px-20 py-8 bg-gradient-to-r from-sky-900 to-sky-300">
      <div className="relative w-full h-1/2 flex justify-center drop-shadow-2xl ">
        <div className="absolute left-1/3 z-30  w-1/3 ">
          <Image
            src="/images/orange.png"
            height={500}
            width={340}
            alt="mug"
            className="ml-0 "
          />
        </div>
        <div className="absolute right-1/2 mr-5  z-10 top-7 w-1/3">
          <Image
            src="/images/yellow1.png"
            height={270}
            width={300}
            alt="gold cappuccino"
          />
        </div>
        <div className="absolute right-1/2 mr-56  z-0 top-10 w-1/4">
          <Image
            src="/images/blue40.png"
            height={270}
            width={270}
            alt="gold cappuccino"
          />
        </div>

        <div className=" absolute left-1/2 ml-12  top-12 z-10 w-1/4">
          <Image
            src="/images/purple.png"
            height={250}
            width={280}
            alt="andus"
          />
        </div>
        <div className=" absolute left-1/2 ml-44 top-12 z-0 w-1/4">
          <Image
            src="/images/yellow.png"
            height={250}
            width={250}
            alt="andus"
          />
        </div>
      </div>
    </div>
  );
}
