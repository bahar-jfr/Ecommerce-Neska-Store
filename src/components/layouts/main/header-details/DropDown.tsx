import { useGetCategories } from "@/api/category/category.queries";
import { useGetSubcategories } from "@/api/subcategory/subcategory.queries";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuPortal,
  DropdownMenuSeparator,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { localization } from "@/constants/localization";
import { ICategory, ISubcategory } from "@/types";
import { HiOutlineMenu } from "react-icons/hi";
import { Subcategory } from "@/components/layouts/main/header-details/SubCategory";

export function DropDown() {
  const { data: categories } = useGetCategories();
  return (
    <DropdownMenu dir="rtl">
      <DropdownMenuTrigger asChild>
        <button>
          <HiOutlineMenu />
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56 mr-6 text-primary-foreground">
        <DropdownMenuLabel>{localization.category}</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          {categories?.map((category:ICategory) => {
            return (
              <DropdownMenuSub>
                <DropdownMenuSubTrigger className="gap-2">
                  {category.name}
                </DropdownMenuSubTrigger>
                <DropdownMenuPortal>
                <DropdownMenuSubContent>
                 <Subcategory catId={category._id}/>
                </DropdownMenuSubContent>
                </DropdownMenuPortal>
              </DropdownMenuSub>
            );
          })}
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}


