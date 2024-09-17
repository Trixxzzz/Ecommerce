import express from "express";
import formidable from "express-formidable";
import { authenticate, authorizeAdmin } from "../Middlewares/authMiddleware.js";
import checkId from "../Middlewares/checkId.js";
import { 
    addProduct,
    updateProductDetails,
    removeProduct,
    fetchProducts,
    fetchProductById,
    fetchAllProducts,
    addProductReview,
    fetchTopProducts,
    fetchNewProducts,
    filterProducts
} from "../Controllers/productController.js";

const router = express.Router();

// Reorder routes to avoid conflicts
router
  .route("/")
  .get(fetchProducts)
  .post(authenticate, authorizeAdmin, formidable(), addProduct);

router.route("/allproducts").get(fetchAllProducts);
router.route("/:id/reviews").post(authenticate, checkId, addProductReview);

router.get("/top", fetchTopProducts);
router.get("/new", fetchNewProducts);

router
  .route("/:id")
  .get(fetchProductById)
  .put(authenticate, authorizeAdmin, formidable(), updateProductDetails)
  .delete(authenticate, authorizeAdmin, removeProduct);

router.route('/filtered-products').post(filterProducts)

export default router;
