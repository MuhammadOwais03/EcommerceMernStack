
import mongoose from "mongoose";


const orderSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    products: [
        {
            product: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Product',
                required: true,
            },
            quantity: {
                type: Number,
                required: true,
            },

            size: {
                type: String,
                required: true,
            }
        },
    ],
    paymentMethod: {
        type: String,
        required: true,
    },

    deliveryInfo: {
        firstName: {
            type: String,
            required: true,
        },
        lastName: {
            type: String,
            required: true,
        },
        email: {
            type: String,
            required: true,
        },
        phone: {
            type: String,
            required: true,
        },
        street: {
            type: String,
            required: true,
        },
        city: {
            type: String,
            required: true,
        },
        zipcode: {
            type: String,
            required: true,
        },
        country: {
            type: String,
            required: true,
        },

    },
    orderStatus: {
        type: String,
        default: 'Not Processed',
        enum: [
            'Order Placed',
            'Processing',
            'Dispatched',
            'Cancelled',
            'Completed',
        ],
    },
    orderTotal: {
        type: Number,
        required: true,
    },
}, { timestamps: true });

const Order = mongoose.model('Order', orderSchema);

export default Order;
