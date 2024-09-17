import express from 'express';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import path from 'path';
import connectDB from "./Config/Db.js";
import userRoutes from './Routes/userRoutes.js';
import categoryRoutes from "./Routes/categoryRoutes.js"
import productRoutes from "./Routes/productRoutes.js"
import uploadRoutes from "./Routes/uploadRoutes.js"
import orderRoutes from "./Routes/orderRoutes.js"

dotenv.config();
const port = process.env.PORT || 5000;

const app = express();
connectDB();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use('/api/users', userRoutes);
app.use('/api/category', categoryRoutes);
app.use('/api/products', productRoutes);
app.use('/api/upload', uploadRoutes);
app.use('/api/orders',orderRoutes)

app.get("/api/config/paypal", (req, res) => {
    res.send({ clientId: process.env.PAYPAL_CLIENT_ID });
  });

const __dirname = path.resolve();
app.use('/uploads', express.static(path.join(__dirname, '/uploads')));
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
