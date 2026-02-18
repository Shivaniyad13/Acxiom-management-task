// API Configuration and Helper Functions
const API_BASE_URL = "http://localhost:5000/api";

const API = {
  // Make API request
  async request(endpoint, method = "GET", data = null) {
    try {
      const options = {
        method: method,
        headers: {
          "Content-Type": "application/json",
        },
      };

      if (data) {
        options.body = JSON.stringify(data);
      }

      const response = await fetch(`${API_BASE_URL}${endpoint}`, options);
      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message || `API error: ${response.status}`);
      }

      return result;
    } catch (error) {
      console.error("API Error:", error);
      throw error;
    }
  },

  // Book APIs
  books: {
    add: async (bookData) => {
      return API.request("/books/add", "POST", {
        title: bookData.title,
        author: bookData.author,
        isbn: bookData.isbn,
        category: bookData.category,
        itemType: bookData.itemType || "Book",
        totalCopies: parseInt(bookData.quantity) || 1,
        publishYear: bookData.publishYear,
        publisher: bookData.publisher,
      });
    },

    getAll: async () => {
      return API.request("/books/all", "GET");
    },

    getById: async (id) => {
      return API.request(`/books/${id}`, "GET");
    },

    search: async (query) => {
      return API.request(
        `/books/search?query=${encodeURIComponent(query)}`,
        "GET",
      );
    },

    update: async (id, bookData) => {
      return API.request(`/books/${id}`, "PUT", {
        title: bookData.title,
        author: bookData.author,
        isbn: bookData.isbn,
        category: bookData.category,
        itemType: bookData.itemType || "Book",
        totalCopies: parseInt(bookData.quantity) || 1,
        publishYear: bookData.publishYear,
        publisher: bookData.publisher,
      });
    },

    delete: async (id) => {
      return API.request(`/books/${id}`, "DELETE");
    },
  },

  // Issue APIs
  issues: {
    issue: async (issueData) => {
      return API.request("/issues/issue", "POST", {
        bookId: issueData.bookId,
        memberId: issueData.memberId,
        dueDate: issueData.dueDate,
        remarks: issueData.remarks,
      });
    },

    return: async (issueId) => {
      return API.request("/issues/return", "POST", {
        issueId: issueId,
      });
    },

    payFine: async (issueId) => {
      return API.request("/issues/pay-fine", "POST", {
        issueId: issueId,
      });
    },

    getAll: async () => {
      return API.request("/issues/all", "GET");
    },

    getActive: async () => {
      return API.request("/issues/active", "GET");
    },

    getById: async (id) => {
      return API.request(`/issues/${id}`, "GET");
    },
  },
};
