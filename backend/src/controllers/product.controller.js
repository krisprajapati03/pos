import wrapAsync from "../utils/tryCatchWapper.js";
import {
  createProductService,
  getAllProductsService,
  getProductByIdService,
  updateProductService,
  deleteProductService
} from "../services/product.service.js";


export const createProduct = wrapAsync(async (req, res) => {
  const product = await createProductService(req.body, req.user.shopId);
  res.status(201).json({ message: "Product created", product });
});

export const getAllProducts = wrapAsync(async (req, res) => {
  const products = await getAllProductsService(req.user.shopId);
  res.status(200).json({ message: "Success", products });
});

export const getProductById = wrapAsync(async (req, res) => {
  const product = await getProductByIdService(req.params.id, req.user.shopId);
  res.status(200).json({ product });
});

export const updateProduct = wrapAsync(async (req, res) => {
  const updated = await updateProductService(req.params.id, req.body, req.user.shopId);
  res.status(200).json({ message: "Product updated", product: updated });
});

export const deleteProduct = wrapAsync(async (req, res) => {
  await deleteProductService(req.params.id, req.user.shopId);
  res.status(200).json({ message: "Product deleted" });
});


// import wrapAsync from "../utils/tryCatchWapper.js";
// import {
//   createProductService,
//   getAllProductsService,
//   getProductByIdService,
//   updateProductService,
//   deleteProductService
// } from "../services/product.service.js";

// // 👇 Replace with a real ObjectId from your users collection
// const FAKE_SHOP_ID = "665f7c8d2a1d5b3d2c123abc";

// // ✅ CREATE product
// export const createProduct = wrapAsync(async (req, res) => {
//   const product = await createProductService(req.body, FAKE_SHOP_ID);
//   res.status(201).json({ message: "Product created", product });
// });

// // ✅ GET ALL products
// export const getAllProducts = wrapAsync(async (req, res) => {
//   const products = await getAllProductsService(FAKE_SHOP_ID);
//   res.status(200).json({ message: "Success", products });
// });

// // ✅ GET product by ID
// export const getProductById = wrapAsync(async (req, res) => {
//   const product = await getProductByIdService(req.params.id, FAKE_SHOP_ID);
//   res.status(200).json({ product });
// });

// // ✅ UPDATE product
// export const updateProduct = wrapAsync(async (req, res) => {
//   const updated = await updateProductService(req.params.id, req.body, FAKE_SHOP_ID);
//   res.status(200).json({ message: "Product updated", product: updated });
// });

// // ✅ DELETE product
// export const deleteProduct = wrapAsync(async (req, res) => {
//   await deleteProductService(req.params.id, FAKE_SHOP_ID);
//   res.status(200).json({ message: "Product deleted" });
// });
