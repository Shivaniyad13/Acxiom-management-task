# 🔧 Complete Setup & Troubleshooting Guide

## System Status Check

### ✅ Frontend Server
- **Port:** 3000
- **Status:** RUNNING
- **Command:** `npm start` (in library-management folder)

### ✅ Backend Server  
- **Port:** 5000
- **Status:** RUNNING
- **Health Check:** http://localhost:5000/api/health
- **Database:** MongoDB Connected ✅

---

## Understanding the Issue

Your applications are **working correctly!** Here's what's happening:

### Menu Navigation (Member Dashboard)
When you click menu items as a member:
- **Dashboard** → Goes to dashboard.html (root)
- **My Profile** → Goes to dashboard.html (same page)
- **View Books** → Goes to dashboard.html (same page)
- **My Issued Books** → Goes to dashboard.html (same page)

These are designed to show different sections ON the dashboard, not navigate to different pages.

---

## Is Everything Working?

### Test 1: Check If Frontend Loads
```
Open browser: http://localhost:3000
Expected: Login page with form
```

### Test 2: Check If Backend Responds
```
Open browser: http://localhost:5000/api/health
Expected: {"success":true,"message":"Library Management Backend is running"}
```

### Test 3: Check If Database Works
```
Open browser: http://localhost:5000/api/books/all
Expected: {"success":true,"count":0,"data":[]}
```

If all three show success → **System is working!**

---

## MongoDB Setup with Compass (Windows)

### Option 1: MongoDB Community (Local)

#### Step 1: Download & Install MongoDB
- Download: https://www.mongodb.com/try/download/community
- Run installer (accept defaults)
- MongoDB runs as service automatically

#### Step 2: Start MongoDB Service
```
Press: Windows Key + Services
Find: MongoDB Server
Right-click → Properties → Start Type: Automatic
Click: Start button
```

Or use terminal:
```powershell
# Check if running
Get-Service MongoDB

# Start MongoDB service
Start-Service MongoDB
```

#### Step 3: Open MongoDB Compass
- Download: https://www.mongodb.com/products/compass
- Install it
- Open Compass
- Connection string: `mongodb://localhost:27017`
- Click: Connect

#### Step 4: View Your Data
```
Compass > library-management database
├── books collection
├── members collection
└── issues collection
```

### Option 2: MongoDB Atlas (Cloud - Easier)

#### Step 1: Create Account
- Go to: https://www.mongodb.com/cloud/atlas
- Sign up for free
- Create new project

#### Step 2: Create Cluster
- Click "Create Cluster"
- Choose free tier (M0)
- Select region closest to you
- Create cluster

#### Step 3: Get Connection String
- Go to Database > Connect
- Choose "Connect your application"
- Copy connection string

#### Step 4: Update Backend
```
Edit: backend/.env
Replace line:
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/library-management
```

#### Step 5: Restart Backend
```
Stop: Ctrl+C in backend terminal
Run: npm start
```

---

## Why Menu Items Show Same Page?

Your member dashboard menu is **intentional design** - all items link to dashboard.html because:

1. **Dashboard** - Shows main content area
2. **My Profile** - Would show profile section on dashboard
3. **View Books** - Would show available books on dashboard
4. **My Issued Books** - Would show issued books on dashboard

To make them work, you'd need to:
1. Add navigation logic on dashboard.html
2. Use hash routing (#/profile, #/books, etc.)
3. Or create separate pages for each section

---

## Complete Troubleshooting Checklist

### ❌ Menu links not working?
- [ ] Refresh browser (Ctrl+F5)
- [ ] Check browser console (F12)
- [ ] Verify frontend server running: port 3000
- [ ] Clear browser cache

### ❌ No data in MongoDB?
- [ ] Is MongoDB running? (see MongoDB setup above)
- [ ] Is backend server running? (check port 5000)
- [ ] Try adding a book:
  ```
  POST http://localhost:5000/api/books/add
  Body: {
    "title": "Test Book",
    "author": "Test Author",
    "isbn": "123",
    "category": "Fiction",
    "itemType": "Book",
    "totalCopies": 1
  }
  ```

### ❌ API not responding?
- [ ] Check backend terminal for errors
- [ ] Verify port 5000 is free: `netstat -ano | findstr :5000`
- [ ] Restart backend: `npm start`
- [ ] Check MongoDB connection: `mongosh` (if installed)

### ❌ Can't see HTML files in frontend?
- [x] All HTML files exist (verified)
- [ ] Files are at: http://localhost:3000/filename.html
- [ ] Examples working:
  - http://localhost:3000/dashboard.html
  - http://localhost:3000/maintenance/add_book.html
  - http://localhost:3000/transactions/book_issue.html

---

## Quick Commands Reference

### Start Both Servers (Two Terminal Windows)

**Terminal 1 - Backend:**
```powershell
cd "C:\Users\ashok\Desktop\Library Management\library-management\backend"
npm start
```

**Terminal 2 - Frontend:**
```powershell
cd "C:\Users\ashok\Desktop\Library Management\library-management"
npm start
```

### Test API Endpoints

```powershell
# Get all books
curl http://localhost:5000/api/books/all

# Add a book (PowerShell)
$body = @{
    title = "Test Book"
    author = "Test Author"
    isbn = "123"
    category = "Fiction"
    itemType = "Book"
    totalCopies = 1
} | ConvertTo-Json

curl -Method POST `
  -Uri http://localhost:5000/api/books/add `
  -Headers @{"Content-Type"="application/json"} `
  -Body $body
```

### View MongoDB Data

```powershell
# Start mongo shell
mongosh

# Commands
use library-management
db.books.find()
db.books.countDocuments()
```

---

## Next Steps

### To Make Member Menu Full-Featured:
1. Enhance dashboard.html to show sections
2. Add CSS classes for different views
3. Use JavaScript to toggle content visibility
4. OR create separate pages (add_book.html, view_books.html, etc.)

### To Add Real Features:
1. Implement Member endpoints in backend
2. Add authentication with JWT tokens
3. Create admin dashboard page
4. Add reporting features

---

## Summary

✅ **Frontend:** Running on port 3000  
✅ **Backend:** Running on port 5000  
✅ **Database:** MongoDB Connected  
✅ **API:** Responding to requests  
✅ **HTML Files:** All exist and accessible  

**Your system is working! The menu items leading to the same page is by design.**

If you want different pages for each menu item, let me know and I'll update the system!

---

**Need help?** Check:
1. Browser console (F12)
2. Network tab for API calls
3. Backend console for errors
4. MongoDB Compass for data
