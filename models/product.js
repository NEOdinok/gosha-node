import mongoose from "mongoose";

const Schema = mongoose.Schema;

const productSchema = new Schema(
  {
    name: { required: true, type: String },
    price: { required: true, type: Number },
    description: { required: true, type: String },
    category: {
      type: String,
      required: true,
      enum: ["hoodies", "shoes", "shirts"],
    },
  },
  { timestamps: true }
);

const Product = mongoose.model("Product", productSchema);

export default Product;
