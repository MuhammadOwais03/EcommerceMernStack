import express from 'express';
import { createProduct, getProducts } from '../controllers/product.controllers.js';
import { upload } from '../middleware/multer.js';

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
productRouter.post('/create', upload.fields(field), createProduct);
productRouter.get('/all-product', getProducts);

export { productRouter };
