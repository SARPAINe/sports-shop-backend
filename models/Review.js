const mongoose = require("mongoose");
const ReviewSchema = new mongoose.Schema(
    {
        rating: {
            required: [true, "Please provide rating"],
            type: Number,
            min: 1,
            max: 5,
        },
        title: {
            required: [true, "Please provide review title"],
            type: String,
            trim: true,
            maxlength: 100,
        },
        comment: {
            required: [true, "Please provide review text"],
            type: String,
        },
        user: {
            type: mongoose.Types.ObjectId,
            required: true,
            ref: "User",
        },
        product: {
            type: mongoose.Types.ObjectId,
            ref: "Product",
            required: true,
        },
    },
    { timestamps: true }
);

//a user can leave only one review/comment for a single product
ReviewSchema.index({ product: 1, user: 1 }, { unique: true });

ReviewSchema.statics.calculateAverageRating = async function (productId) {
    const result = await this.aggregate([
        { $match: { product: productId } },
        {
            $group: {
                _id: null,
                averageRating: { $avg: "$rating" },
                numOfReviews: { $sum: 1 },
            },
        },
    ]);

    try {
        await this.model("Product").findOneAndUpdate(
            { _id: productId },
            {
                averageRating: Math.ceil(result[0]?.averageRating || 0),
                numOfReviews: result[0]?.numOfReviews || 0,
            }
        );
    } catch (error) {
        console.log(error);
    }
};

ReviewSchema.post("save", async function () {
    await this.constructor.calculateAverageRating(this.product);
});

ReviewSchema.post("remove", async function () {
    await this.constructor.calculateAverageRating(this.product);
});

module.exports = mongoose.model("Review", ReviewSchema);
