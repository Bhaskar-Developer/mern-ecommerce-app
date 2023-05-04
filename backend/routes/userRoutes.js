import express from 'express'
const router = express.Router()
import { authUser, getUserProfile, registerUser } from '../controller/userController.js'
import { protect } from '../middlewares/authMiddleware.js'

router.route('/').post(registerUser)
router.post('/login', authUser)
router.route('/profile').get(protect, getUserProfile)

export default router