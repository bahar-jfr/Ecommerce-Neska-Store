import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { pageLevelLocalization } from "@/constants/localization";
import Link from "next/link";

export default function AlertModal() {
  return (
    <AlertDialog>
      <AlertDialogTrigger className="text-right">
        <Button className="w-fit text-white">
          {pageLevelLocalization.products.singleProduct.submitComment}
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle className="text-right">
            {pageLevelLocalization.products.singleProduct.loginFirst}
          </AlertDialogTitle>
        </AlertDialogHeader>
        <AlertDialogFooter className="flex gap-6">
          <AlertDialogCancel className="border-primary">
            {pageLevelLocalization.products.singleProduct.later}
          </AlertDialogCancel>
          <Link href={"/auth?action=login"}>
            <AlertDialogAction className="text-white">
              {pageLevelLocalization.products.singleProduct.loginAccount}
            </AlertDialogAction>
          </Link>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
