import { useGetCategories } from "@/api/category/category.queries";
import { useGetSubcategories } from "@/api/subcategory/subcategory.queries";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { localization, pageLevelLocalization } from "@/constants/localization";
import { ICategory, ISubcategory } from "@/types";
import { usePathname, useSearchParams } from "next/navigation";
import { useRouter } from "next/router";

export default function FilterBox() {
  const { data: categories } = useGetCategories();
  const { data: subcategories } = useGetSubcategories();

  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();

  const setSearchParams = (name: string, value: string) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set(name, value);

    return params.toString();
  };

  const handleDeleteFilters = ()=>{
    const params = new URLSearchParams(searchParams.toString());
    params.delete("category");
    params.delete("subcategory");
    params.delete("sort");
    router.push(`${pathname}?${params.toString()}`);
  }

  return (
    <div className="text-primary-foreground w-1/5 border-2 h-fit py-12 px-6 rounded-xl shadow-lg">
      <div className="flex items-center justify-between pb-3">
        <p className="text-xl font-semibold">
          {pageLevelLocalization.products.filter}
        </p>
        <p
          className="cursor-pointer text-attention font-semibold hover:text-destructive"
          onClick={handleDeleteFilters}
        >
          {pageLevelLocalization.products.deleteFilter}
        </p>
      </div>
      <Accordion type="single" collapsible className="w-full">
        <AccordionItem value="item-1">
          <AccordionTrigger>{localization.category}</AccordionTrigger>
          <AccordionContent>
            <RadioGroup className="px-4 py-4">
              {categories?.map((category: ICategory) => {
                return (
                  <div className="flex items-center gap-3 justify-between py-1 ">
                    <RadioGroupItem
                      value={category._id}
                      id={category._id}
                      onClick={(e) =>
                        router.push(
                          `${pathname}?${setSearchParams(
                            "category",
                            `${(e.target as  HTMLInputElement).value}`
                          )}`
                        )
                      }
                    />
                    <Label htmlFor={category._id}>{category.name}</Label>
                  </div>
                );
              })}
            </RadioGroup>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
      <Accordion type="single" collapsible className="w-full">
        <AccordionItem value="item-2">
          <AccordionTrigger>{localization.subcategory}</AccordionTrigger>
          <AccordionContent>
            <RadioGroup className="px-4 py-4">
              {subcategories?.map((subcategory: ISubcategory) => {
                return (
                  <div className="flex items-center gap-3 justify-between py-1 ">
                    <RadioGroupItem
                      value={subcategory._id}
                      id={subcategory._id}
                      onClick={(e) =>
                        router.push(
                          `${pathname}?${setSearchParams(
                            "subcategory",
                             `${(e.target as  HTMLInputElement).value}`
                          )}`
                        )
                      }
                    />
                    <Label htmlFor={subcategory._id}>{subcategory.name}</Label>
                  </div>
                );
              })}
            </RadioGroup>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
      <Accordion type="single" collapsible className="w-full">
        <AccordionItem value="item-3">
          <AccordionTrigger>{localization.price}</AccordionTrigger>
          <AccordionContent>
            <RadioGroup className="px-4 py-4">
              <div className="flex items-center justify-between gap-3 py-1">
                <RadioGroupItem
                  value="-price"
                  id="maxPrice"
                  onClick={(e) =>
                    router.push(
                      `${pathname}?${setSearchParams(
                        "sort",
                        `${(e.target as  HTMLInputElement).value}`
                      )}`
                    )
                  }
                />
                <Label htmlFor="maxPrice">
                  {pageLevelLocalization.products.maxPrice}
                </Label>
              </div>
              <div className="flex items-center justify-between gap-3 py-1">
                <RadioGroupItem
                  value="price"
                  id="minPrice"
                  onClick={(e) =>
                    router.push(
                      `${pathname}?${setSearchParams(
                        "sort",
                        `${(e.target as  HTMLInputElement).value}`
                      )}`
                    )
                  }
                />
                <Label htmlFor="minPrice">
                  {pageLevelLocalization.products.minPrice}
                </Label>
              </div>
            </RadioGroup>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
}
