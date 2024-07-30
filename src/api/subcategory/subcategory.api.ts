import { api } from "@/api/api.config";

export async function getSubcategories(){
    const res = await api.get("/subcategories")
    return res.data.data.subcategories
}