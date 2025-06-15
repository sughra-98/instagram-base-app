# Instagram Base App

## Overview

This project is a simplified Instagram-like social media platform built with React and Firebase. Users can sign up, log in, create posts with images and captions, chat with other users, and view a news feed of posts. The app demonstrates core social features and real-time updates using Firebase Realtime Database.

## Features

- User authentication (Sign Up & Login)
- Create posts with image uploads and captions
- Real-time news feed displaying all posts
- User profile with avatar and details
- Sidebar navigation
- Real-time chat between users
- Responsive and modern UI

## Technology Used

- **React** (with Vite)
- **Firebase** (Authentication, Realtime Database)
- **React Router**
- **FontAwesome** (icons)

## Installation

1. **Clone the repository:**
   ```sh
   git clone https://github.com/sughra-98/instagram-base-app
   cd instagram-base-app
   ```

2. **Install dependencies:**
   ```sh
   npm install
   ```

3. **Set up Firebase:**
   - Create a Firebase project at [Firebase Console](https://console.firebase.google.com/).
   - Enable Authentication and Realtime Database.
   - Copy your Firebase config to a `.env` file (see `.env` in the repo for variable names).

4. **Run the development server:**
   ```sh
   npm run dev
   ```
   Open [http://localhost:5173](http://localhost:5173) in your browser.

## Project Structure

```
.
├── index.html
├── package.json
├── vite.config.js
├── .env
├── src/
│   ├── App.jsx
│   ├── App.css
│   ├── main.jsx
│   ├── index.css
│   ├── firebase.jsx
│   └── component/
│       ├── Authform.jsx
│       ├── Authform.css
│       ├── Createpost.jsx
│       ├── Createpost.css
│       ├── NewsFeed.jsx
│       ├── Profile.jsx
│       ├── Sidebar.jsx
│       ├── SidebarData.js
│       ├── Chat.jsx
│       ├── Chat.css
│       └── Chat/
│           ├── Chat.jsx
│           ├── Chats.jsx
│           ├── Input.jsx
│           ├── Message.jsx
│           ├── Messages.jsx
│           ├── Navbar.jsx
│           ├── Search.jsx
│           └── Sidebar.jsx
└── README.md
```

## Contact

For questions or feedback, please contact:

- **Sughra Hassan**  
- Email: [Sughraa.Hassan@gmail.com](mailto:Sughraa.Hassan@gmail.com)
