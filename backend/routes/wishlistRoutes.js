// routes/wishlistRoutes.js
import express from 'express'
import {
  addToWishlist,
  removeFromWishlist,
  getWishlist,
} from '../controllers/wishlistController.js'
import { protect } from '../middleware/authMiddleware.js'

const router = express.Router()

router.get('/', protect, getWishlist)
router.post('/:productId', protect, addToWishlist)
router.delete('/:productId', protect, removeFromWishlist)

export default router
