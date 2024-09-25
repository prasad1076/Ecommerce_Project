const express = require('express');
const { getAllProducts,createProduct,updateProduct,deleteProduct,getProductDetails} = require('../controllers/productController');
const { isAuthenticatedUSer } = require('../middleware/auth');

const router = express.Router();

router.route("/products").get(isAuthenticatedUSer,getAllProducts);
router.route("/products/new").post(createProduct);
router.route("/products/:id").get(getProductDetails).put(updateProduct).delete(deleteProduct)




module.exports = router;