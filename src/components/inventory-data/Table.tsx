import {
  useEditMultiProduct,
  useGetProducts,
} from "@/api/products/products.queries";
/* import Loading from "@/components/shared/Loading"; */
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
import { Loader2 } from "lucide-react";
import { useEffect, useState } from "react";
import { IoIosArrowDown } from "react-icons/io";

export default function TableInventory() {
  const [page, setPage] = useState(1);
  const [sort, setSort] = useState("");
  const { data, refetch } = useGetProducts({
    page: page,
    limit: 5,
    sort: sort,
  });
  const [totalPage, setTotalPage] = useState(data?.total_pages);
  const { mutate, isPending } = useEditMultiProduct();
  const [products, setProducts] = useState<IProduct[]>([]);
  const [editProducts, setEditProducts] = useState<Partial<IProduct>[]>([]);
  const [isEdit, SetIsEdit] = useState<Record<string, boolean | string>>({
    price: false,
    discount: false,
    quantity: false,
  });

  useEffect(() => {
    setProducts(data?.data?.products);
  }, [data]);

  useEffect(() => {
    setTotalPage(data?.total_pages);
    data;
  }, [data, page]);

  const editHandler = (editedProduct: IProduct) => {
    const finded = editProducts.find((item) => item._id === editedProduct._id);

    if (!finded) {
      setEditProducts([
        ...editProducts,
        {
          quantity: editedProduct.quantity,
          price: editedProduct.price,
          discount: editedProduct.discount,
          _id: editedProduct._id,
        },
      ]);
    } else {
      const index = editProducts.indexOf(finded);
      let temp = editProducts;
      (temp[index] = {
        quantity: editedProduct.quantity,
        price: editedProduct.price,
        discount: editedProduct.discount,
        _id: editedProduct._id,
      }),
        setEditProducts(temp);
    }
  };

  const changeHandler = async () => {
    mutate(editProducts);
    setEditProducts([]);
  };

  const handleBlur = (
    e: React.FocusEvent<HTMLInputElement>,
    product: IProduct,
    field: string,
    index: number
  ) => {
    let temp = [...products];
    temp[index] = { ...product, [field]: +e.target.value };
    SetIsEdit((prev) => ({ ...prev, [field]: false }));
    setProducts(temp);
    editHandler(temp[index]);
  };

  const handlePrev = () => {
    setPage((prev) => Math.max(prev - 1, 1));
  };

  const handleNext = () => {
    setPage((prev) => Math.min(prev + 1, totalPage));
  };

  /*   if (isLoading) {
    return <Loading />;
  } */

  return (
    <div>
      <div className="flex justify-end pb-4">
        <Button
          variant={"default"}
          className="text-white"
          onClick={changeHandler}
        >
          {isPending ? (
            <Loader2 className=" h-4 w-4 animate-spin" />
          ) : (
            ` ${pageLevelLocalization.inventory.saveChanges}`
          )}
        </Button>
      </div>
      <div className="rounded-lg border border-tableRow shadow-lg text-primary-foreground">
        <Table className="bg-white text-md rounded-lg ">
          <TableHeader className="rounded-t-lg ">
            <TableRow className="hover:bg-white ">
              <TableHead className="text-right text-primary font-bold  w-1/4 rounded-tr-lg">
                {localization.productName}{" "}
              </TableHead>
              <TableHead className="  text-right text-primary font-bold w-1/4">
                <span className="flex items-center gap-3">
                  {" "}
                  {localization.price}{" "}
                  <IoIosArrowDown onClick={() => setSort("price")} />
                </span>
              </TableHead>
              <TableHead className=" flex justify-center gap-2 items-center text-right text-primary font-bold w-1/4 rounded-tl-lg">
                <span className="flex items-center gap-3">
                  {" "}
                  {pageLevelLocalization.inventory.inventory}{" "}
                  <IoIosArrowDown onClick={() => setSort("quantity")} />
                </span>
              </TableHead>
              <TableHead className="text-right text-primary font-bold w-1/4 rounded-tl-lg">
                {pageLevelLocalization.inventory.discount}
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {products?.map((product: IProduct, index: number) => {
              const isEvenRow = index % 2 === 0;
              return (
                <TableRow
                  key={index}
                  className={`${
                    isEvenRow
                      ? "bg-tableRow hover:bg-tableRow"
                      : "bg-white hover:bg-white"
                  }`}
                >
                  <TableCell>{product.name}</TableCell>
                  <TableCell
                    onClick={() =>
                      SetIsEdit((prev) => ({ ...prev, price: product._id }))
                    }
                  >
                    {isEdit.price === product?._id ? (
                      <input
                        className="rounded-md pr-2"
                        defaultValue={product.price}
                        onBlur={(e) => handleBlur(e, product, "price", index)}
                      />
                    ) : (
                      <span className="pr-2">{product.price}</span>
                    )}
                  </TableCell>
                  <TableCell
                    className="text-right"
                    onClick={() =>
                      SetIsEdit((prev) => ({ ...prev, quantity: product._id }))
                    }
                  >
                    {isEdit.quantity === product._id ? (
                      <input
                        className="rounded-md pr-2"
                        defaultValue={product.quantity}
                        onBlur={(e) =>
                          handleBlur(e, product, "quantity", index)
                        }
                      />
                    ) : (
                      <span className="pr-2">{product.quantity}</span>
                    )}
                  </TableCell>
                  <TableCell
                    onClick={() =>
                      SetIsEdit((prev) => ({ ...prev, discount: product._id }))
                    }
                  >
                    {isEdit.discount === product?._id ? (
                      <input
                        className="rounded-md pr-2"
                        defaultValue={product.discount}
                        onBlur={(e) =>
                          handleBlur(e, product, "discount", index)
                        }
                      />
                    ) : (
                      <span className="pr-2">{product.discount}</span>
                    )}
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
          <TableFooter className="h-2"></TableFooter>
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
