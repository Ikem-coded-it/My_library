const mongoose = require("mongoose");
const path = require("path");

const coverImageBasePath = "uploads/bookCovers";

const bookSchema = mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String
    },
    publishDate: {
        type: Date,
        required: true
    },
    pageCount: {
        type: Number,
        required: true
    },
    createdAt: {
        type: Date,
        required: true,
        default: Date.now
    },
    coverImageName: {
        type: String,
        required: true
    },
    author: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "Author" // referencing the author model i already created
    }
});

bookSchema.virtual("coverImagePath").get(function () {
    if (this.coverImageName != null) {
        return path.join("/", coverImageBasePath, this.coverImageName)
    }
})

const Book = mongoose.model("Book", bookSchema);

module.exports = Book;
module.exports.coverImageBasePath = coverImageBasePath;