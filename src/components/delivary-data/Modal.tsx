import { useEditOrder } from "@/api/orders/orders.queries";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
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
import { Button } from "@/components/ui/button";

export default function Modal({ order }: { order: IOrders }) {
  const { mutate: editOrder } = useEditOrder();
  const moment = require("moment-jalaali");


  const handleDelivery = () => {
    editOrder({ id: order._id, data: { deliveryStatus: true } });
  };

  return (
    <Dialog>
      <DialogTrigger className="text-primary border-b-2 hover:font-semibold hover:border-b-primary">
        {pageLevelLocalization.delivary.checkOrder}
      </DialogTrigger>
      <DialogContent className="text-primary-foreground px-8">
        <DialogHeader>
          <DialogTitle className=" text-right">
            {pageLevelLocalization.delivary.orderDetails}
          </DialogTitle>
        </DialogHeader>
        <div className="flex justify-between">
          <div className="flex gap-4">
            <p>{pageLevelLocalization.delivary.userName} : </p>
            <p>
              {order.user.firstname} {order.user.lastname}
            </p>
          </div>
          <div className="flex gap-4">
            <p>{pageLevelLocalization.auth.phonenumber} :</p>
            <p>{order.user.phoneNumber}</p>
          </div>
        </div>
        <div className="flex gap-4">
          <p>{pageLevelLocalization.auth.address} :</p>
          <p>{order.user.address}</p>
        </div>
        <div className="flex gap-4">
          <p>{pageLevelLocalization.delivary.orderTime} :</p>
          <p>{moment(order.createdAt.split("T")[0]).format("jYYYY/jMM/jDD")}</p>
        </div>
        <div className="flex gap-4">
          <p>{pageLevelLocalization.delivary.delivaryTime}</p>
          <p>
            {moment(order.deliveryDate.split("T")[0]).format("jYYYY/jMM/jDD")}
          </p>
        </div>
        <div className="rounded-lg border shadow-lg">
          <Table className="bg-white text-md rounded-lg">
            <TableHeader className="bg-primary  rounded-t-md">
              <TableRow className="hover:bg-primary">
                <TableHead className="text-right w-2/3 text-white rounded-tr-lg">
                  {pageLevelLocalization.delivary.product}
                </TableHead>
                <TableHead className="text-right  w-1/3 text-white">
                  {pageLevelLocalization.delivary.totalPrice}
                </TableHead>
                <TableHead className="text-right w-1/4 text-white rounded-tl-lg">
                  {pageLevelLocalization.delivary.count}
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {order.products.map((product) => {
                return (
                  <TableRow key={product._id}>
                    <TableCell>{product.product.name}</TableCell>
                    <TableCell>
                      {formatPrice(product.product.price)} {localization.toman}
                    </TableCell>
                    <TableCell>{product.count}</TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </div>
        <DialogFooter>
          {order.deliveryStatus ? (
            <p>{pageLevelLocalization.delivary.delivared}</p>
          ) : (
            <Button className="text-white" onClick={handleDelivery}>
              {pageLevelLocalization.delivary.delivar}
            </Button>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
