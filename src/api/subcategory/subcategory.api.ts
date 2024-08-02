import { api } from "@/api/api.config";

export async function getSubcategories(catId?:string){
    const res = await api.get(catId ? `/subcategories?category=${catId}` : `/subcategories`)
    return res.data.data.subcategories
}