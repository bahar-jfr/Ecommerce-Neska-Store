import { useGetSubcategories } from "@/api/subcategory/subcategory.queries";
import { DropdownMenuItem } from "@/components/ui/dropdown-menu";
import { ISubcategory } from "@/types";
import { useSearchParams } from "next/navigation";
import { useRouter } from "next/router";

export function Subcategory({ catId }: { catId: string }) {
  const { data: subcategories } = useGetSubcategories(catId);
  const searchParams = useSearchParams();
  const router = useRouter();

  const setSearchParams = (name: string, value: string) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set(name, value);

    return params.toString();
  };

  return (
    <>
      {subcategories?.map((subcategory: ISubcategory) => (
        <DropdownMenuItem
          key={subcategory._id}
          onClick={() =>
            router.push(
              `products?${setSearchParams("subcategory", `${subcategory._id}`)}`
            )
          }
        >
          {subcategory.name}
        </DropdownMenuItem>
      ))}
    </>
  );
}
