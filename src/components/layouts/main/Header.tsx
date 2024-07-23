import { DropDown } from "@/components/layouts/main/header-details/DropDown";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import Image from "next/image";
import { HiOutlineShoppingCart } from "react-icons/hi";
import { IoPersonSharp } from "react-icons/io5";

export default function Header() {
  return (
    <header className="flex flex-col bg-secondary text-primary font-bold px-4 fixed top-0 left-0 w-full">
      <div className="flex items-center w-full justify-between px-8 py-4">
        <div className="flex items-center w-1/3 gap-4">
          <Image priority src="/2.svg" alt="logo" width={130} height={500} />
          <Input placeholder="جستجو" type="text" />
        </div>
        <div className="flex items-center justify-end w-1/3 gap-4">
          <div className="relative">
            <HiOutlineShoppingCart
              size={38}
              className="bg-slate-200 hover:bg-slate-300 p-2 rounded-full "
            />
            <Badge
              variant="outline"
              className="badge top-0 -start-0.2 absolute px-1 py-0.2 bg-blue-700 text-white"
            >
              8
            </Badge>
          </div>

          <Avatar>
            <AvatarFallback className="bg-slate-200 hover:bg-slate-300 ">
              <IoPersonSharp />
            </AvatarFallback>
          </Avatar>
        </div>
      </div>

      <div>
        <DropDown />
      </div>
    </header>
  );
}
