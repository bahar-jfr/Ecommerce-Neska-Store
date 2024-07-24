import { api } from "@/api/api.config"

export async function getProducts(){
    const res = await api.get("/products")
    return res.data
}