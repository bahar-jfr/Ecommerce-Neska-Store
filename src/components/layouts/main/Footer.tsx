import { localization, pageLevelLocalization } from "@/constants/localization";
import { AiOutlineTikTok } from "react-icons/ai";
import { FaFacebookF, FaInstagram, FaTelegramPlane } from "react-icons/fa";
import { IoLogoTwitter } from "react-icons/io5";
import { RiLinkedinFill } from "react-icons/ri";

export default function Footer() {
  return (
    <footer className="bg-tertiary text-white w-full flex flex-col gap-4 px-36 py-16">
      <div className="flex gap-12 justify-between ">
        <div className="flex flex-col gap-6">
          <p className="text-xl font-bold ">{pageLevelLocalization.footer.links}</p>
          <div className="flex flex-col gap-4">
            <p className="w-fit hover:font-semibold">{localization.mainPage}</p>
            <p className="w-fit hover:font-semibold">{localization.store}</p>
            <p className="w-fit hover:font-semibold">{localization.aboutUs}</p>
          </div>
        </div>
        <div className="flex flex-col gap-6">
          <p className="text-xl font-bold ">{pageLevelLocalization.footer.contact}</p>
          <div className="text-tertiary flex flex-row-reverse gap-5">
            <IoLogoTwitter
              size={32}
              className="bg-quaternary rounded-full p-1.5 hover:bg-white transition-all ease-out"
            />
            <FaFacebookF
              size={32}
              className="bg-quaternary rounded-full p-1.5 hover:bg-white"
            />
            <FaTelegramPlane
              size={32}
              className="bg-quaternary rounded-full p-1.5 hover:bg-white"
            />
            <FaInstagram
              size={32}
              className="bg-quaternary rounded-full p-1.5 hover:bg-white"
            />
            <AiOutlineTikTok
              size={32}
              className="bg-quaternary rounded-full p-1.5 hover:bg-white"
            />
            <RiLinkedinFill
              size={32}
              className="bg-quaternary rounded-full p-1.5 hover:bg-white"
            />
          </div>
        </div>
      </div>
      <hr className="w-full" />
      <div className="flex justify-center">&copy;{pageLevelLocalization.footer.copyRight}</div>
    </footer>
  );
}
