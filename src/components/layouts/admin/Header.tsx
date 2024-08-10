import { SideNav } from "@/components/layouts/admin/header-details/SideNav";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { localization, pageLevelLocalization } from "@/constants/localization";
import { useUserStore } from "@/store";
import { UserState } from "@/types";
import { deleteCookie, hasCookie } from "cookies-next";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { IoPersonSharp } from "react-icons/io5";

export function Header() {
  const { user} = useUserStore() as UserState;
  const accessToken = hasCookie("accessToken")
  const router = useRouter()

  const handleLogout = () => {
    localStorage.removeItem("user-storage");
    deleteCookie("accessToken");
    deleteCookie("refreshToken");
    deleteCookie("role");
    router.push("/");
  };

  return (
    <header className="flex items-center w-full justify-between px-10 py-6 relative">
      <div className="flex items-center w-1/2 gap-4 ">
        <SideNav />
      </div>
      <div className="text-primary-foreground flex items-center justify-end w-1/3 gap-4">
        <DropdownMenu>
          <DropdownMenuTrigger className="outline-none text-primary-foreground">
            {" "}
            <Avatar>
              <AvatarFallback>
                <IoPersonSharp />
              </AvatarFallback>
            </Avatar>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="ml-4 text-primary-foreground ">
            <DropdownMenuLabel className="flex gap-2 flex-row">   
              {user?.firstname} {user?.lastname}
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="flex flex-row-reverse">
              {" "}
              <Link href={"/"}>
                <p className="text-sm ">{localization.mainPage}</p>
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem className="flex flex-row-reverse" onClick={handleLogout}>
              {accessToken ? `${pageLevelLocalization.auth.logout}`: `${pageLevelLocalization.auth.login}`}
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
}
