const mongoose = require("mongoose");

const memberSchema = new mongoose.Schema({
  memberNumber: {
    type: String,
    unique: true,
    required: true,
  },
  firstName: {
    type: String,
    required: [true, "Please provide first name"],
    trim: true,
  },
  lastName: {
    type: String,
    required: [true, "Please provide last name"],
    trim: true,
  },
  email: {
    type: String,
    required: [true, "Please provide email"],
    unique: true,
    lowercase: true,
  },
  phone: {
    type: String,
    required: [true, "Please provide phone number"],
    match: [/^\d{10}$/, "Phone number must be 10 digits"],
  },
  address: {
    type: String,
    required: true,
  },
  city: {
    type: String,
    required: true,
  },
  membershipType: {
    type: String,
    enum: ["Premium", "Standard", "Basic"],
    default: "Standard",
  },
  membershipStatus: {
    type: String,
    enum: ["Active", "Suspended", "Cancelled"],
    default: "Active",
  },
  membershipStartDate: {
    type: Date,
    required: true,
  },
  membershipEndDate: {
    type: Date,
    required: true,
  },
  maxBooksAllowed: {
    type: Number,
    default: 5,
  },
  currentBooksIssued: {
    type: Number,
    default: 0,
  },
  totalFine: {
    type: Number,
    default: 0,
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

module.exports = mongoose.model("Member", memberSchema);
