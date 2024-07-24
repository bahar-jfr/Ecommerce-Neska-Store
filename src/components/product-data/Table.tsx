import { useGetProducts } from "@/api/products/products.queries";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { localization, pageLevelLocalization } from "@/constants/localization";
import Image from "next/image";

export default function TableProduct() {
  const { data } = useGetProducts();

  return (
    <div className="flex flex-col gap-4 ">
      <div className="flex justify-end pb-4">
        <Button
          variant={"outline"}
          className="border-2 border-primary hover:bg-primary hover:text-secondary"
        >
          {pageLevelLocalization.productsData.addProduct}
        </Button>
      </div>
      <div className="rounded-lg border shadow-lg">
        <Table className="bg-white text-md rounded-lg">
          <TableHeader className="bg-primary  rounded-t-lg  ">
            <TableRow className="hover:bg-primary">
              <TableHead className="text-right w-1/4 text-white rounded-tr-lg">
                {pageLevelLocalization.productsData.productPhoto}
              </TableHead>
              <TableHead className="text-right w-1/4 text-white">
                {localization.productName}
              </TableHead>
              <TableHead className="text-right w-1/4 text-white">
                {localization.category}
              </TableHead>
              <TableHead className="text-right w-1/4 text-white rounded-tl-lg">
                {pageLevelLocalization.productsData.actions}
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {data?.data.products.map((product: any) => {
              return (
                <TableRow key={product._id}>
                  <TableCell className="font-medium">
                    <Image
                      src={`http://localhost:8000/${product?.images[0].replace(
                        "localhost:8000",
                        ""
                      )}`}
                      alt={product.name}
                      width={50}
                      height={50}
                    />
                  </TableCell>
                  <TableCell>{product.name}</TableCell>
                  <TableCell>
                    {product.category.name}/{product.subcategory.name}
                  </TableCell>
                  <TableCell className="text-right">{product.price}</TableCell>
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
