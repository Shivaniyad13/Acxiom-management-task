// Utility Module
// Contains common functions used across the application

const UTILS = {
  // Get base path for navigation
  getBasePathPrefix: function () {
    const currentPath = window.location.pathname;
    // Check if we're in a subdirectory
    if (
      currentPath.includes("/maintenance/") ||
      currentPath.includes("/transactions/") ||
      currentPath.includes("/reports/")
    ) {
      return "../"; // Go up one level from subdirectory
    }
    return ""; // Already at root, no prefix needed
  },

  // Load menu based on user role
  loadMenuByRole: function () {
    const role = AUTH.getUserRole();
    const menuList = document.getElementById("menuList");

    if (!menuList) return;

    // Compute base path prefix relative to current file location
    const basePath = this.getBasePathPrefix();

    const menus = {
      admin: [
        { text: "Dashboard", href: basePath + "dashboard.html" },
        {
          text: "Add Membership",
          href: basePath + "maintenance/add_membership.html",
        },
        {
          text: "Update Membership",
          href: basePath + "maintenance/update_membership.html",
        },
        { text: "Add Book", href: basePath + "maintenance/add_book.html" },
        {
          text: "Update Book",
          href: basePath + "maintenance/update_book.html",
        },
        {
          text: "User Management",
          href: basePath + "maintenance/user_management.html",
        },
        { text: "Issue Book", href: basePath + "transactions/book_issue.html" },
        {
          text: "Return Book",
          href: basePath + "transactions/return_book.html",
        },
        { text: "Pay Fine", href: basePath + "transactions/fine_pay.html" },
        { text: "Reports", href: basePath + "reports/reports.html" },
        { text: "Charts", href: basePath + "chart.html" },
      ],
      librarian: [
        { text: "Dashboard", href: basePath + "dashboard.html" },
        {
          text: "Add Membership",
          href: basePath + "maintenance/add_membership.html",
        },
        {
          text: "Update Membership",
          href: basePath + "maintenance/update_membership.html",
        },
        { text: "Add Book", href: basePath + "maintenance/add_book.html" },
        {
          text: "Update Book",
          href: basePath + "maintenance/update_book.html",
        },
        { text: "Issue Book", href: basePath + "transactions/book_issue.html" },
        {
          text: "Return Book",
          href: basePath + "transactions/return_book.html",
        },
        { text: "Pay Fine", href: basePath + "transactions/fine_pay.html" },
        { text: "Reports", href: basePath + "reports/reports.html" },
      ],
      member: [
        { text: "Dashboard", href: basePath + "dashboard.html" },
        { text: "My Profile", href: basePath + "dashboard.html" },
        { text: "View Books", href: basePath + "dashboard.html" },
        { text: "My Issued Books", href: basePath + "dashboard.html" },
      ],
    };

    const roleMenus = menus[role] || [];
    menuList.innerHTML = roleMenus
      .map((menu) => `<li><a href="${menu.href}">${menu.text}</a></li>`)
      .join("");
  },

  // Format date to readable format
  formatDate: function (dateString) {
    const options = { year: "numeric", month: "long", day: "numeric" };
    return new Date(dateString).toLocaleDateString("en-US", options);
  },

  // Show notification
  showNotification: function (message, type = "success") {
    const notification = document.createElement("div");
    notification.className = `notification notification-${type}`;
    notification.textContent = message;
    document.body.appendChild(notification);

    setTimeout(() => {
      notification.remove();
    }, 3000);
  },

  // Validate email
  validateEmail: function (email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  },

  // Validate phone number
  validatePhone: function (phone) {
    const phoneRegex = /^\d{10}$/;
    return phoneRegex.test(phone.replace(/\D/g, ""));
  },

  // Generate unique ID
  generateId: function (prefix = "ID") {
    return prefix + Date.now() + Math.random().toString(36).substr(2, 9);
  },

  // Get current timestamp
  getCurrentTimestamp: function () {
    return new Date().toISOString();
  },

  // Sort array by property
  sortByProperty: function (array, property, ascending = true) {
    return array.sort((a, b) => {
      if (ascending) {
        return a[property] > b[property] ? 1 : -1;
      } else {
        return a[property] < b[property] ? 1 : -1;
      }
    });
  },

  // Filter array by property and value
  filterByProperty: function (array, property, value) {
    return array.filter((item) => item[property] === value);
  },

  // Deep clone object
  deepClone: function (obj) {
    return JSON.parse(JSON.stringify(obj));
  },

  // Check if object is empty
  isEmpty: function (obj) {
    return Object.keys(obj).length === 0;
  },

  // Generate report data
  generateReportData: function (reportType) {
    console.log("Generating report:", reportType);
    // TODO: Implement backend call to fetch report data
    return {
      reportType: reportType,
      generatedAt: this.getCurrentTimestamp(),
      data: [],
    };
  },

  // Export data to CSV
  exportToCSV: function (data, filename = "report.csv") {
    const csv = this.convertToCSV(data);
    const link = document.createElement("a");
    link.href = "data:text/csv;charset=utf-8," + encodeURIComponent(csv);
    link.download = filename;
    link.click();
  },

  // Convert JSON to CSV
  convertToCSV: function (data) {
    if (!Array.isArray(data) || data.length === 0) return "";

    const headers = Object.keys(data[0]);
    const rows = data.map((obj) =>
      headers.map((header) => JSON.stringify(obj[header])).join(","),
    );

    return [headers.join(","), ...rows].join("\n");
  },

  // Show success message
  showSuccess: function (message) {
    const alert = document.createElement("div");
    alert.className = "alert alert-success";
    alert.innerHTML = "<strong>✅ Success!</strong> " + message;
    alert.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background-color: #4caf50;
            color: white;
            padding: 16px;
            border-radius: 8px;
            box-shadow: 0 4px 6px rgba(0,0,0,0.2);
            z-index: 10000;
            animation: slideUp 0.3s ease-in-out;
            font-weight: 600;
        `;
    document.body.appendChild(alert);
    setTimeout(() => alert.remove(), 3000);
  },

  // Show error message
  showError: function (message) {
    const alert = document.createElement("div");
    alert.className = "alert alert-error";
    alert.innerHTML = "<strong>❌ Error!</strong> " + message;
    alert.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background-color: #f44336;
            color: white;
            padding: 16px;
            border-radius: 8px;
            box-shadow: 0 4px 6px rgba(0,0,0,0.2);
            z-index: 10000;
            animation: slideUp 0.3s ease-in-out;
            font-weight: 600;
        `;
    document.body.appendChild(alert);
    setTimeout(() => alert.remove(), 3000);
  },
};

// Initialize on page load
document.addEventListener("DOMContentLoaded", function () {
  UTILS.loadMenuByRole();
});
