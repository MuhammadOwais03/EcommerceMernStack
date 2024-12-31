
import User from "../models/user.models.js";
import { asyncHandler } from "../utils/asyncHandler.js";

const addToCart = asyncHandler(async (req, res) => {
    const { userId, productId, sizeType } = req.body;

    const user = await User.findById(userId);
    if (!user) {
        return res.status(404).json({ message: "User not found", status: 404 });
    }

    let user_cart = user.cartData || {};

    if (!user_cart[productId]) {
        user_cart[productId] = { [sizeType]: 1 };
    } else {
        if (user_cart[productId][sizeType]) {
            user_cart[productId][sizeType] += 1;
        } else {
            user_cart[productId][sizeType] = 1;
        }
    }

    try {
        const modified_user = await User.findByIdAndUpdate(
            userId,
            { $set: { cartData: user_cart } },
            { new: true }
        );

        let cartCount = 0;
        for (let key in modified_user.cartData) {
            cartCount += Object.keys(modified_user.cartData[key]).length;
        }

        console.log("User:", modified_user);

        return res.status(200).json({
            message: "Product added to cart successfully",
            cartData: user_cart,
            user: modified_user,
            cartCount: cartCount,
            status: 200,
        });
    } catch (error) {
        console.error("Error saving user:", error);
        return res.status(500).json({ message: "Error saving user", error: error });
    }
});





const removeCart = asyncHandler(async (req, res) => {
    const { userId, productId, sizeType } = req.body;

    // Find the user
    const user = await User.findById(userId);
    if (!user) {
        return res.status(404).json({ message: "User not found" });
    }

    let user_cart = user.cartData;

    if (user_cart[productId]) {
        if (user_cart[productId][sizeType]) {

            delete user_cart[productId][sizeType];


            if (Object.keys(user_cart[productId]).length === 0) {
                delete user_cart[productId];
            }
        } else {
            return res.status(404).json({ message: "Size type not found", status: 404 });
        }
    } else {
        return res.status(404).json({ message: "Product not found in cart", status: 404 });
    }


    user.cartData = user_cart;
    await user.save();

    return res.status(200).json({ message: "Product removed from cart", cartData: user_cart, status: 200 });
});


const getCart = asyncHandler(async (req, res) => {
    const { userId } = req.body;

    const user = await User.findById(userId);
    if (!user) {
        return res.status(404).json({ message: "User not found", status: 404 });
    }

    return res.status(200).json({ cartData: user.cartData, status: 200 });
})

const updateCart = asyncHandler(async (req, res) => {
    const { userId, productId, sizeType, quantity } = req.body;

    const user = await User.findById(userId);
    if (!user) {
        return res.status(404).json({ message: "User not found", status: 404 });
    }

    let user_cart = user.cartData;

    if (user_cart[productId]) {
        if (user_cart[productId][sizeType]) {
            user_cart[productId][sizeType] += quantity;
        } else {
            user_cart[productId][sizeType] = quantity;
        }
    } else {
        user_cart[productId] = { [sizeType]: quantity };
    }

    const updatedUser = await User.findByIdAndUpdate(
        userId,
        { cartData: user_cart },
        { new: true }
    );

    return res.status(200).json({
        message: "Cart updated successfully",
        cartData: updatedUser.cartData,
        status: 200,
    });
});



export { addToCart, removeCart, getCart, updateCart }