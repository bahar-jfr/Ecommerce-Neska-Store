import { Button } from "@/components/ui/button";
import { HiOutlineMenu } from "react-icons/hi";

import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { localization, pageLevelLocalization } from "@/constants/localization";
import Link from "next/link";

export function SideNav() {
  return (
    <aside>
      <Sheet>
        <SheetTrigger asChild>
          <Button className="text-white flex gap-4">
            <HiOutlineMenu /> <p>{pageLevelLocalization.adminLayout.menu}</p>{" "}
          </Button>
        </SheetTrigger>
        <SheetContent className="fixed top-0 bottom-0 w-64 bg-background p-6 shadow-lg">
          <SheetHeader>
            <SheetTitle className="text-primary-foreground">
              {localization.adminPanel}
            </SheetTitle>
            <SheetDescription className="">
              <ul className="flex flex-col gap-4 text-lg ">
                <Link href={"/dashboard"}>
                  {" "}
                  <li className="hover:text-primary-foreground hover:font-semibold">
                    {pageLevelLocalization.adminLayout.dashboard}
                  </li>
                </Link>
                <hr />
                <li>
                  {pageLevelLocalization.adminLayout.tables}
                  <ul className="flex flex-col gap-4 pr-4 pt-4">
                    <Link href={"/dashboard/product-data"}>
                      <li className="hover:text-primary-foreground hover:font-semibold">
                       {pageLevelLocalization.adminLayout.productData}
                      </li>
                    </Link>
                    <Link href={"/dashboard/inventory-data"}>
                      <li className="hover:text-primary-foreground hover:font-semibold">
                       {pageLevelLocalization.adminLayout.productInventory}
                      </li>
                    </Link>
                    <Link href={"/dashboard/delivary-data"}>
                      <li className="hover:text-primary-foreground hover:font-semibold">
                      {pageLevelLocalization.adminLayout.ordersStatus}
                      </li>
                    </Link>
                  </ul>
                </li>
                <hr />
                <li>
                 {pageLevelLocalization.adminLayout.charts}
                  <ul className="flex flex-col gap-4 pr-4 pt-4">
                    <Link href={"/dashboard#LineChart"}>
                      <li className="hover:text-primary-foreground hover:font-semibold">
                       {pageLevelLocalization.adminLayout.lineChart}
                      </li>
                    </Link>
                    <Link href={"/dashboard#BarChart"}>
                      <li className="hover:text-primary-foreground hover:font-semibold">
                      {pageLevelLocalization.adminLayout.barChart}
                      </li>
                    </Link>
                    <Link href={"/dashboard#PieChart"}>
                      <li className="hover:text-primary-foreground hover:font-semibold">
                       {pageLevelLocalization.adminLayout.pieChart}
                      </li>
                    </Link>
                  </ul>
                </li>
                <hr />
                <Link href={"/dashboard#Calender"}>
                  <li className="hover:text-primary-foreground hover:font-semibold">
                    {pageLevelLocalization.adminLayout.calendar}
                  </li>
                </Link>
              </ul>
            </SheetDescription>
          </SheetHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4"></div>
          </div>
          <SheetFooter></SheetFooter>
        </SheetContent>
      </Sheet>
    </aside>
  );
}
