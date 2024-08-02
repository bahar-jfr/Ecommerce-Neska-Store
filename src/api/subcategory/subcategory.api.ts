import { api } from "@/api/api.config";

export async function getSubcategories(catId?:string){
    const res = await api.get(`/subcategories?category=${catId}`)
    return res.data.data.subcategories
}