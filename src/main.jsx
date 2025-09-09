import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider, Navigate } from "react-router-dom";
import Login from "./pages/Login.jsx";
import Register from "./pages/Register.jsx";
import Home from "./pages/Home.jsx";
import "./index.css";

const router = createBrowserRouter([
  { path: "/", element: <Home />, errorElement: <Navigate to="/login" replace /> },

  { path: "/login", element: <Login /> },
  { path: "/register", element: <Register /> },

  { path: "*", element: <Navigate to="/login" replace /> },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
