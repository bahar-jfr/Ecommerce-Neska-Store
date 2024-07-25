import { useToast } from "@/components/ui/use-toast";
import { pageLevelLocalization } from "@/constants/localization";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { deleteProduct, editMultiProduct, getProducts } from "@/api/products/products.api";

export function useGetProducts() {
  return useQuery({ queryKey: ["products"], queryFn: getProducts });
}

export function useDeleteProduct() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ["deleteProduct"],
    mutationFn: deleteProduct,
    onSuccess:()=>{
      queryClient.invalidateQueries({ queryKey: ["products"] });
    }
  });
  
}

export function useEditMultiProduct() {
  const { toast } = useToast();
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ["editProducts"],
    mutationFn: editMultiProduct,
    onSuccess: () => {
      toast({
        variant: "success",
        title: `${pageLevelLocalization.inventory.success}`,
      });

      queryClient.invalidateQueries({ queryKey: ["products"] });
    },
    onError: () => {
      toast({
        variant: "destructive",
        title: `${pageLevelLocalization.inventory.error}`,
      });
    },
  });
}
