import { Button } from "@/components/ui/button";
import { Card, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { pageLevelLocalization } from "@/constants/localization";
import { FaCircleCheck } from "react-icons/fa6";

export default function Success() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-primary">
      <Card className="p-24 flex flex-col gap-12 items-center">
        <CardHeader>
          <CardTitle
            className="text-success flex gap-4
          "
          >
            {pageLevelLocalization.payment.successPayment}
            <FaCircleCheck className="text-success" />
          </CardTitle>
        </CardHeader>

        <CardFooter>
          <a href={"/"}>
            <Button className="text-white ">
              {pageLevelLocalization.payment.backToHome}
            </Button>
          </a>
        </CardFooter>
      </Card>
    </div>
  );
}
