import { useQuery } from "@tanstack/react-query";
import { getCategories } from "@/api/category/category.api";

export function useGetCategories(){
    return useQuery({
        queryKey:["categories"],
        queryFn: getCategories
    })
}