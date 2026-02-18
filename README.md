# 📚 Library Management System

A complete library management system with React-like frontend and Node.js + MongoDB backend.

## Project Structure

```
library-management/
├── frontend/          # Frontend application
│   ├── index.html    # Login page
│   ├── dashboard.html
│   ├── css/          # Stylesheets
│   ├── js/           # JavaScript modules
│   ├── maintenance/  # Maintenance pages
│   ├── transactions/ # Transaction pages
│   ├── reports/      # Reports page
│   └── server.js     # Frontend server
│
└── backend/          # Backend API Server
    ├── models/       # Mongoose models
    ├── routes/       # API routes
    ├── controllers/  # Business logic
    ├── config/       # Configuration
    ├── server.js     # Express server
    ├── package.json
    └── .env
```

## Prerequisites

- **Node.js** (v14 or higher) - [Download](https://nodejs.org/)
- **MongoDB** (Local or Cloud) - [MongoDB Community](https://www.mongodb.com/try/download/community) or [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)

## Installation & Setup

### 1. **Install Node Modules (Both Frontend & Backend)**

#### Frontend:
```bash
cd library-management
npm install
```

#### Backend:
```bash
cd library-management/backend
npm install
```

### 2. **Configure MongoDB**

#### Option A: Local MongoDB
Make sure MongoDB is running locally on `localhost:27017`

```bash
# On Windows
mongod

# On Mac/Linux
mongod --dbpath /path/to/data
```

#### Option B: MongoDB Atlas (Cloud)
1. Create account at [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Create a cluster
3. Get connection string
4. Update `.env` in backend folder:
   ```
   MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/library-management
   ```

## Running the Application

### **Terminal 1: Start Backend Server**

```bash
cd library-management/backend
npm install  # First time only
npm start    # or: node server.js
```

Expected output:
```
╔════════════════════════════════════════╗
║   📚 Library Management System 📚      ║
║          Backend Server Running        ║
║   Server: http://localhost:5000        ║
║   MongoDB: Configured                  ║
╚════════════════════════════════════════╝
```

### **Terminal 2: Start Frontend Server**

```bash
cd library-management
npm install  # First time only
npm start    # or: node server.js
```

Expected output:
```
🎉 Server running at http://localhost:3000
📚 Library Management System is ready!
```

### **Terminal 3 (Optional): Open Application**

Open your browser and navigate to:
```
http://localhost:3000
```

## Features

### Authentication
- Login with role-based access control
- Three user roles: Admin, Librarian, Member
- Session management using localStorage

### Maintenance Module
- ✅ Add/Update Membership
- ✅ Add/Update Books (Books & Movies)
- ✅ User Management

### Transactions Module
- ✅ Issue Book - with automatic due date calculation
- ✅ Return Book - with fine calculation (Rs. 10/day)
- ✅ Pay Fine - payment tracking

### Reports & Analytics
- 📊 Library Reports
- 📈 Charts & Visualizations

## API Endpoints

### Books
- `POST /api/books/add` - Add new book
- `GET /api/books/all` - Get all books
- `GET /api/books/:id` - Get book by ID
- `GET /api/books/search?query=...` - Search books
- `PUT /api/books/:id` - Update book
- `DELETE /api/books/:id` - Delete book

### Issues
- `POST /api/issues/issue` - Issue a book
- `POST /api/issues/return` - Return a book
- `POST /api/issues/pay-fine` - Pay fine
- `GET /api/issues/all` - Get all issues
- `GET /api/issues/active` - Get active issues
- `GET /api/issues/:id` - Get issue by ID

## Test Credentials

### Admin Login
- **Username:** admin
- **Password:** (any password)

### Librarian Login
- **Username:** librarian
- **Password:** (any password)

### Member Login
- **Username:** (any username)
- **Password:** (any password)

## Technology Stack

### Frontend
- HTML5, CSS3, JavaScript (ES6+)
- No external frameworks (Vanilla JS)
- LocalStorage for session management
- Responsive design (Mobile, Tablet, Desktop)

### Backend
- **Server:** Node.js + Express.js
- **Database:** MongoDB + Mongoose
- **Authentication:** JWT (ready for implementation)
- **Middleware:** CORS, Body Parser

## Database Models

### Book
```javascript
{
  title: String,
  author: String,
  isbn: String,
  category: String,
  itemType: String (Book/Movie/Magazine),
  totalCopies: Number,
  availableCopies: Number,
  publishYear: Number,
  publisher: String
}
```

### Member
```javascript
{
  memberNumber: String,
  firstName: String,
  lastName: String,
  email: String,
  phone: String,
  address: String,
  city: String,
  membershipType: String,
  membershipStatus: String,
  membershipStartDate: Date,
  membershipEndDate: Date,
  maxBooksAllowed: Number,
  currentBooksIssued: Number,
  totalFine: Number
}
```

### Issue
```javascript
{
  issueNumber: String,
  bookId: ObjectId,
  memberId: ObjectId,
  issueDate: Date,
  dueDate: Date,
  returnDate: Date,
  status: String (Issued/Returned/Overdue),
  fine: Number,
  finePaid: Boolean
}
```

## Troubleshooting

### "Cannot connect to MongoDB"
- Ensure MongoDB is running
- Check connection string in `.env`
- Verify MongoDB URI is correct

### "Cannot GET /dashboard.html"
- Make sure frontend server is running on port 3000
- Check that you're accessing `http://localhost:3000`

### "API not responding"
- Ensure backend server is running on port 5000
- Check backend console for errors
- Verify MongoDB connection

### "Port already in use"
- Change port in `.env` or `server.js`
- Or kill the process using the port:
  ```bash
  # Windows
  netstat -ano | findstr :5000
  taskkill /PID <PID> /F
  
  # Mac/Linux
  lsof -i :5000
  kill -9 <PID>
  ```

## Future Enhancements

- [ ] Advanced authentication with JWT
- [ ] Email notifications for overdue books
- [ ] SMS alerts
- [ ] Mobile app (React Native)
- [ ] Advanced reporting & analytics
- [ ] Barcode scanning
- [ ] Recommendation system

## Support & Documentation

For issues or questions, please check the console logs and verify:
1. Both servers are running
2. MongoDB is accessible
3. Ports 3000 and 5000 are available
4. Network connectivity is stable

## License

This project is open source and available for educational purposes.

---

Happy Learning! 📚✨
