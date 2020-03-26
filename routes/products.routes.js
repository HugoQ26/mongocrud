const express = require('express');
const router = express.Router();
const {
  getAllProducts,
  getRandomProduct,
  getProductById,
  postProduct,
  putProduct,
  deleteProduct,
} = require('../controllers/products.controller');

router.get('/products', getAllProducts);

router.get('/products/random', getRandomProduct);

router.get('/products/:id', getProductById);

router.post('/products', postProduct);

router.put('/products/:id', putProduct);

router.delete('/products/:id', deleteProduct);

module.exports = router;
