import { api } from "@/api/api.config";
import { useGetProducts } from "@/api/products/products.queries";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { localization, pageLevelLocalization } from "@/constants/localization";
import { IProduct } from "@/types";
import { useState } from "react";

export default function TableInventory() {
  const { data } = useGetProducts();

  const [products, setProducts] = useState<IProduct[]>(data?.data?.products);
  const [editProducts, setEditProducts] = useState<IProduct[]>([]);
  const [isEdit, SetIsEdit] = useState<Record<string, boolean | number>>({
    price: false,
    quantity: false,
  });
  const [error, setError] = useState<string | null>(null);

  const editHandler = (editedProduct: IProduct) => {
    const finded = editProducts.find((item) => item._id === editedProduct._id);

    if (!finded) {
      setEditProducts([...editProducts, editedProduct]);
    } else {
      const index = editProducts.indexOf(finded);
      let temp = editProducts;
      temp[index] = editedProduct;
      setEditProducts(temp);
    }
  };

  const formatNumberToFarsi = (number: number) => {
    return new Intl.NumberFormat("fa-IR", { useGrouping: true }).format(number);
  };

  const changeHandler = async () => {
    try {
      await Promise.all(
        editProducts.map(async (product) => {
          await api.patch(`/products/${product._id}`, {
            price: product.price,
            quantity: product.quantity,
          });
        })
      );
      setEditProducts([]);
      setError(null);
    } catch (error) {
      setError(`${pageLevelLocalization.inventory.error}`);
    }
  };

  return (
    <div>
      {error && <div className="error-message">{error}</div>}
      <div className="flex justify-end pb-4">
        <Button
          variant={"default"}
          className="text-white"
          onSubmit={changeHandler}
        >
          {pageLevelLocalization.inventory.saveChanges}
        </Button>
      </div>
      <div className="rounded-lg border border-tableRow shadow-lg text-primary-foreground">
        <Table className="bg-white text-md rounded-lg ">
          <TableHeader className="rounded-t-lg ">
            <TableRow className="hover:bg-white">
              <TableHead className="text-right text-primary font-bold  w-1/4 rounded-tr-lg">
                {localization.productName}{" "}
              </TableHead>
              <TableHead className="text-right text-primary font-bold w-1/4">
                {localization.price}
              </TableHead>
              <TableHead className="text-right text-primary font-bold w-1/4 rounded-tl-lg">
                {pageLevelLocalization.inventory.inventory}
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {data?.data.products.map((product: IProduct, index: number) => {
              const isEvenRow = index % 2 === 0;
              return (
                <TableRow
                  key={product._id}
                  className={`${
                    isEvenRow
                      ? "bg-tableRow hover:bg-tableRow"
                      : "bg-white hover:bg-white"
                  }`}
                >
                  <TableCell>{product.name}</TableCell>
                  <TableCell
                    onClick={() =>
                      SetIsEdit((prev) => ({ ...prev, price: true }))
                    }
                  >
                    {isEdit.price ? (
                      <input
                        defaultValue={product.price}
                        onBlur={(e) => {
                          let temp = [...products];
                          temp[index] = { ...product, price: +e.target.value };
                          SetIsEdit((prev) => ({ ...prev, price: false }));
                          setProducts(temp);
                          editHandler(temp[index]);
                        }}
                      />
                    ) : (
                      <span>{formatNumberToFarsi(product.price)}</span>
                    )}
                  </TableCell>
                  <TableCell
                    className="text-right"
                    onClick={() =>
                      SetIsEdit((prev) => ({ ...prev, quantity: true }))
                    }
                  >
                    {isEdit.quantity ? (
                      <input
                        defaultValue={product.quantity}
                        onBlur={(e) => {
                          let temp = [...products];
                          temp[index] = {
                            ...product,
                            quantity: +e.target.value,
                          };
                          SetIsEdit((prev) => ({ ...prev, quantity: false }));
                          setProducts(temp);
                          editHandler(temp[index]);
                        }}
                      />
                    ) : (
                      <span>{product.quantity}</span>
                    )}
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
          <TableFooter className="h-2"></TableFooter>
        </Table>
      </div>
    </div>
  );
}
