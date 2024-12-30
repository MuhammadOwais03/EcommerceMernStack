import jwt from 'jsonwebtoken';
import { asyncHandler } from '../utils/asyncHandler.js';
import { ApiError } from '../utils/ApiError.js';
import { ApiResponse } from '../utils/ApiResponse.js';
import { generateToken, generateAccessTokenFromRefreshToken } from '../utils/token.utils.js';
import Product from '../models/product.models.js';
import { v2 as cloudinary } from 'cloudinary';
import fs from 'fs';

const createProduct = asyncHandler(async (req, res) => {
    const { name, price, description, category, subCategory, sizes, bestSellers } = req.body;

    console.log(req.files); // Debugging: log uploaded files

    // Get images from request files
    const image1 = req.files.images1 && req.files.images1[0];
    const image2 = req.files.images2 && req.files.images2[0];
    const image3 = req.files.images3 && req.files.images3[0];
    const image4 = req.files.images4 && req.files.images4[0];

    const images = [image1, image2, image3, image4].filter((image) => image !== undefined);

    try {
        // Upload images to Cloudinary
        const imageUrl = await Promise.all(
            images.map(async (image) => {
                let result = await cloudinary.uploader.upload(image.path, { resource_type: "image" });

                // Clean up the local image after uploading

                try {
                    fs.unlinkSync(image.path);

                }
                catch (error) {
                    console.log(error);
                }

                return result.secure_url; // Returning the secure URL of the uploaded image
            })
        );

        console.log(image1, image2, image3, image4);
        console.log(name, price, description, category, subCategory, sizes, bestSellers);
        console.log(imageUrl); // Log the Cloudinary image URLs

        // Create a new product in the database
        const product = new Product({
            name: name,
            price: price,
            description: description,
            category: category,
            subCategory: subCategory,
            sizes: sizes,
            bestSellers: bestSellers,
            images: imageUrl // Store Cloudinary URLs in the product document
        });

        await product.save(); // Save product to the database

        // Send response with product details
        res.status(201).json({
            success: true,
            message: 'Product created successfully!',
            product
        });
    } catch (error) {
        console.error(error); // Log the error
        res.status(500).json({
            success: false,
            message: 'Failed to upload images or create product.',
            error: error.message
        });
    }
});


const getProducts = asyncHandler(async (req, res) => {
    const products = await Product.find({});
    res.status(200).json({
        success: true,
        products
    })
})


const singleProduct = asyncHandler(async (req, res) => {

    const product = await Product.findById(req.body.id);

    if (!product) {
        return res.status(404).json({
            success: false,
            message: 'Product not found.'
        });
    }

    res.status(200).json({
        success: true,
        product
    });


});


const removeProduct = asyncHandler(async (req, res) => {
    const product = await Product.findById(req.body.id);

    if (!product) {
        return res.status(404).json({
            success: false,
            message: 'Product not found.'
        });
    }

    await product.deleteOne();

    res.status(200).json({
        success: true,
        message: 'Product removed successfully.'
    });
});



export { createProduct, getProducts, singleProduct, removeProduct };

