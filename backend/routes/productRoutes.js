import express from 'express';
import {
  getAllProducts,
  getProductBySlug,
} from '../controllers/productController.js';

const router = express.Router();

router.get('/', getAllProducts); // /api/products
router.get('/slug/:slug', getProductBySlug); // /api/products/nike-air-max

export default router;
