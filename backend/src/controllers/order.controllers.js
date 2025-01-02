
import Order from "../models/order.models.js";
import Product from "../models/product.models.js";
import User from "../models/user.models.js";



import { asyncHandler } from '../utils/asyncHandler.js';
import { ApiError } from '../utils/ApiError.js';
import { ApiResponse } from '../utils/ApiResponse.js';



const createOrder = asyncHandler(async (req, res) => {
    // const { order } = req.body;
    const { userId, deliveryInfo, paymentMethod, cartSummary } = req.body

    const user = await User.findById(userId);

    if (!user) {
        res.status(404).json({ message: "User not found", "status": 404 });
    }

    let cart = user.cartData;

    const products = Object.entries(cart).flatMap(([productId, sizes]) => {
        return Object.entries(sizes).map(([size, quantity]) => ({
            product: productId,
            size: size, // Optional: Add size information if needed
            quantity: quantity,
        }));
    });

    console.log("cart", cart);
    console.log("products", products);
    const order = new Order({
        user: userId,
        products: products.map(({ product, quantity, size }) => ({ product, quantity, size })),
        paymentMethod: paymentMethod,
        deliveryInfo,
        orderStatus: "Order Placed",
        orderTotal: cartSummary.total,
    });

    await order.save();

    const newlySaveOrder = await Order.findById(order._id).populate("products.product", "name price");
    if (!newlySaveOrder) {
        res.status(404).json({ message: "Order not found", "status": 404 });
    }

    console.log("newlySaveOrder", newlySaveOrder);

    await User.findByIdAndUpdate(userId, { cartData: {} });

    res.status(201).json({ message: "Order created successfully", "status": 201, "order": newlySaveOrder });
    

});


const updateOrder = asyncHandler(async (req, res) => {
        const { orderId, orderStatus } = req.params;
        
        const order = await Order.findById(orderId);

        if (!order) {
            return res.status(404).json({ message: "Order not found", status: 404 });
        }

        order.orderStatus = orderStatus;
        await order.save();

        const updatedOrder = await Order.findById(orderId).populate("products.product", "name price images");
        if (!updatedOrder) {
            return res.status(404).json({ message: "Order not found", status: 404 });
        }

        return res.status(200).json({ message: "Order updated successfully", status: 200, order: updatedOrder });
});



const getOrders = asyncHandler(async (req, res) => {
    try {
        const { userId } = req.params;

        // Validate userId
        if (!userId) {
            return res.status(400).json({ message: "User ID is required", status: 400 });
        }

        // Fetch orders for the user
        const orders = await Order.find({ user: userId })
            .populate("products.product", "name price images")
            .sort({ createdAt: -1 }); // Sort by newest first

        const user = await User.findById(userId);



        if (!orders || orders.length === 0) {
            return res.status(404).json({ message: "No orders found", status: 404 });
        }

        res.status(200).json({
            message: "Orders fetched successfully",
            status: 200,
            orders: orders,
            cart: orders.cartData
        });
    } catch (error) {
        res.status(500).json({
            message: "An error occurred while fetching orders",
            status: 500,
            error: error.message,
        });
    }
});


const getAllOrders = asyncHandler(async (req, res) => {
    // i just wanted to find all orders but without completed status and also the cancelled
    const orders = await Order.find({
        orderStatus: { $nin: ["Completed", "Cancelled"] }
    }).populate("products.product", "name price images sizes").sort({ createdAt: -1 });

    if (!orders || orders.length === 0) {
        return res.status(404).json({ message: "No orders found", status: 404 });
    }

    res.status(200).json({
        message: "Orders fetched successfully",
        status: 200,
        orders: orders,
        
    });
   
});


export { createOrder, updateOrder, getOrders, getAllOrders };