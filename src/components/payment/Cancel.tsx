import { Card, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { MdCancel } from "react-icons/md";
import { pageLevelLocalization } from "@/constants/localization";
import Link from "next/link";

export default function Cancel() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-primary">
      <Card className="p-24 flex flex-col gap-12 items-center">
        <CardHeader>
          <CardTitle
            className="text-attention flex gap-4
        "
          >
           {pageLevelLocalization.payment.errorPayment}
            <MdCancel className="text-attention" />
          </CardTitle>
        </CardHeader>

        <CardFooter>
         <Link href={"/checkout"}>
         <Button className="text-white ">{pageLevelLocalization.payment.backToCheckout}</Button>
         </Link>
        </CardFooter>
      </Card>
    </div>
  );
}
