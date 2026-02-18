// Maintenance Module
// Handles membership and book management functions

const MAINTENANCE = {
  // Validate Add Membership Form
  validateAddMembershipForm: function (event) {
    event.preventDefault();
    const membershipNumber = document
      .getElementById("membershipNumber")
      .value.trim();
    const memberName = document.getElementById("memberName").value.trim();
    const email = document.getElementById("email").value.trim();
    const phone = document.getElementById("phone").value.trim();
    const membershipType = document.getElementById("membershipType").value;
    const errorDiv = document.getElementById("errorMessage");

    let errors = [];

    if (
      !membershipNumber ||
      !memberName ||
      !email ||
      !phone ||
      membershipType === "Select Type"
    ) {
      errors.push("All required fields must be filled in.");
    }

    if (email && !UTILS.validateEmail(email)) {
      errors.push("Please enter a valid email address.");
    }

    if (phone && !UTILS.validatePhone(phone)) {
      errors.push("Please enter a valid phone number (10 digits).");
    }

    if (errors.length > 0) {
      errorDiv.innerHTML = errors.join("<br>");
      errorDiv.style.display = "block";
      return false;
    }

    errorDiv.style.display = "none";
    this.addMembership({
      membershipNumber: membershipNumber,
      memberName: memberName,
      email: email,
      phone: phone,
      membershipType: membershipType,
      duration: document.querySelector(
        'input[name="membershipDuration"]:checked',
      ).value,
    });
    return false;
  },

  // Validate Update Membership Form
  validateUpdateMembershipForm: function (event) {
    event.preventDefault();
    const memberId = document.getElementById("memberId").value.trim();
    const memberName = document.getElementById("memberName").value.trim();
    const email = document.getElementById("email").value.trim();
    const phone = document.getElementById("phone").value.trim();
    const membershipType = document.getElementById("membershipType").value;
    const errorDiv = document.getElementById("errorMessage");

    let errors = [];

    if (
      !memberId ||
      !memberName ||
      !email ||
      !phone ||
      membershipType === "Select Type"
    ) {
      errors.push("All required fields must be filled in.");
    }

    if (email && !UTILS.validateEmail(email)) {
      errors.push("Please enter a valid email address.");
    }

    if (phone && !UTILS.validatePhone(phone)) {
      errors.push("Please enter a valid phone number (10 digits).");
    }

    if (errors.length > 0) {
      errorDiv.innerHTML = errors.join("<br>");
      errorDiv.style.display = "block";
      return false;
    }

    errorDiv.style.display = "none";
    this.updateMembership(memberId, {
      memberName: memberName,
      email: email,
      phone: phone,
      membershipType: membershipType,
      action: document.querySelector('input[name="membershipAction"]:checked')
        .value,
    });
    return false;
  },

  // Validate Add Book Form
  validateAddBookForm: function (event) {
    event.preventDefault();
    const itemType = document.querySelector(
      'input[name="itemType"]:checked',
    ).value;
    const bookTitle = document.getElementById("bookTitle").value.trim();
    const author = document.getElementById("author").value.trim();
    const isbn = document.getElementById("isbn").value.trim();
    const category = document.getElementById("category").value.trim();
    const quantity = document.getElementById("quantity").value.trim();
    const errorDiv = document.getElementById("errorMessage");

    let errors = [];

    if (!bookTitle || !author || !isbn || !category || !quantity) {
      errors.push("All required fields must be filled in.");
    }

    if (quantity && (isNaN(quantity) || parseInt(quantity) <= 0)) {
      errors.push("Quantity must be a positive number.");
    }

    if (errors.length > 0) {
      errorDiv.innerHTML = errors.join("<br>");
      errorDiv.style.display = "block";
      return false;
    }

    errorDiv.style.display = "none";
    this.addBook({
      itemType: itemType,
      title: bookTitle,
      author: author,
      isbn: isbn,
      category: category,
      quantity: quantity,
    });
    return false;
  },

  // Validate Update Book Form
  validateUpdateBookForm: function (event) {
    event.preventDefault();
    const bookId = document.getElementById("bookId").value.trim();
    const itemType = document.querySelector(
      'input[name="itemType"]:checked',
    ).value;
    const bookTitle = document.getElementById("bookTitle").value.trim();
    const author = document.getElementById("author").value.trim();
    const isbn = document.getElementById("isbn").value.trim();
    const category = document.getElementById("category").value.trim();
    const quantity = document.getElementById("quantity").value.trim();
    const errorDiv = document.getElementById("errorMessage");

    let errors = [];

    if (!bookId || !bookTitle || !author || !isbn || !category || !quantity) {
      errors.push("All required fields must be filled in.");
    }

    if (quantity && (isNaN(quantity) || parseInt(quantity) < 0)) {
      errors.push("Quantity must be a non-negative number.");
    }

    if (errors.length > 0) {
      errorDiv.innerHTML = errors.join("<br>");
      errorDiv.style.display = "block";
      return false;
    }

    errorDiv.style.display = "none";
    this.updateBook(bookId, {
      itemType: itemType,
      title: bookTitle,
      author: author,
      isbn: isbn,
      category: category,
      quantity: quantity,
    });
    return false;
  },

  // Validate User Management Form
  validateUserManagementForm: function (event) {
    event.preventDefault();
    const userType = document.querySelector(
      'input[name="userType"]:checked',
    ).value;
    const username = document.getElementById("username").value.trim();
    const email = document.getElementById("email").value.trim();
    const password = document.getElementById("password").value.trim();
    const role = document.getElementById("role").value;
    const errorDiv = document.getElementById("errorMessage");

    let errors = [];

    if (!username || !email || !password || role === "Select Role") {
      errors.push("All required fields must be filled in.");
    }

    if (email && !UTILS.validateEmail(email)) {
      errors.push("Please enter a valid email address.");
    }

    if (password && password.length < 6) {
      errors.push("Password must be at least 6 characters long.");
    }

    if (errors.length > 0) {
      errorDiv.innerHTML = errors.join("<br>");
      errorDiv.style.display = "block";
      return false;
    }

    errorDiv.style.display = "none";
    this.addUser({
      userType: userType,
      username: username,
      email: email,
      password: password,
      role: role,
    });
    return false;
  },

  // Add new membership
  addMembership: function (memberData) {
    console.log("Adding membership:", memberData);
    // TODO: Implement backend call
    alert(
      "Membership added successfully!\nMembership Number: " +
        memberData.membershipNumber,
    );
    document.getElementById("addMembershipForm").reset();
  },

  // Update membership
  updateMembership: function (memberId, memberData) {
    console.log("Updating membership:", memberId, memberData);
    // TODO: Implement backend call
    alert("Membership updated successfully!");
    document.getElementById("updateMembershipForm").reset();
  },

  // Search member by ID
  searchMember: function () {
    const memberId = document.getElementById("memberId").value.trim();
    if (!memberId) {
      alert("Please enter Member ID");
      return;
    }
    console.log("Searching for member:", memberId);
    // TODO: Implement backend call
    const member = {
      id: memberId,
      name: "John Doe",
      email: "john@example.com",
      phone: "1234567890",
    };
    document.getElementById("memberName").value = member.name;
    document.getElementById("email").value = member.email;
    document.getElementById("phone").value = member.phone;
  },

  // Search member by number
  searchMemberByNumber: function () {
    const membershipNumber = document
      .getElementById("membershipNumber")
      .value.trim();
    if (!membershipNumber) {
      alert("Please enter Membership Number");
      return;
    }
    console.log("Searching for membership:", membershipNumber);
    // TODO: Implement backend call
    const member = {
      number: membershipNumber,
      name: "John Doe",
      email: "john@example.com",
      phone: "1234567890",
    };
    document.getElementById("memberName").value = member.name;
    document.getElementById("email").value = member.email;
    document.getElementById("phone").value = member.phone;
  },

  // Add new book
  addBook: async function (bookData) {
    try {
      const response = await API.books.add(bookData);
      if (response.success) {
        UTILS.showSuccess("Book added successfully!");
        document.getElementById("addBookForm").reset();
        // Refresh book list if exists
        setTimeout(() => window.location.reload(), 1500);
      }
    } catch (error) {
      UTILS.showError("Error adding book: " + error.message);
    }
  },

  // Update book
  updateBook: async function (bookId, bookData) {
    try {
      const response = await API.books.update(bookId, bookData);
      if (response.success) {
        UTILS.showSuccess("Book updated successfully!");
        document.getElementById("updateBookForm").reset();
        setTimeout(() => window.location.reload(), 1500);
      }
    } catch (error) {
      UTILS.showError("Error updating book: " + error.message);
    }
  },

  // Search book by ID
  searchBook: async function () {
    const bookId = document.getElementById("bookId").value.trim();
    if (!bookId) {
      UTILS.showError("Please enter Book ID");
      return;
    }
    try {
      const response = await API.books.getById(bookId);
      if (response.success && response.data) {
        const book = response.data;
        document.getElementById("bookTitle").value = book.title;
        document.getElementById("author").value = book.author;
        document.getElementById("isbn").value = book.isbn;
        document.getElementById("category").value = book.category;
        document.getElementById("quantity").value = book.totalCopies;
        document.querySelector(
          `input[value="${book.itemType.toLowerCase()}"]`,
        ).checked = true;
        UTILS.showSuccess("Book found!");
      }
    } catch (error) {
      UTILS.showError("Error searching book: " + error.message);
    }
  },

  // Add new user
  addUser: function (userData) {
    console.log("Adding user:", userData);
    // TODO: Implement backend call
    alert("User added successfully!\nUsername: " + userData.username);
    document.getElementById("addUserForm").reset();
  },

  // Get all users
  getAllUsers: function () {
    console.log("Fetching all users");
    // TODO: Implement backend call
    return [];
  },

  // Update user
  updateUser: function (userId, userData) {
    console.log("Updating user:", userId, userData);
    // TODO: Implement backend call
    alert("User updated successfully!");
  },

  // Delete user
  deleteUser: function (userId) {
    console.log("Deleting user:", userId);
    // TODO: Implement backend call
    if (confirm("Are you sure you want to delete this user?")) {
      alert("User deleted successfully!");
    }
  },
};

// Form submission handlers
document.addEventListener("DOMContentLoaded", function () {
  const addMembershipForm = document.getElementById("addMembershipForm");
  const updateMembershipForm = document.getElementById("updateMembershipForm");
  const addBookForm = document.getElementById("addBookForm");
  const updateBookForm = document.getElementById("updateBookForm");
  const addUserForm = document.getElementById("addUserForm");

  // No need to attach submit handlers - they're now in the HTML onsubmit
  // But we can initialize default values here
  if (addMembershipForm) {
    document.querySelector('input[value="6months"]').checked = true;
  }

  if (updateMembershipForm) {
    document.querySelector('input[value="extend"]').checked = true;
  }
});
