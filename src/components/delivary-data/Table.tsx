import { useGetOrders } from "@/api/orders/orders.queries";
import Modal from "@/components/delivary-data/Modal";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { localization, pageLevelLocalization } from "@/constants/localization";
import { formatPrice } from "@/lib/utils";
import { IOrders } from "@/types";
import "moment-jalaali";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function TableDelivary() {
  const [page, setPage] = useState(1);
  const { data, isFetching } = useGetOrders({ page: page, limit: 5 });
  const [totalPage, setTotalPage] = useState(data?.total_pages);
  const statusParam = useSearchParams();
  const status = statusParam.get("status") || "pending";
  const moment = require("moment-jalaali");

  useEffect(() => {
    setTotalPage(data?.total_pages);
  }, [data]);

  const handlePrev = () => {
    setPage((prev) => Math.max(prev - 1, 1));
  };

  const handleNext = () => {
    setPage((prev) => Math.min(prev + 1, totalPage));
  };

  return (
    <div className="flex flex-col gap-4 text-primary-foreground">
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
            {isFetching
              ? Array(3)
                  .fill(null)
                  .map((_, index) => (
                    <TableRow key={index}>
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
                  ? data?.data?.orders?.filter(
                      (order: IOrders) => !order.deliveryStatus
                    )
                  : data?.data?.orders?.filter(
                      (order: IOrders) => order.deliveryStatus
                    )
                )?.map((order: IOrders) => {
                  return (
                    <TableRow key={order._id}>
                      <TableCell>{order.user.firstname}</TableCell>
                      <TableCell>
                        {formatPrice(order.totalPrice)} {localization.toman}
                      </TableCell>
                      <TableCell>
                        {moment(order.createdAt.split("T")[0]).format(
                          "jYYYY/jMM/jDD"
                        )}
                      </TableCell>
                      <TableCell>
                        <Modal order={order} />
                      </TableCell>
                    </TableRow>
                  );
                })}
          </TableBody>
        </Table>
      </div>

      <div className="flex items-center gap-2 pt-8">
        <Button size={"sm"} onClick={handleNext}>
          &lt;&lt;
        </Button>
        <span>
          صفحه {page} از {totalPage}
        </span>
        <Button size={"sm"} onClick={handlePrev}>
          &gt;&gt;
        </Button>
      </div>
    </div>
  );
}
