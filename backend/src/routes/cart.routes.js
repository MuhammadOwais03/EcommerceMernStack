
import express from 'express';

import { addToCart, removeCart, getCart, updateCart } from "../controllers/cart.controllers.js";
import verifyToken from '../middleware/verifyToken.middleware.js';

const cartRouter = express.Router();


cartRouter.post('/add-to-cart', verifyToken, addToCart);
cartRouter.post('/remove-cart', verifyToken, removeCart);
cartRouter.post('/get-cart', verifyToken, getCart);
cartRouter.post('/update-cart', verifyToken, updateCart);

export { cartRouter };

