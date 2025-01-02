
import express from 'express';
import { createOrder, updateOrder, getOrders, getAllOrders } from '../controllers/order.controllers.js';
import { upload } from '../middleware/multer.js';
import adminAuth from '../middleware/adminAuth.middleware.js';
import verifyToken from '../middleware/verifyToken.middleware.js';


const orderRouter = express.Router();

orderRouter.post('/create-order', verifyToken, createOrder);
orderRouter.put('/update-order/:orderId/:orderStatus', verifyToken, adminAuth, updateOrder);
orderRouter.get('/get-orders/:userId', verifyToken, getOrders);
orderRouter.get('/get-all-orders', getAllOrders);

export { orderRouter };