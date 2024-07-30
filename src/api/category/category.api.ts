import { api } from "@/api/api.config";

export async function getCategories(){
const res = await api.get("/categories")
return res.data.data.categories
}