import { localization, pageLevelLocalization } from "@/constants/localization";
import * as yup from "yup";

export const addProductSchema = yup.object().shape({
  name: yup
    .string()
    .required(
      `${localization.productName} ${pageLevelLocalization.productsData.require}`
    ),
  brand: yup
    .string()
    .required(
      `${pageLevelLocalization.productsData.brand} ${pageLevelLocalization.productsData.require}`
    ),
  price: yup
    .number()
    .required(
      `${localization.price} ${pageLevelLocalization.productsData.require}`
    ),
  discount: yup
    .number()
    .required(
      `${pageLevelLocalization.productsData.discount} ${pageLevelLocalization.productsData.require}`
    ),
  quantity: yup
    .number()
    .required(
      `${pageLevelLocalization.productsData.quantity} ${pageLevelLocalization.productsData.require}`
    ),
  description: yup
    .string()
    .required(
      `${pageLevelLocalization.productsData.description} ${pageLevelLocalization.productsData.require}`
    ),
    images: yup
    .mixed<FileList>()
  /*   .required(
      `${pageLevelLocalization.productsData.images} ${pageLevelLocalization.productsData.choose}`
    ) */,
  category: yup
    .string()
    .required(
      `${localization.category} ${pageLevelLocalization.productsData.choose}`
    )
    .label("Category"),
  subcategory: yup
    .string()
    .required(
      `${localization.subcategory} ${pageLevelLocalization.productsData.choose}`
    )
    .label("Subcategory"),
});

export const editProductSchema = yup.object().shape({
  name: yup
    .string()
    .required(
      `${localization.productName} ${pageLevelLocalization.productsData.require}`
    ),
    images: yup
    .mixed<FileList>(),
  description: yup
    .string()
    .required(
      `${pageLevelLocalization.productsData.description} ${pageLevelLocalization.productsData.require}`
    ),
  category: yup
    .string()
    .required(
      `${localization.category} ${pageLevelLocalization.productsData.choose}`
    )
    .label("Category"),
  subcategory: yup
    .string()
    .required(
      `${localization.subcategory} ${pageLevelLocalization.productsData.choose}`
    )
    .label("Subcategory"),
});
