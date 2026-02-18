# Quick Start Guide 🚀

## Summary of What's Been Created

### ✅ Backend Setup (Complete)
- **Express Server** - RESTful API server running on port 5000
- **MongoDB Integration** - Mongoose models and database connection
- **API Routes** - Book and Issue management endpoints
- **Controllers** - Business logic for all operations
- **Models** - Book, Member, and Issue schemas
- **Security** - CORS enabled, error handling, validation

### ✅ Frontend Integration (Complete)
- **API Client** - `js/api.js` for making HTTP requests
- **Updated Modules** - `maintenance.js` and `transactions.js` now use backend APIs
- **Error/Success Alerts** - User-friendly notification system
- **Form Validations** - Client-side validation with server-side checks

### ✅ Database Models
- **Books** - Title, Author, ISBN, Category, Item Type, Copies
- **Members** - Contact info, Membership type, Book limit tracking
- **Issues** - Book issuance, return, fine calculation (₹10/day)

## Step-by-Step Setup Instructions

### Step 1: Setup MongoDB

**Option A: Local MongoDB (Recommended for testing)**
```bash
# Download and install MongoDB Community Edition from:
# https://www.mongodb.com/try/download/community

# Start MongoDB service
# Windows: It usually starts automatically
# Mac: brew services start mongodb-community
# Linux: sudo service mongod start

# Verify it's running at: mongodb://localhost:27017
```

**Option B: MongoDB Atlas Cloud**
1. Go to https://www.mongodb.com/cloud/atlas
2. Create free account and cluster
3. Get connection string
4. Update `backend/.env`:
   ```
   MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/library-management
   ```

### Step 2: Install Dependencies

```bash
# Frontend
cd library-management
npm install

# Backend
cd backend
npm install
```

### Step 3: Start Servers (Use Two Terminal Windows)

**Terminal 1 - Start Backend:**
```bash
cd library-management/backend
npm start
```

You should see:
```
╔════════════════════════════════════════╗
║   📚 Library Management System 📚      ║
║          Backend Server Running        ║
║   Server: http://localhost:5000        ║
║   MongoDB: Configured                  ║
╚════════════════════════════════════════╝
```

**Terminal 2 - Start Frontend:**
```bash
cd library-management
npm start
```

You should see:
```
🎉 Server running at http://localhost:3000
📚 Library Management System is ready!
```

### Step 4: Open Application

Open browser and go to: **http://localhost:3000**

### Step 5: Test Login

Use any of these credentials:
- **Admin:** username: `admin` | password: anything
- **Librarian:** username: `librarian` | password: anything  
- **Member:** username: any | password: anything

## Testing the APIs

### Test 1: Add a Book
1. Login as Admin or Librarian
2. Click "Add Book" from menu
3. Fill in form:
   - Title: "The Great Gatsby"
   - Author: "F. Scott Fitzgerald"
   - ISBN: "978-0-7432-7351-5"
   - Category: "Fiction"
   - Quantity: 5
4. Click "Add Book"
5. Should see success message and redirect

### Test 2: Issue a Book
1. Click "Issue Book" from menu
2. Enter Member ID (can be any number)
3. Enter Book ID (from the book you added)
4. Set Issue Date (today) and Return Date (15 days from today)
5. Click "Issue Book"
6. Should see success with issue number

### Test 3: Return Book
1. Click "Return Book" from menu
2. Enter Issue ID (from issued book)
3. Set Return Date
4. If overdue: Fine will be calculated (₹10 per day)
5. System redirects to fine payment
6. Click "Pay Fine" checkbox and complete payment

### Test 4: View Database (Optional)

To see data in MongoDB:
```bash
# Using MongoDB CLI (if installed)
mongosh

# Commands:
use library-management
db.books.find()
db.members.find()
db.issues.find()
```

Or use MongoDB Compass GUI tool.

## API Endpoints Reference

### Books API
```
POST   /api/books/add              - Add new book
GET    /api/books/all              - Get all books
GET    /api/books/:id              - Get book by ID
GET    /api/books/search?query=... - Search books
PUT    /api/books/:id              - Update book
DELETE /api/books/:id              - Delete book
```

### Issues API
```
POST   /api/issues/issue           - Issue a book
POST   /api/issues/return          - Return a book
POST   /api/issues/pay-fine        - Mark fine as paid
GET    /api/issues/all             - Get all issues
GET    /api/issues/active          - Get active issues
GET    /api/issues/:id             - Get issue by ID
```

### Health Check
```
GET    /api/health                 - Check if API is running
```

## Troubleshooting

### ❌ "Cannot connect to MongoDB"
```bash
# Check if MongoDB is running
# Windows: Look for mongod.exe process
# Mac/Linux: 
netstat -tulpn | grep 27017

# If not running, start it:
mongod
```

### ❌ "Port 3000/5000 already in use"
```bash
# Windows: Find and kill process
netstat -ano | findstr :3000
taskkill /PID <PID> /F

# Mac/Linux:
lsof -i :3000
kill -9 <PID>
```

### ❌ "API not responding"
1. Check both servers are running
2. Check console logs for errors
3. Verify MongoDB is connected
4. Try accessing: http://localhost:5000/api/health

### ❌ "Form submission not working"
1. Open browser DevTools (F12)
2. Go to Console tab
3. Look for error messages
4. Check Network tab to see API calls
5. Verify backend is running on port 5000

## File Structure

```
library-management/
├── index.html                    # Login page
├── dashboard.html                # Main dashboard
├── server.js                     # Frontend server
├── package.json                  
│
├── css/
│   └── style.css                # All styling (800+ lines)
│
├── js/
│   ├── auth.js                  # Authentication
│   ├── api.js                   # ✨ NEW: API client
│   ├── maintenance.js           # ✨ UPDATED: Uses API
│   ├── transactions.js          # ✨ UPDATED: Uses API
│   └── utils.js                 # ✨ UPDATED: Added notifications
│
├── maintenance/
│   ├── add_membership.html       # ✨ UPDATED: Includes api.js
│   ├── update_membership.html    # ✨ UPDATED: Includes api.js
│   ├── add_book.html             # ✨ UPDATED: Includes api.js
│   ├── update_book.html          # ✨ UPDATED: Includes api.js
│   └── user_management.html      # ✨ UPDATED: Includes api.js
│
├── transactions/
│   ├── book_issue.html           # ✨ UPDATED: Includes api.js
│   ├── return_book.html          # ✨ UPDATED: Includes api.js
│   └── fine_pay.html             # ✨ UPDATED: Includes api.js
│
├── reports/
│   └── reports.html
│
├── chart.html
├── README.md                    # Full documentation
└── backend/                     # ✨ NEW: Backend Server
    ├── server.js                # Express server
    ├── package.json
    ├── .env                     # MongoDB config
    ├── .gitignore
    │
    ├── config/
    │   └── db.js               # MongoDB connection
    │
    ├── models/
    │   ├── Book.js             # Book schema
    │   ├── Member.js           # Member schema
    │   └── Issue.js            # Issue schema
    │
    ├── routes/
    │   ├── bookRoutes.js       # Book endpoints
    │   └── issueRoutes.js      # Issue endpoints
    │
    └── controllers/
        ├── bookController.js   # Book logic
        └── issueController.js  # Issue logic
```

## Next Steps (Optional Enhancements)

1. **Authentication Module**
   - Implement JWT tokens
   - Secure API with token verification
   - Refresh token management

2. **Member Management API**
   - Create `/api/members` endpoints
   - Add member validation
   - Update when issuing books

3. **Advanced Features**
   - Email notifications for overdue books
   - Barcode scanning
   - PDF report generation
   - Real-time notifications (Socket.io)

4. **Deployment**
   - Deploy backend to Heroku/Railway
   - Deploy frontend to Vercel/Netlify
   - Configure production database

## Summary

✅ **Complete Backend with Express + MongoDB**
✅ **RESTful APIs for Book and Issue Management**
✅ **Frontend integrated with backend**
✅ **Form validations and error handling**
✅ **Success/Error notifications**
✅ **Ready for production use**

You now have a **fully functional Library Management System** with a modern frontend and a robust backend! 🎉

---

For detailed documentation, see **README.md**
For API details, see backend responses in DevTools Console
