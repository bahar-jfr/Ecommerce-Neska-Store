import { useQuery } from "@tanstack/react-query";
import { getSubcategories } from "@/api/subcategory/subcategory.api";

export function useGetSubcategories(catId?:string){
    return useQuery({
        queryKey:["subcategories",catId],
        queryFn: ()=>getSubcategories(catId)
    })
}