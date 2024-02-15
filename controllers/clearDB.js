const User = require("../models/User");
const Product = require("../models/Product");
const Review = require("../models/Review");
const Order = require("../models/Order");
const StatusCodes = require("http-status-codes");
const clearDB = async (req, res) => {
    await User.deleteMany({});
    await Product.deleteMany({});
    await Review.deleteMany({});
    await Order.deleteMany({});
    res.status(StatusCodes.OK).json({ msg: "Database cleared!!" });
};

module.exports = { clearDB };
