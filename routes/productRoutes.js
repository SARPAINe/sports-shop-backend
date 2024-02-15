const express = require("express");
const router = express.Router();
const {
    authenticateUser,
    authrizePermissions,
} = require("../middleware/authentication");

const {
    createProduct,
    getAllProducts,
    getSingleProduct,
    updateProduct,
    deleteProduct,
    uploadImage,
} = require("../controllers/productController");

const { getSingleProductReviews } = require("../controllers/reviewControllers");

router
    .route("/")
    .post([authenticateUser, authrizePermissions("admin")], createProduct)
    .get(getAllProducts);

router
    .route("/uploadImage")
    .post([authenticateUser, authrizePermissions("admin")], uploadImage);

router
    .route("/:id")
    .get(getSingleProduct)
    .patch([authenticateUser, authrizePermissions("admin")], updateProduct)
    .delete([authenticateUser, authrizePermissions("admin")], deleteProduct);

router.route("/:id/reviews").get(getSingleProductReviews);

module.exports = router;
