import {
  useDeleteProduct,
  useGetProducts,
} from "@/api/products/products.queries";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import AlertModal from "@/components/product-data/AlertModal";
import Modal from "@/components/product-data/Modal";
import { localization, pageLevelLocalization } from "@/constants/localization";
import { IProduct } from "@/types";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import EditForm from "./EditForm";

export default function TableProduct() {
  const [page, setPage] = useState(1);
  const { data, refetch } = useGetProducts({ page: page, limit: 3 });
  const [totalPage, setTotalPage] = useState(data?.total_pages);
  const { mutate } = useDeleteProduct();

  const handlePrev = () => {
    setPage((prev) => Math.max(prev - 1, 1));
    refetch();
  };

  const handleNext = () => {
    setPage((prev) => Math.min(prev + 1, totalPage));
    refetch();
  };

  return (
    <div className="flex flex-col gap-4 ">
      <div className="flex justify-end pb-4">
        <Link href={"/dashboard/product-data/add-product"}>
          <Button
            variant={"outline"}
            className="border-2 border-primary bg-secondary shadow-md hover:bg-primary hover:text-secondary"
          >
            {pageLevelLocalization.productsData.addProduct}
          </Button>
        </Link>
      </div>
      <div className="rounded-lg border shadow-lg">
        <Table className="bg-white text-md rounded-lg">
          <TableHeader className="bg-primary  rounded-t-lg  ">
            <TableRow className="hover:bg-primary">
            <TableHead className="text-center  text-white rounded-tr-lg">
                {pageLevelLocalization.productsData.productNum}
              </TableHead>
              <TableHead className="text-center w-1/4 text-white ">
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
            {data?.data.products.map((product: IProduct,index:number) => {
              return (
                <TableRow key={product._id}>
                  <TableCell className="text-center">{index}</TableCell>
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
                    <div className="flex items-center gap-4 justify-center">
                      <span className="transition-all ease-in px-2 py-1 hover:bg-tableRow hover:scale-125 rounded-full">
                        <Modal children={<EditForm productData={product} />} />
                      </span>
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
        <Button size="sm" className="text-secondary" onClick={handleNext}>
          &lt;&lt;
        </Button>
        <span>{page}</span>
        <Button size="sm" className="text-secondary" onClick={handlePrev}>
          &gt;&gt;
        </Button>
      </div>
    </div>
  );
}
