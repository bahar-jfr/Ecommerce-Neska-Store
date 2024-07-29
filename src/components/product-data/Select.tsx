// ReusableSelectComponent.jsx
import { useGetCategories } from "@/api/category/category.queries";
import { useGetSubcategories } from "@/api/subcategory/subcategory.queries";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ICategory, ISubcategory } from "@/types";
import { Dispatch, SetStateAction } from "react";
import { ControllerRenderProps } from "react-hook-form";

interface ISelectItems {
  name: string;
  control: ControllerRenderProps<{
    name: string;
    description: string;
    category: string;
    subcategory: string;
  }>;
  placeholder: string;
  setCatId?: Dispatch<SetStateAction<string>>;
  catId?: string;
}

export function SelectItems({
  name,
  control,
  placeholder,
  setCatId,
  catId,
}: ISelectItems) {
  const { data: categories } = useGetCategories();
  const { data: subcategories } = useGetSubcategories();

  return (
    <Select
      {...control}
      value={control.value as string}
      onValueChange={(value) => {
        control.onChange(value);
        if (name === "category" && setCatId) {
          setCatId(value);
        }
      }}
    >
      <SelectTrigger>
        <SelectValue placeholder={placeholder} />
      </SelectTrigger>
      <SelectContent>
        {name === "category"
          ? categories?.map((category: ICategory) => (
              <SelectItem key={category._id} value={category._id}>
                {category.name}
              </SelectItem>
            ))
          : subcategories
              ?.filter(
                (subcategory: ISubcategory) => subcategory.category === catId
              )
              .map((subcategory: ISubcategory) => (
                <SelectItem key={subcategory._id} value={subcategory._id}>
                  {subcategory.name}
                </SelectItem>
              ))}
      </SelectContent>
    </Select>
  );
}
