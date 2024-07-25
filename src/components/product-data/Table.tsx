
import { useDeleteProduct, useGetProducts } from "@/api/products/products.queries";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { FaRegEdit, FaTrashAlt } from "react-icons/fa";

import { localization, pageLevelLocalization } from "@/constants/localization";
import Image from "next/image";
import { IProduct } from "@/types";
import AlertModal from "@/components/product-data/AlertModal";

export default function TableProduct() {
  const { data } = useGetProducts();
    const {mutate}=useDeleteProduct()

  return (
    <div className="flex flex-col gap-4 ">
      <div className="flex justify-end pb-4">
        <Button
          variant={"outline"}
          className="border-2 border-primary bg-secondary shadow-md hover:bg-primary hover:text-secondary"
        >
          {pageLevelLocalization.productsData.addProduct}
        </Button>
      </div>
      <div className="rounded-lg border shadow-lg">
        <Table className="bg-white text-md rounded-lg">
          <TableHeader className="bg-primary  rounded-t-lg  ">
            <TableRow className="hover:bg-primary">
              <TableHead className="text-center w-1/4 text-white rounded-tr-lg">
                {pageLevelLocalization.productsData.productPhoto}
              </TableHead>
              <TableHead className="text-center w-1/4 text-white">
                {localization.productName}
              </TableHead>
              <TableHead className="text-center w-1/4 text-white">
                {localization.category}
              </TableHead>
              <TableHead className="text-center w-1/4 text-white rounded-tl-lg">
                {pageLevelLocalization.productsData.actions}
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {data?.data.products.map((product: IProduct) => {
              return (
                <TableRow key={product._id}>
                  <TableCell className="font-medium flex items-center justify-center">
                    <Image
                      src={`http://localhost:8000/${product?.images[0].replace(
                        "localhost:8000",
                        ""
                      )}`}
                      alt={product.name}
                      width={65}
                      height={50}
                    />
                  </TableCell>
                  <TableCell className="text-center">{product.name}</TableCell>
                  <TableCell className="text-center">
                    {product.category.name}/{product.subcategory.name}
                  </TableCell>
                  <TableCell className="text-center">
                    <div className="flex items-center gap-4 justify-center" >
                   <span className="transition-all ease-in p-2 hover:bg-tableRow hover:scale-125 rounded-full"> <FaRegEdit /></span>
                   <span className="transition-all ease-in px-2 py-1 hover:bg-tableRow hover:scale-125 rounded-full">
                    <AlertModal id={product._id} /> 
                 </span>
                      </div>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </div>
      <div className="flex items-center gap-2">
        <Button size="sm" className="text-secondary">
          &lt;&lt;
        </Button>
        <span>1</span>
        <Button size="sm" className="text-secondary">
          &gt;&gt;
        </Button>
      </div>
    </div>
  );
}
