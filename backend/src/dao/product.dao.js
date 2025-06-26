import { Product } from "../models/product.model.js";

export const createProductDao = async (data) => {
  const created = await Product.create(data);
  const populated = await Product.findById(created._id)
    .populate("category", "name")
    .lean();
  return {
    ...populated,
    category: populated.category?.name || null,
  };
};

export const getAllProductsDao = async (shopId) => {
  const products = await Product.find({ shopId })
    .populate("category", "name")
    .lean();

  return products.map(product => ({
    ...product,
    category: product.category?.name || null
  }));
};


export const getProductByIdDao = async (id, shopId) => {
  const product = await Product.findOne({ _id: id, shopId })
    .populate("category", "name")
    .lean();

  if (!product) return null;

  return {
    ...product,
    category: product.category?.name || null
  };
};

export const updateProductDao = async (id, data, shopId) => {
  const updated = await Product.findOneAndUpdate(
    { _id: id, shopId },
    data,
    { new: true }
  ).populate("category", "name").lean();

  if (!updated) return null;

  return {
    ...updated,
    category: updated.category?.name || null
  };
};


export const deleteProductDao = async (id, shopId) => {
  return await Product.findOneAndDelete({ _id: id, shopId });
};