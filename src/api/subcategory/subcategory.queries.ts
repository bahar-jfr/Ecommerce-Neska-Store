import { useQuery } from "@tanstack/react-query";
import { getSubcategories } from "@/api/subcategory/subcategory.api";

export function useGetSubcategories(){
    return useQuery({
        queryKey:["subcategories"],
        queryFn: getSubcategories
    })
}