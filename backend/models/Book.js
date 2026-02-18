const mongoose = require("mongoose");

const bookSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, "Please provide book title"],
    trim: true,
  },
  author: {
    type: String,
    required: [true, "Please provide author name"],
    trim: true,
  },
  isbn: {
    type: String,
    unique: true,
    trim: true,
  },
  category: {
    type: String,
    enum: [
      "Fiction",
      "Non-Fiction",
      "Science",
      "History",
      "Biography",
      "Education",
      "Young Adult",
      "Mystery",
      "Romance",
      "Thriller",
      "Other",
    ],
    default: "Other",
  },
  itemType: {
    type: String,
    enum: ["Book", "Movie", "Magazine"],
    default: "Book",
  },
  totalCopies: {
    type: Number,
    default: 1,
    min: 1,
  },
  availableCopies: {
    type: Number,
    default: 1,
    min: 0,
  },
  publishYear: {
    type: Number,
  },
  publisher: {
    type: String,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Book", bookSchema);
