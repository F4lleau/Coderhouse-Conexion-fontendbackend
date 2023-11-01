import { Router } from "express";

import cartRouter from "./cart.routes.js";
import messageRouter from "./message.routes.js";
import productRouter from "./product.routes.js";
import sessionRouter from "./session.routes.js";
import userRouter from "./user.routes.js";

const router= Router ()

router.use('/api/users', userRouter)
router.use('/api/products', productRouter)
router.use('/api/carts', cartRouter)
router.use('/api/messages', messageRouter)
router.use('/api/sessions', sessionRouter)


export default router 