require("dotenv").config();
require("express-async-errors");

//express
const express = require("express");
const app = express();

//rest of the packages
const morgan = require("morgan");
const cookieParser = require("cookie-parser");
const fileUpload = require("express-fileupload");
const rateLimiter = require("express-rate-limit");
const helmet = require("helmet");
const xss = require("xss-clean");
const cors = require("cors");
const mongoSanitize = require("express-mongo-sanitize");

const cloudinary = require("cloudinary").v2;

cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.CLOUD_API_KEY,
    api_secret: process.env.CLOUD_API_SECRET,
    secure: true,
});

//database
const connectDB = require("./db/connect");

//routers
const authRouter = require("./routes/authRoutes");
const cleanRouter = require("./routes/clearDBRoutes");
const userRouter = require("./routes/userRoutes");
const productRouter = require("./routes/productRoutes");
const reviewRouter = require("./routes/reviewRoutes");
const orderRouter = require("./routes/orderRoutes");
const checkoutRouter = require("./routes/checkoutRoutes");

//middleware
const notFoundMiddleware = require("./middleware/not-found");
const errorHandlerMiddleware = require("./middleware/error-handler");

app.set("trust proxy", 1);
app.use(
    rateLimiter({
        windowMs: 15 * 60 * 1000,
        max: 1600,
    })
);
app.use(helmet());
// app.use(
//     cors({
//         origin: "http://localhost:5173",
//         credentials: "true",
//     })
// );
app.use(function (req, res, next) {
    // const allowedOrigins = ["http://localhost:5173", "http://192.168.0.106:5173"];
    // const origin = req.headers.origin;

    // if (allowedOrigins.includes(origin)) {
    //     res.setHeader("Access-Control-Allow-Origin", origin);
    // }

    const origin = process.env.CLIENT_URL;

    res.setHeader("Access-Control-Allow-Origin", origin);
    res.setHeader(
        "Access-Control-Allow-Methods",
        "GET, POST, PUT, PATCH, DELETE"
    );
    res.setHeader(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-with, Content-Type, Accept, Authorization"
    );
    res.setHeader("Access-Control-Allow-Credentials", true);
    next();
});
app.use(xss());
app.use(mongoSanitize());

app.use(morgan("tiny"));
app.use(express.json());
app.use(cookieParser(process.env.JWT_SECRET));
app.use(express.static("./public"));
app.use(fileUpload({ useTempFiles: true }));

app.get("/", (req, res) => {
    res.send(`Welcome to e-commerce api`);
});

app.get("/api/v1", (req, res) => {
    // console.log(req.cookies);
    console.log(req.signedCookies);
    res.send(`Welcome to e-commerce api`);
});

app.use("/api/v1/auth", authRouter);
app.use("/api/v1/clean", cleanRouter);
app.use("/api/v1/users", userRouter);
app.use("/api/v1/products", productRouter);
app.use("/api/v1/reviews", reviewRouter);
app.use("/api/v1/orders", orderRouter);
app.use("/api/v1/checkout", checkoutRouter);
app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);

const port = process.env.PORT || 3000;

const start = async () => {
    try {
        await connectDB(process.env.MONGO_URL);
        app.listen(port, () => {
            console.log(`Server is listening on port ${port}...`);
        });
    } catch (err) {
        console.log(err);
    }
};

start();
