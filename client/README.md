## YouTube CapeStone

A full-stack YouTube Clone built using **React**, **Node.js (Express)**, **MongoDB**, and **JWT** for authentication. This app allows users to register/login, create channels, upload videos, add comments, and view content dynamically.

---

## ScreenShots and Video has been Added 
- Look for the Screen Shot folder at [YouTube Capstone at root]



## 🚀 Features

- 🔐 User Authentication (Register / Login using JWT)
- 📺 Video Upload and Display
- 💬 Comment System
- 🧑‍💼 Channel Creation (One per user)
- 🔍 Video Search
- 🖼 Thumbnail Previews
- 🧭 Responsive UI with Sidebar + Header
- 📁 Image URL-based preview support

---

## 🛠 Tech Stack

**Frontend**
- React
- Axios
- Tailwind CSS (for styling)
- React Router DOM

**Backend**
- Node.js
- Express.js
- MongoDB & Mongoose
- JWT Authentication
- dotenv

---

## ⚙️ Getting Started

### 🔧 Backend Setup

1. **Clone the repo:**
   --- bash
   git clone `https://github.com/ayuuusssh/YouTubeCapeStone.git`
   cd youtube-clone/backend
Install dependencies:

- bash
- npm install
- Create .env file:

- .env
- PORT=5175
- MONGO_URI=mongodb://localhost:27017/youtube_clone
- JWT_SECRET=your_jwt_secret_key

- bash
- node seed.js
- Run the server:

- bash
- npm run dev

#  Frontend Setup
Go to frontend folder:

- bash
- cd ../frontend
- Install dependencies:

- bash
- npm install
- Run frontend:

- bash
- npm run dev
- Frontend runs at http://localhost:5173 and connects to the backend at http://localhost:5175.

## Authentication
After Register/Login, JWT token is saved in localStorage

Axios includes the token with each request using:

- js
- axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
- Image Support
- Videos and channel banners can use external image URLs

These are rendered directly from valid URLs (like from YouTube thumbnails)

## Folder Structure
- bash
.
├── backend
│   ├── controllers
│   ├── models
│   ├── routes
│   ├── middleware
│   ├── seed.js
│   └── server.js
├── frontend
│   ├── components
│   ├── pages
│   ├── App.jsx
│   ├── main.jsx
│   └── index.css
└── README.md

#### Auth APIs

## Register a User
- Method: POST

- URL: http://localhost:5175/api/auth/register
- Body (JSON):
{
  "username": "john123",
  "email": "john@example.com",
  "password": "123456"
}
## Login a User
- Method: POST

- URL: http://localhost:5175/api/auth/login

- Body (JSON):
{
  "email": "john@example.com",
  "password": "123456"
}
- Get token from response and set it in Authorization header for protected routes:
- Authorization: Bearer <your-token>

-  Video APIs
## Upload a Video
- Method: POST

- URL: http://localhost:5175/api/videos
- Headers:
- Authorization: Bearer <token>
- Body (JSON):
{
  "title": "Intro to React",
  "description": "Beginner React tutorial",
  "thumbnailUrl": "https://example.com/thumb.jpg",
  "videoUrl": "https://example.com/video.mp4"
}
## Get All Videos
- Method: GET

- URL: http://localhost:5175/api/videos

## Get Video by ID
- Method: GET

- URL: http://localhost:5175/api/videos/<videoId>

- Comments APIs
## Add Comment to a Video
Method: POST

- URL: http://localhost:5175/api/comments
- Headers:
- Authorization: Bearer <token>
- Body (JSON):
{
  "text": "Great video!",
  "videoId": "yourVideoId"
}
## Delete a Comment
- Method: DELETE

- URL: http://localhost:5175/api/comments/<commentId>
- Headers:
- Authorization: Bearer <token>

- Channel APIs
## Create Channel
- Method: POST

- URL: http://localhost:5175/api/channels
- Headers:
- Authorization: Bearer <token>
- Body (JSON):
{
  "channelName": "Code with John",
  "description": "Tech tutorials and coding",
  "channelBanner": "https://example.com/banner.jpg"
}

## Get Your Channel
- Method: GET

- URL: http://localhost:5175/api/channels
- Headers:
- Authorization: Bearer <token>
## MongoDB

- Edit Environmental Variable
- bash
- C:\Users\ayush\VS Code Intern\MongoDBData\data\db>mongod --dbpath="C:\Users\ayush\VS Code Intern\MongoDBData\data\db"
- Running inside cmd Windows+R
