const express = require("express");
const bookController = require("../controllers/bookController");

const router = express.Router();

// Book routes
router.post("/add", bookController.addBook);
router.get("/all", bookController.getAllBooks);
router.get("/search", bookController.searchBooks);
router.get("/:id", bookController.getBookById);
router.put("/:id", bookController.updateBook);
router.delete("/:id", bookController.deleteBook);

module.exports = router;
