import { useGetOrders } from "@/api/orders/orders.queries";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { pageLevelLocalization } from "@/constants/localization";
import { IOrders } from "@/types";

import { Skeleton } from "@/components/ui/skeleton";
import "moment-jalaali";
import { useSearchParams } from "next/navigation";

export default function TableDelivary() {
  const { data, isLoading } = useGetOrders();
  const statusParam = useSearchParams();
  const status = statusParam.get("status") || "pending";
  const moment = require("moment-jalaali");

  return (
    <div className="flex flex-col gap-4">
      <div className="rounded-lg border shadow-lg">
        <Table className="bg-white text-md rounded-lg">
          <TableHeader className="bg-primary  rounded-t-md">
            <TableRow className="hover:bg-primary">
              <TableHead className="text-right w-1/4 text-white rounded-tr-lg">
                {pageLevelLocalization.delivary.userName}
              </TableHead>
              <TableHead className="text-right  w-1/4 text-white">
                {pageLevelLocalization.delivary.totalPrice}
              </TableHead>
              <TableHead className="text-right w-1/4 text-white">
                {pageLevelLocalization.delivary.timeSubmitOrder}
              </TableHead>
              <TableHead className="text-right w-1/4 text-white rounded-tl-lg">
                {pageLevelLocalization.delivary.orderStatus}
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {isLoading
              ? Array(3)
                  .fill(Skeleton)
                  .map(() => (
                    <TableRow>
                      <TableCell>
                        <Skeleton className="w-1/3 h-[10px] bg-tableRow" />
                      </TableCell>
                      <TableCell>
                        <Skeleton className="w-1/4 h-[10px] bg-tableRow" />
                      </TableCell>
                      <TableCell>
                        <Skeleton className="w-1/2 h-[10px] bg-tableRow" />
                      </TableCell>
                      <TableCell>
                        <Skeleton className="w-2/5 h-[10px] bg-tableRow" />
                      </TableCell>
                    </TableRow>
                  ))
              : (status === "pending"
                  ? data.data.orders.filter(
                      (order: IOrders) => !order.deliveryStatus
                    )
                  : data.data.orders.filter(
                      (order: IOrders) => order.deliveryStatus
                    )
                ).map((order: IOrders) => {
                  return (
                    <TableRow key={order._id}>
                      <TableCell>{order.user.firstname}</TableCell>
                      <TableCell>{order.totalPrice}</TableCell>
                      <TableCell>
                        {moment(order.createdAt.split("T")[0]).format(
                          "jYYYY/jMM/jDD"
                        )}
                      </TableCell>
                      <TableCell>
                        {pageLevelLocalization.delivary.checkOrder}
                      </TableCell>
                    </TableRow>
                  );
                })}
          </TableBody>
        </Table>
      </div>

      <div className="flex items-center gap-2">
        <Button size={"sm"}>&lt;&lt;</Button>
        <span></span>
        <Button size={"sm"}>&gt;&gt;</Button>
      </div>
    </div>
  );
}
