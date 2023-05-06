import express from 'express'
const router = express.Router()
import { addOrderItems } from '../controller/orderController.js'
import { protect } from '../middlewares/authMiddleware.js'

router.route('/').post(protect, addOrderItems)

export default router