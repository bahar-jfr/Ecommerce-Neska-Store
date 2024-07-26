import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { pageLevelLocalization } from "@/constants/localization";
import { ReactNode } from "react";
import { FaRegEdit } from "react-icons/fa";

export default function Modal({ children }: { children: ReactNode }) {
  return (
    <Dialog>
      <DialogTrigger>
        <FaRegEdit />
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="text-right pb-4">
            {pageLevelLocalization.productsData.editProduct}
          </DialogTitle>
        </DialogHeader>
        {children}
      </DialogContent>
    </Dialog>
  );
}
