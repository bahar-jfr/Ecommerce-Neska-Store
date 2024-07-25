import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { editMultiProduct, getProducts } from "./products.api";
import { IProduct } from "@/types";
import { useToast } from "@/components/ui/use-toast";
import { pageLevelLocalization } from "@/constants/localization";

export function useGetProducts() {
  return useQuery({ queryKey: ["products"], queryFn: getProducts });
}

export function useEditMultiProduct() {
  const { toast } = useToast()
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ["editProducts"],
    mutationFn: editMultiProduct,
    onSuccess: () => {
        toast({
          variant: "success",
          title: `${pageLevelLocalization.inventory.success}`,
        })
  
      queryClient.invalidateQueries({ queryKey: ["products"] });
    }, 
    onError:()=>{
      toast({
        variant: "destructive",
        title: `${pageLevelLocalization.inventory.error}`,
      })
    }
  });
}
