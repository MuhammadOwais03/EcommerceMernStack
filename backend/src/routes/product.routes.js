import express from 'express';
import { createProduct, getProducts, removeProduct } from '../controllers/product.controllers.js';
import { upload } from '../middleware/multer.js';
import adminAuth from '../middleware/adminAuth.middleware.js';

// Define the fields for multer
const field = [
    {
        name: 'images1',
        maxCount: 1
    },
    {
        name: 'images2',
        maxCount: 1
    },
    {
        name: 'images3',
        maxCount: 1
    },
    {
        name: 'images4',
        maxCount: 1
    }
];

const productRouter = express.Router();

// Correct usage: pass the 'field' array directly
productRouter.post('/create',adminAuth, upload.fields(field), createProduct);
productRouter.get('/all-product', getProducts);
productRouter.post('/delete-product',adminAuth, removeProduct);

export { productRouter };
