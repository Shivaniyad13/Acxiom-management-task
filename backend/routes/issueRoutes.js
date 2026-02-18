const express = require("express");
const issueController = require("../controllers/issueController");

const router = express.Router();

// Issue routes
router.post("/issue", issueController.issueBook);
router.post("/return", issueController.returnBook);
router.post("/pay-fine", issueController.payFine);
router.get("/all", issueController.getAllIssues);
router.get("/active", issueController.getActiveIssues);
router.get("/:id", issueController.getIssueById);

module.exports = router;
