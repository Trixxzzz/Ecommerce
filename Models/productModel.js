import mongoose from "mongoose";
const { ObjectId } = mongoose.Schema.Types;  // Correct import of ObjectId

const reviewSchema = mongoose.Schema(
  {
    name: { type: String, required: true },
    rating: { type: Number, required: true },
    comment: { type: String, required: true },
    user: { type: ObjectId, required: true, ref: "User" },
  },
  { timestamps: true }  // Corrected 'timestamps' key
);

const productSchema = mongoose.Schema(
  {
    name: { type: String, required: true },
    image: { type: String, required: true },
    brand: { type: String, required: true },
    quantity: { type: Number, required: true },
    category: { type: ObjectId, ref: "Category", required: true },
    description: { type: String, required: true },
    reviews: [reviewSchema],
    rating: { type: Number, default: 0 },  // Default values do not require 'required' key
    numReviews: { type: Number, default: 0 },
    price: { type: Number, default: 0 },
    countInStock: { type: Number, default: 0 },
  },
  { timestamps: true }  // Corrected 'timestamps' key
);

const Product = mongoose.model("Product", productSchema);
export default Product;
