import { pageLevelLocalization } from "@/constants/localization";
import { FaTruckFast } from "react-icons/fa6";
import { BsBoxSeam } from "react-icons/bs";
import { BiSupport } from "react-icons/bi";
import { BsPatchCheckFill } from "react-icons/bs";

export default function Services() {
  return (
    <div className="w-full flex justify-center items-center gap-48 text-muted-foreground ">
        
      <div className="flex items-center gap-2    ">
      <FaTruckFast />
        <p>{pageLevelLocalization.products.singleProduct.send}</p>
      </div>
      <div className="flex items-center gap-2   ">
      <BiSupport />
        <p>{pageLevelLocalization.products.singleProduct.support}</p>
      </div>
      <div className="flex items-center gap-2   ">
      <BsBoxSeam />
        <p>{pageLevelLocalization.products.singleProduct.return}</p>
      </div>
      <div className="flex items-center gap-2   ">
      <BsPatchCheckFill />
        <p>{pageLevelLocalization.products.singleProduct.original}</p>
      </div>
    </div>
  );
}
