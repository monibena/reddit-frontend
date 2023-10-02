import React from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import App from "./App.jsx";
import "./index.css";
import Login from "./components/Login.jsx";
import Register from "./components/Register.jsx";
import Post from "./components/Post.jsx";
import Subreddits from "./components/Subreddits.jsx";
import Home from "./components/Home.jsx";
import CreatePost from "./components/CreatePost.jsx";
import Subreddit from "./components/Subreddit.jsx";
import EditPost from "./components/EditPost.jsx";
import PageNotFound from "./components/PageNotFound.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { path: "/", element: <Home /> },
      { path: "login", element: <Login /> },
      { path: "register", element: <Register /> },
      { path: "submit", element: <CreatePost /> },
      { path: "subreddits", element: <Subreddits /> },
      { path: "subreddits/:subredditId", element: <Subreddit /> },
      { path: "posts/:postId", element: <Post /> },
      { path: "editPosts/:postId", element: <EditPost /> },
      { path: "*", element: <PageNotFound /> }, //wildcard symbol
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
