import { useDeleteProduct } from "@/api/products/products.queries";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { pageLevelLocalization } from "@/constants/localization";
import { UseMutateFunction } from "@tanstack/react-query";
import { AxiosResponse } from "axios";
import { FaTrashAlt } from "react-icons/fa";

interface IAlertModalProps {
  id: string;
  mutate: UseMutateFunction<AxiosResponse<any, any>, Error, string, unknown>;
}

export default function AlertModal({id}:{id:string}) {
  const { mutate } = useDeleteProduct();
  return (
    <AlertDialog >
      <AlertDialogTrigger>
          <FaTrashAlt />
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle className="text-right">{pageLevelLocalization.productsData.deleteTitle}</AlertDialogTitle>
          <AlertDialogDescription className="text-right pb-2 ">
     {pageLevelLocalization.productsData.deleteDescription}
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter className="flex gap-6">
          <AlertDialogCancel className="border-primary">{pageLevelLocalization.productsData.cancel}</AlertDialogCancel>
          <AlertDialogAction className="text-white" onClick={() => mutate(id)}>
            {pageLevelLocalization.productsData.delete}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
