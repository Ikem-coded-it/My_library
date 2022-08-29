const express = require("express")
const router = express.Router();

// All authors route
router.get("/", (req, res) => {
    res.render("authors/index")
})

// new authors route
router.get("/new", (req, res) => {
    res.render("authors/new")
})

// Create Author Route
router.post("/", (req, res) => {
    res.send("create")
})

module.exports = router