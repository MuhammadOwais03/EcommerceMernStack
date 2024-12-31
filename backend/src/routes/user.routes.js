import express from 'express';
import { userRegistration, login, adminLogin, userDetails } from '../controllers/user.controllers.js';
import verifyToken from '../middleware/verifyToken.middleware.js';
// import { helloworld } from '../controllers/test.controllers.js';

const userRouter = express.Router();
console.log(userRegistration)
userRouter.post('/register', userRegistration);
userRouter.post('/login', login);
userRouter.post('/admin-login', adminLogin);
userRouter.get('/user-details/:userId', userDetails);
// userRouter.get('/user-details',verifyToken, userDetails);

export { userRouter };
