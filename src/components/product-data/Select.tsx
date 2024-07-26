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
import { ControllerRenderProps } from "react-hook-form";

interface ISelectItems {
    name:string,
  control: ControllerRenderProps<{
    name: string;
    price: number;
    discount: number;
    quantity: number;
    description: string;
    category: string;
    subcategory: string;
  }>;
  placeholder: string;
}

export function SelectItems({name, control, placeholder }: ISelectItems) {
  const { data: categories } = useGetCategories();
  const {data:subcategories}=useGetSubcategories()

  return (
    <Select
      {...control}
      value={control.value as string}
      onValueChange={(value) => control.onChange(value)}
    >
      <SelectTrigger>
        <SelectValue placeholder={placeholder} />
      </SelectTrigger>
      <SelectContent>
        {name==="category" ? (categories?.map((category: ICategory) => (
          <SelectItem key={category._id} value={category.slugname}>
            {category.name}
          </SelectItem>
        ))):(subcategories?.map((subcategory: ISubcategory) => (
          <SelectItem key={subcategory._id} value={subcategory.slugname}>
            {subcategory.name}
          </SelectItem>
        )))}
      </SelectContent>
    </Select>
  );
}
