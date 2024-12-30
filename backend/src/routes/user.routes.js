import express from 'express';
import { userRegistration, login, adminLogin } from '../controllers/user.controllers.js';
// import { helloworld } from '../controllers/test.controllers.js';

const userRouter = express.Router();
console.log(userRegistration)
userRouter.post('/register', userRegistration);
userRouter.post('/login', login);
userRouter.post('/admin-login', adminLogin);

export { userRouter };
