
import { asyncHandler } from '../utils/asyncHandler.js';
import { ApiError } from '../utils/ApiError.js';
import { ApiResponse } from '../utils/ApiResponse.js';
import { generateToken, generateAccessTokenFromRefreshToken } from '../utils/token.utils.js';
import User from '../models/user.models.js';
import jwt from 'jsonwebtoken';

const userRegistration = asyncHandler(async (req, res) => {
    const { email, name, password, password2 } = req.body;

    if ([email, name, password, password2].some((field) => field?.trim() === "")) {
        throw new ApiError(400, "All fields are required");
    }

    const userExists = await User.findOne({
        $or: [{ email: email }]
    });

    if (userExists) {
        throw new ApiError(400, "A user with this email already exists");
    }

    if (password !== password2) {
        throw new ApiError(400, "Passwords do not match");
    }

    const user = await User.create({
        email: email,
        name: name.toLowerCase(),
        password: password,
        userRole: "customer",
    });

    const createdUser = await User.findById(user._id).select("-password -refreshToken");

    if (!createdUser) {
        throw new ApiError(500, "An error occurred while creating the user");
    }

    return res.status(201).json(
        new ApiResponse(201, createdUser, "User created successfully")
    );
});

const login = asyncHandler(async (req, res) => {
    const { email, password, userRole } = req.body;

    if ([email, password, userRole].some((field) => field?.trim() === "")) {
        throw new ApiError(400, "All fields are required");
    }

    const userCheck = await User.findOne({ email: email });

    if (!userCheck) {
        throw new ApiError(400, "No user found with this email");
    }

    const passCheck = await userCheck.comparePassword(password);

    if (!passCheck) {
        throw new ApiError(401, "Invalid User Credentials");
    }

    const { accessToken, refreshToken } = await generateToken(userCheck._id, userCheck.email);
    if (!accessToken || !refreshToken) {
        throw new ApiError(500, "An error occurred while authenticating the user");
    }
    userCheck.refreshToken = refreshToken;
    await userCheck.save();

    const options = {
        httpOnly: true,
        secure: false,
    };

    const createdUser = await User.findById(userCheck._id).select("-password -refreshToken");

    return res
        .status(200)
        .cookie("accessToken", accessToken, options)
        .cookie("refreshToken", refreshToken, options)
        .json(
            new ApiResponse(
                200,
                { user: createdUser, accessToken: accessToken },
                "User Logged In Successfully"
            )
        );
});



const adminLogin = asyncHandler(async (req, res) => {

    const { email, password } = req.body;

    if ([email, password].some((field) => field?.trim() === "")) {
        throw new ApiError(400, "All fields are required");
    }

    console.log(email, password);
    if (email !== process.env.ADMIN_EMAIL && password !== process.env.ADMIN_PASSWORD) {
        throw new ApiError(401, "Invalid User Credentials");
    }

    const token = jwt.sign(
        process.env.ADMIN_EMAIL + process.env.ADMIN_PASSWORD,
        process.env.ACCESS_TOKEN_SECRET,
    );

    

    const options = {
        httpOnly: false,
        secure: false,
    };

    return res
        .status(200)
        .cookie("token", token, options)
        .json(
            new ApiResponse(
                200,
                { token: token },
                "Admin Logged In Successfully"
            )
        );


});


export { userRegistration, login, adminLogin };