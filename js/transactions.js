// Transactions Module
// Handles book issue, return, and fine payment operations

const TRANSACTIONS = {
  // Validate Issue Book Form
  validateIssueForm: function (event) {
    event.preventDefault();
    const memberId = document.getElementById("memberId").value.trim();
    const bookId = document.getElementById("bookId").value.trim();
    const issueDate = document.getElementById("issueDate").value;
    const returnDate = document.getElementById("returnDate").value;
    const bookTitle = document.getElementById("bookTitle").value.trim();
    const authorName = document.getElementById("authorName").value.trim();
    const errorDiv = document.getElementById("errorMessage");

    let errors = [];

    if (!memberId || !bookId || !issueDate || !returnDate) {
      errors.push("All required fields must be filled in.");
    }

    if (!bookTitle) {
      errors.push("Book must be selected.");
    }

    if (!authorName) {
      errors.push("Author information is required.");
    }

    // Validate Issue Date - cannot be less than today
    const today = new Date().toISOString().split("T")[0];
    if (issueDate < today) {
      errors.push("Issue Date cannot be less than today.");
    }

    // Validate Return Date
    if (issueDate && returnDate) {
      const issue = new Date(issueDate);
      const due = new Date(returnDate);
      const diffTime = due - issue;
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

      if (diffDays <= 0) {
        errors.push("Return Date must be after Issue Date.");
      }
      if (diffDays > 15) {
        errors.push("Return Date cannot be more than 15 days from Issue Date.");
      }
    }

    if (errors.length > 0) {
      errorDiv.innerHTML = errors.join("<br>");
      errorDiv.style.display = "block";
      return false;
    }

    errorDiv.style.display = "none";
    this.issueBook({
      memberId: memberId,
      bookId: bookId,
      issueDate: issueDate,
      returnDate: returnDate,
      remarks: document.getElementById("remarks").value,
    });
    return false;
  },

  // Validate Return Book Form
  validateReturnForm: function (event) {
    event.preventDefault();
    const issueId = document.getElementById("issueId").value.trim();
    const bookTitle = document.getElementById("bookTitle").value.trim();
    const serialNo = document.getElementById("serialNo").value.trim();
    const returnDate = document.getElementById("returnDate").value;
    const errorDiv = document.getElementById("errorMessage");

    let errors = [];

    if (!issueId || !returnDate) {
      errors.push("All required fields must be filled in.");
    }

    if (!bookTitle) {
      errors.push("Book information is required.");
    }

    if (!serialNo) {
      errors.push("Serial No of Book is required.");
    }

    // Validate Return Date
    const today = new Date().toISOString().split("T")[0];
    if (returnDate < today) {
      errors.push("Return Date cannot be less than today.");
    }

    if (errors.length > 0) {
      errorDiv.innerHTML = errors.join("<br>");
      errorDiv.style.display = "block";
      return false;
    }

    errorDiv.style.display = "none";

    // Calculate fine and redirect to fine payment
    const fineAmount = document.getElementById("fineAmount").value;
    if (fineAmount > 0) {
      alert("Fine detected. Proceeding to Fine Payment.");
      // Store data in session storage for fine payment page
      sessionStorage.setItem(
        "returnData",
        JSON.stringify({
          issueId: issueId,
          memberId: document.getElementById("memberId").value,
          memberName: document.getElementById("memberName").value,
          bookId: document.getElementById("bookId").value,
          bookTitle: bookTitle,
          fineAmount: fineAmount,
          returnDate: returnDate,
        }),
      );
      window.location.href = "fine_pay.html";
    } else {
      alert("No fine. Book return completed successfully!");
    }
    return false;
  },

  // Validate Fine Pay Form
  validateFinePayForm: function (event) {
    event.preventDefault();
    const memberId = document.getElementById("memberId").value.trim();
    const totalFine = document.getElementById("totalFine").value;
    const payAmount = document.getElementById("payAmount").value;
    const paymentMethod = document.getElementById("paymentMethod").value;
    const paymentDate = document.getElementById("paymentDate").value;
    const finePaid = document.getElementById("finePaid").checked;
    const errorDiv = document.getElementById("errorMessage");

    let errors = [];

    if (!memberId || !payAmount || !paymentMethod || !paymentDate) {
      errors.push("All required fields must be filled in.");
    }

    if (totalFine > 0 && !finePaid) {
      errors.push(
        'You must mark "Fine Paid" checkbox if there is a pending fine.',
      );
    }

    if (!payAmount || isNaN(payAmount) || parseFloat(payAmount) <= 0) {
      errors.push("Payment Amount must be a valid positive number.");
    }

    if (paymentMethod === "Select Method") {
      errors.push("Please select a valid Payment Method.");
    }

    const today = new Date().toISOString().split("T")[0];
    if (paymentDate > today) {
      errors.push("Payment Date cannot be in the future.");
    }

    if (errors.length > 0) {
      errorDiv.innerHTML = errors.join("<br>");
      errorDiv.style.display = "block";
      return false;
    }

    errorDiv.style.display = "none";
    this.payFine({
      memberId: memberId,
      totalFine: totalFine,
      payAmount: payAmount,
      paymentMethod: paymentMethod,
      paymentDate: paymentDate,
      finePaid: finePaid,
      remarks: document.getElementById("remarks").value,
    });
    return false;
  },

  // Issue a book
  issueBook: async function (issueData) {
    try {
      const response = await API.issues.issue({
        bookId: issueData.bookId,
        memberId: issueData.memberId,
        dueDate: issueData.returnDate,
        remarks: issueData.remarks,
      });
      if (response.success) {
        UTILS.showSuccess(
          "Book issued successfully! Issue Number: " +
            response.data.issueNumber,
        );
        document.getElementById("bookIssueForm").reset();
        setTimeout(() => (window.location.href = "../dashboard.html"), 1500);
      }
    } catch (error) {
      UTILS.showError("Error issuing book: " + error.message);
    }
  },

  // Return a book
  returnBook: async function (returnData) {
    try {
      const response = await API.issues.return(returnData.issueId);
      if (response.success) {
        // Check if there's a fine to pay
        if (response.data.fine && response.data.fine > 0) {
          UTILS.showSuccess(
            "Fine calculated: Rs. " +
              response.data.fine +
              ". Proceeding to payment.",
          );
          // Store data in session storage for fine payment page
          sessionStorage.setItem(
            "returnData",
            JSON.stringify({
              issueId: returnData.issueId,
              fine: response.data.fine,
              finePaid: false,
            }),
          );
          setTimeout(() => (window.location.href = "fine_pay.html"), 1500);
        } else {
          UTILS.showSuccess("Book returned successfully!");
          setTimeout(() => (window.location.href = "../dashboard.html"), 1500);
        }
      }
    } catch (error) {
      UTILS.showError("Error returning book: " + error.message);
    }
  },

  // Pay fine
  payFine: async function (fineData) {
    try {
      const returnData = JSON.parse(
        sessionStorage.getItem("returnData") || "{}",
      );
      const issueId = returnData.issueId || fineData.issueId;

      if (!issueId) {
        UTILS.showError("Error: Issue ID not found");
        return;
      }

      const response = await API.issues.payFine(issueId);
      if (response.success) {
        UTILS.showSuccess(
          "Fine paid successfully! Amount: Rs. " + fineData.payAmount,
        );
        document.getElementById("finePayForm").reset();
        sessionStorage.removeItem("returnData");
        setTimeout(() => (window.location.href = "../dashboard.html"), 1500);
      }
    } catch (error) {
      UTILS.showError("Error paying fine: " + error.message);
    }
  },

  // Search member for issue
  searchMemberForIssue: function () {
    const memberId = document.getElementById("memberId").value.trim();
    if (!memberId) {
      alert("Please enter Member ID");
      return;
    }
    console.log("Searching member for issue:", memberId);
    // TODO: Implement backend call
    const member = {
      id: memberId,
      name: "John Doe",
      email: "john@example.com",
    };
    document.getElementById("memberName").value = member.name;
  },

  // Search book for issue
  searchBookForIssue: function () {
    const bookId = document.getElementById("bookId").value.trim();
    if (!bookId) {
      alert("Please enter Book ID");
      return;
    }
    console.log("Searching book for issue:", bookId);
    // TODO: Implement backend call
    const book = {
      id: bookId,
      title: "Sample Book",
      author: "Sample Author",
    };
    document.getElementById("bookTitle").value = book.title;
    document.getElementById("authorName").value = book.author;

    // Auto-populate return date as 15 days from issue date
    const issueDate = document.getElementById("issueDate").value;
    if (issueDate) {
      const issue = new Date(issueDate);
      const dueDate = new Date(issue);
      dueDate.setDate(dueDate.getDate() + 15);
      document.getElementById("returnDate").value = dueDate
        .toISOString()
        .split("T")[0];
    }
  },

  // Search issue for return
  searchIssueForReturn: function () {
    const issueId = document.getElementById("issueId").value.trim();
    if (!issueId) {
      alert("Please enter Issue ID");
      return;
    }
    console.log("Searching issue for return:", issueId);
    // TODO: Implement backend call
    const issue = {
      issueId: issueId,
      memberId: "M001",
      memberName: "John Doe",
      bookId: "B001",
      bookTitle: "Sample Book",
      authorName: "Sample Author",
      serialNo: "SN12345",
      issueDate: "2026-01-01",
      dueDate: "2026-02-15",
      fineAmount: 0,
    };

    document.getElementById("memberId").value = issue.memberId;
    document.getElementById("memberName").value = issue.memberName;
    document.getElementById("bookId").value = issue.bookId;
    document.getElementById("bookTitle").value = issue.bookTitle;
    document.getElementById("authorName").value = issue.authorName;
    document.getElementById("serialNo").value = issue.serialNo;
    document.getElementById("issueDate").value = issue.issueDate;
    document.getElementById("dueDate").value = issue.dueDate;

    // Calculate fine based on current date vs due date
    const today = new Date();
    const due = new Date(issue.dueDate);
    if (today > due) {
      const diffTime = today - due;
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
      issue.fineAmount = diffDays * 10; // Rs. 10 per day
    }
    document.getElementById("fineAmount").value = issue.fineAmount;
  },

  // Calculate fine for overdue book
  calculateFine: function (dueDate, returnDate) {
    const due = new Date(dueDate);
    const returned = new Date(returnDate);
    const diffTime = returned - due;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays > 0) {
      return diffDays * 10; // Rs. 10 per day
    }
    return 0;
  },

  // Search fines for member
  searchFines: function () {
    const memberId = document.getElementById("memberId").value.trim();
    if (!memberId) {
      alert("Please enter Member ID");
      return;
    }
    console.log("Searching fines for member:", memberId);
    // TODO: Implement backend call
    const fines = {
      memberId: memberId,
      memberName: "John Doe",
      totalFine: 150,
    };
    document.getElementById("memberName").value = fines.memberName;
    document.getElementById("totalFine").value = fines.totalFine;
    document.getElementById("payAmount").value = fines.totalFine;
  },

  // Get transaction history
  getTransactionHistory: function (memberId) {
    console.log("Getting transaction history for member:", memberId);
    // TODO: Implement backend call
    return [];
  },
};

// Form submission handlers
document.addEventListener("DOMContentLoaded", function () {
  const bookIssueForm = document.getElementById("bookIssueForm");
  const bookReturnForm = document.getElementById("bookReturnForm");
  const finePayForm = document.getElementById("finePayForm");

  if (bookIssueForm) {
    // Set minimum issue date to today
    const today = new Date().toISOString().split("T")[0];
    document.getElementById("issueDate").setAttribute("min", today);
  }

  // Load return data if coming from return_book.html
  const returnData = sessionStorage.getItem("returnData");
  if (returnData && finePayForm) {
    const data = JSON.parse(returnData);
    document.getElementById("memberId").value = data.memberId || "";
    TRANSACTIONS.searchFines();
  }
});
