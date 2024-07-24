import { pageLevelLocalization } from "@/constants/localization";
import { AiOutlineUser } from "react-icons/ai";
import { HiOutlineShoppingCart } from "react-icons/hi";
import { IoWalletOutline } from "react-icons/io5";
import { PiCurrencyDollarSimple } from "react-icons/pi";

export default function SummaryBoxs() {
  return (
    <>
      <div className="flex items-center gap-5 border rounded-lg bg-white py-6 px-5 w-1/4">
        <HiOutlineShoppingCart
          size={40}
          className="bg-purple-200 text-purple-600 rounded-lg p-2  "
        />
        <div className="flex flex-col gap-2">
          <p className="font-medium text-lg">{pageLevelLocalization.dashboard.newOrders}</p>
          <p className="font-bold text-2xl">34567</p>
          <p>
            <span>+2.00%</span> (30 days)
          </p>
        </div>
      </div>
      <div className="flex items-center gap-3 border rounded-lg bg-white py-6 px-5 w-1/4">
        <PiCurrencyDollarSimple
          size={40}
          className="bg-green-200 text-green-600 p-2 rounded-lg "
        />
        <div className="flex flex-col gap-2">
          <p className="font-medium text-lg">{pageLevelLocalization.dashboard.profi}</p>
          <p className="font-bold text-2xl">34567</p>
          <p>
            <span>+2.00%</span> (30 days)
          </p>
        </div>
      </div>
      <div className="flex items-center gap-3 border rounded-lg bg-white py-6 px-5 w-1/4">
        <IoWalletOutline
          size={40}
          className="bg-blue-200 text-blue-600 p-2 rounded-lg "
        />
        <div className="flex flex-col gap-2">
          <p className="font-medium text-lg">{pageLevelLocalization.dashboard.totalSale}</p>
          <p className="font-bold text-2xl">34567</p>
          <p>
            <span>+2.00%</span> (30 days)
          </p>
        </div>
      </div>
      <div className="flex items-center gap-3 border rounded-lg bg-white py-6 px-5 w-1/4">
        <AiOutlineUser
          size={38}
          className="bg-orange-200 text-orange-600 p-2 rounded-lg "
        />
        <div className="flex flex-col gap-2">
          <p className="font-medium text-lg">{pageLevelLocalization.dashboard.newUser}</p>
          <p className="font-bold text-2xl">34567</p>
          <p>
            <span>+2.00%</span> (30 days)
          </p>
        </div>
      </div>
    </>
  );
}
