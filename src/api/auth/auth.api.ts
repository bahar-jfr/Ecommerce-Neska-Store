import { api } from "@/api/api.config"

export async function setUser(endpoint:string,data:object){
const response = await api.post(`${endpoint}`, data)
return response 
}