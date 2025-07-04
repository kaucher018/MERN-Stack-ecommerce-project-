import express from 'express';
import {
  showProducts,
  bestProducts,
  getCategories,
  getBrands,
  getProduct,
} from '../Controller/displayController.js';

const router = express.Router();

router.get('/showproducts', showProducts);
router.get('/bestproducts', bestProducts);
router.get('/getproduct', getProduct);
router.get('/getcategories', getCategories);
router.get('/getbrands', getBrands);

export default router;
