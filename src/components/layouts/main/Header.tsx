import { DropDown } from "@/components/layouts/main/header-details/DropDown";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { localization, pageLevelLocalization } from "@/constants/localization";
import { deleteCookie, hasCookie } from "cookies-next";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { HiOutlineShoppingCart } from "react-icons/hi";
import { IoPersonSharp } from "react-icons/io5";

export default function Header() {
  const accessToken = hasCookie("accessToken");
  const router = useRouter();

  const handleLogout = () => {
    deleteCookie("accessToken");
    deleteCookie("refreshToken");
    deleteCookie("role");
    router.push("/");
  };

  return (
    <header className="flex flex-col text-primary font-bold   top-0  left-0 w-full shadow-md ">
      <div className=" border-b-2 flex items-center w-full justify-between px-8 py-6">
        <div className="flex items-center w-1/3 gap-4">
          <Image priority src="/logo.svg" alt="logo" width={130} height={500} />
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
          <DropdownMenu dir="rtl">
            <DropdownMenuTrigger asChild>
              <Avatar>
                <AvatarFallback className="bg-slate-200 hover:bg-slate-300 ">
                  <IoPersonSharp />
                </AvatarFallback>
              </Avatar>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56 mr-6 text-primary-foreground">
              {accessToken ? (
                <DropdownMenuGroup
                  onClick={handleLogout}
                  className="pr-3 py-1 cursor-pointer hover:bg-secondary rounded-sm"
                >
                  {pageLevelLocalization.auth.logout}
                </DropdownMenuGroup>
              ) : (
                <DropdownMenuGroup
                  onClick={()=>router.push("/auth?action=login")}
                  className="pr-3 py-1 cursor-pointer hover:bg-secondary rounded-sm"
                >
                  {pageLevelLocalization.auth.login}
                </DropdownMenuGroup>
              )}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      <div className="flex items-center gap-6 py-3 px-4">
        <div className="pt-2">
          <DropDown />
        </div>
        <div className="flex gap-6">
          <Link href={"/"}>
            <p className="text-sm">{localization.mainPage}</p>
          </Link>
          <Link href={"/products"}>
            <p className="text-sm">{localization.products}</p>
          </Link>
          <Link href={"/about-us"}>
            <p className="text-sm">{localization.aboutUs}</p>
          </Link>
        </div>
      </div>
    </header>
  );
}
