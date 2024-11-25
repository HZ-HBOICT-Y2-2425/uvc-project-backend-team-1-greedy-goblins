import express from 'express';
import { responseExample, updateCategory, getCategoryById, responseTest } from '../controllers/categoryController.js';
import { checkName } from '../middleware/exampleMiddleware.js';
const router = express.Router();

// routes
router.get('/', (req, res, next) => {
  res.json('hi');
});
router.get('/category', checkName, responseExample);
router.post('/updateCategory', checkName, updateCategory);
router.get('/category/:id', checkName, getCategoryById);
router.get('/MarketCategory/:marketId', checkName, responseTest);

export default router;
