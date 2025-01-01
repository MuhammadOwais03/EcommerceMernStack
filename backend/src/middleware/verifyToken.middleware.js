import jwt from 'jsonwebtoken';
import { generateAccessTokenFromRefreshToken } from '../utils/token.utils.js';
import {asyncHandler} from '../utils/asyncHandler.js';
import { ApiResponse } from '../utils/ApiResponse.js';

const verifyToken = asyncHandler(async (req, res, next) => {
    const token = req.header('Authorization')?.split(' ')[1]; 
    if (!token) return res.status(403).json(new ApiResponse(403, null, 'Access denied'));

    try {
        const payload = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET); 
        req.user = payload; 
        return next(); 
    } catch (err) {
        
       console.log(err, "1")
        return res.status(200).json(new ApiResponse(401, null, 'Invalid token'));
    }
});

export default verifyToken;
