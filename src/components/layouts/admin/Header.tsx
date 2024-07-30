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
import { IoPersonSharp } from "react-icons/io5";

export function Header() {
  return (
    <header className="flex items-center w-full justify-between px-10 py-6 relative">
      <div className="flex items-center w-1/2 gap-4 ">
        <SideNav />

        <input
          placeholder="جستجو"
          type="text"
          className="w-1/2 p-2 rounded-md outline-none bg-gray-100"
        />
      </div>
      <div className="flex items-center justify-end w-1/3 gap-4">
        <DropdownMenu>
          <DropdownMenuTrigger className="outline-none text-primary-foreground">
            {" "}
            <Avatar>
              <AvatarFallback>
                <IoPersonSharp />
              </AvatarFallback>
            </Avatar>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="ml-4">
            <DropdownMenuLabel>اسم و ایمیل شخص</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem>خروج</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
}
