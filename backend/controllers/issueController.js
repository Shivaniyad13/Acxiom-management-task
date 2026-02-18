const Issue = require("../models/Issue");
const Book = require("../models/Book");
const Member = require("../models/Member");

// Issue a book
exports.issueBook = async (req, res) => {
  try {
    const { bookId, memberId, dueDate, remarks } = req.body;

    // Validation
    if (!bookId || !memberId || !dueDate) {
      return res.status(400).json({
        success: false,
        message: "Book ID, Member ID, and Due Date are required",
      });
    }

    // Check if book exists and has available copies
    const book = await Book.findById(bookId);
    if (!book) {
      return res.status(404).json({
        success: false,
        message: "Book not found",
      });
    }

    if (book.availableCopies <= 0) {
      return res.status(400).json({
        success: false,
        message: "No copies available for this book",
      });
    }

    // Check if member exists
    const member = await Member.findById(memberId);
    if (!member) {
      return res.status(404).json({
        success: false,
        message: "Member not found",
      });
    }

    if (member.membershipStatus !== "Active") {
      return res.status(400).json({
        success: false,
        message: "Member membership is not active",
      });
    }

    if (member.currentBooksIssued >= member.maxBooksAllowed) {
      return res.status(400).json({
        success: false,
        message: `Member has reached maximum book limit (${member.maxBooksAllowed})`,
      });
    }

    // Create issue record
    const issueNumber = "ISS-" + Date.now();
    const issue = new Issue({
      issueNumber,
      bookId,
      memberId,
      issueDate: Date.now(),
      dueDate,
      status: "Issued",
      remarks,
    });

    await issue.save();

    // Update book available copies
    book.availableCopies -= 1;
    await book.save();

    // Update member issued books count
    member.currentBooksIssued += 1;
    await member.save();

    res.status(201).json({
      success: true,
      message: "Book issued successfully",
      data: issue,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Return a book
exports.returnBook = async (req, res) => {
  try {
    const { issueId } = req.body;

    if (!issueId) {
      return res.status(400).json({
        success: false,
        message: "Issue ID is required",
      });
    }

    const issue = await Issue.findById(issueId);
    if (!issue) {
      return res.status(404).json({
        success: false,
        message: "Issue record not found",
      });
    }

    if (issue.status === "Returned") {
      return res.status(400).json({
        success: false,
        message: "Book has already been returned",
      });
    }

    const returnDate = Date.now();
    const dueDate = new Date(issue.dueDate);
    let fine = 0;

    // Calculate fine if overdue (Rs. 10 per day)
    if (returnDate > dueDate) {
      const daysOverdue = Math.ceil(
        (returnDate - dueDate) / (1000 * 60 * 60 * 24),
      );
      fine = daysOverdue * 10;
    }

    // Update issue record
    issue.returnDate = returnDate;
    issue.status = fine > 0 ? "Overdue" : "Returned";
    issue.fine = fine;
    await issue.save();

    // Update book available copies
    const book = await Book.findById(issue.bookId);
    if (book) {
      book.availableCopies += 1;
      await book.save();
    }

    // Update member fine and issued books count
    const member = await Member.findById(issue.memberId);
    if (member) {
      member.currentBooksIssued -= 1;
      member.totalFine += fine;
      await member.save();
    }

    res.status(200).json({
      success: true,
      message: "Book returned successfully",
      data: {
        issue,
        fine,
        finePaid: false,
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Get issue by ID
exports.getIssueById = async (req, res) => {
  try {
    const issue = await Issue.findById(req.params.id)
      .populate("bookId")
      .populate("memberId");

    if (!issue) {
      return res.status(404).json({
        success: false,
        message: "Issue record not found",
      });
    }

    res.status(200).json({
      success: true,
      data: issue,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Get all issued books
exports.getAllIssues = async (req, res) => {
  try {
    const issues = await Issue.find()
      .populate("bookId")
      .populate("memberId")
      .sort({ issueDate: -1 });

    res.status(200).json({
      success: true,
      count: issues.length,
      data: issues,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Get active issues (not returned)
exports.getActiveIssues = async (req, res) => {
  try {
    const issues = await Issue.find({ status: "Issued" })
      .populate("bookId")
      .populate("memberId")
      .sort({ issueDate: -1 });

    res.status(200).json({
      success: true,
      count: issues.length,
      data: issues,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Pay fine
exports.payFine = async (req, res) => {
  try {
    const { issueId } = req.body;

    if (!issueId) {
      return res.status(400).json({
        success: false,
        message: "Issue ID is required",
      });
    }

    const issue = await Issue.findById(issueId);
    if (!issue) {
      return res.status(404).json({
        success: false,
        message: "Issue record not found",
      });
    }

    if (issue.fine <= 0) {
      return res.status(400).json({
        success: false,
        message: "No fine to pay for this issue",
      });
    }

    issue.finePaid = true;
    await issue.save();

    res.status(200).json({
      success: true,
      message: "Fine paid successfully",
      data: issue,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
