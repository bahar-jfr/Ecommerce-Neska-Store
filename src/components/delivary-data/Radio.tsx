import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { pageLevelLocalization } from "@/constants/localization";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

export function RadioDelivaryStatus() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const setSearchParams = (name: string, value: string) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set(name, value);

    return params.toString();
  };

  return (
    <RadioGroup defaultValue="pending" className="flex gap-6">
      <div
        className="flex items-center space-x-2 "
        onClick={() =>
          router.push(`${pathname}?${setSearchParams("status", "pending")}`)
        }
      >
        <RadioGroupItem value="pending" id="r1" />
        <Label htmlFor="r1">
          {pageLevelLocalization.delivary.pendingOrders}
        </Label>
      </div>
      <div
        className="flex items-center space-x-2"
        onClick={() =>
          router.push(`${pathname}?${setSearchParams("status", "delivered")}`)
        }
      >
        <RadioGroupItem value="delivered" id="r2" />
        <Label htmlFor="r2">
          {pageLevelLocalization.delivary.deliveredOrders}
        </Label>
      </div>
    </RadioGroup>
  );
}
