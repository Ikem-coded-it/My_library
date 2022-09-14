const express = require("express");
const router = express.Router();
const Author = require("../models/author");
//const multer = require("multer"); //module for uploading files to database(used for cover image files)
const Book = require("../models/book");
// const path = require("path");
// const fs = require("fs");
//const uploadPath = path.join('public', Book.coverImageBasePath)
const imageMimeTypes = ["image/jpeg", "image/png", "image/gif"]
// const upload = multer({ // configuration for multer module
//     dest: uploadPath,
//     fileFilter: (req, file, callback) => {
//         callback(null, imageMimeTypes.includes(file.mimetype))
//     }
// });


// All books route
router.get("/", async(req, res) => {
    let query = Book.find()

    if (req.query.title != null && req.query.title != '') {
        query = query.regex("title", new RegExp(req.query.title, 'i')) // RegExp means regular expression, used for searching
    };

    if (req.query.publishedBefore != null && req.query.publishedBefore != '') {
        query = query.lte("publishDate", req.query.publishedBefore) // 'lte' stands for 'less than or equal to'
    };

    if (req.query.publishedAfter != null && req.query.publishedAfter != '') {
        query = query.gte("publishDate", req.query.publishedAfter) // 'gte' stands for greater than or equal to'
    };

    try {
        const books = await query.exec()

        res.render("books/index", {
            books: books,
            searchOptions: req.query
        })
    } catch (error) {
        res.redirect("/")
    }
})


// new books route
router.get("/new", async (req, res) => {
    renderNewPage(res, new Book())
})


// Create Book Route
router.post("/", async (req, res) => {
     
    const book = await new Book({
        title: req.body.title,
        author: req.body.author,
        publishDate: new Date(req.body.publishDate),
        pageCount: req.body.pageCount,
        description: req.body.description
    })

    saveCover(book, req.body.cover);

    try {
        const newBook = await book.save()
        //res.redirect(`books/${newBook.id}`)
        res.redirect('books')
    } catch (error) {
        renderNewPage(res, book, true)
    }
})

 
async function renderNewPage(res, book, hasError = false) {
    try {
        const authors = await Author.find({});
        const params = {
            authors: authors,
            book: book
        }
        if (hasError) params.errorMessage = "Error Creating Book."
        res.render("books/new", params)
    } catch (error) {
        res.redirect("/books")
    }
}


function saveCover(book, coverEncoded) {
    if (coverEncoded == null) return
    const cover = JSON.parse(coverEncoded)
    if (cover != null && imageMimeTypes.includes(cover.type)) {
        book.coverImage = new Buffer.from(cover.data, "base64")
        book.coverImageType = cover.type
    }
}


module.exports = router