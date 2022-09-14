const express = require("express");
const app = express();
const expressLayouts = require("express-ejs-layouts");
const bodyParser = require("body-parser");
const methodOverride = require("method-override") // A package that allows PUT or DELETE where the client doesn't support it.

const indexRouter = require("./routes/index");
const authorRouter = require("./routes/author");
const bookRouter = require("./routes/book");

 
app.set("view engine", "ejs")
app.set("views", __dirname + "/views")
app.set("layout", "layouts/layout")
app.use(expressLayouts)
app.use(express.static("public")); 
app.use(bodyParser.urlencoded({ limit: '10mb', extended: false }))
app.use(methodOverride("_method"));


app.use("/", indexRouter);
app.use("/authors", authorRouter);
app.use("/books", bookRouter);


module.exports = app;