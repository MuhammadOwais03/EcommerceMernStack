import express from "express"
import cors from "cors"


const app = express()

app.use(cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true
}))
app.use(express.json({limit: "16kb"}))
app.use(express.urlencoded({
    extended: true,
    limit: "16kb"
}))
app.use(express.static("public"))


//Routes

import { userRouter } from "./routes/user.routes.js"
import { productRouter } from "./routes/product.routes.js"
import { cartRouter } from "./routes/cart.routes.js"

app.use('/api/users', userRouter)
app.use('/api/products', productRouter)
app.use('/api/cart', cartRouter)

export { app }