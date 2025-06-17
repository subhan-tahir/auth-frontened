import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { Navigate, Outlet, useNavigate } from "react-router-dom";

const Private = ({ children: component }) => {
  const navigate = useNavigate();
  const tokenInJson = localStorage.getItem("token");
const [isAuthenticated, setIsAuthenticated] = useState(false);
  let token, exptime;

  if (tokenInJson) {
    try {
      const parsed = JSON.parse(tokenInJson);
      token = parsed.token;
      exptime = parsed.exptime;
    } catch (error) {
      console.error("Invalid token format in localStorage");
      localStorage.removeItem("token");
      return <Navigate to="/login" />;
    }
  }

  const publicRoutes = ["/login", "/signup"];

  if (token && publicRoutes.includes(window.location.pathname)) {
    navigate("/");
  }

  if (!token && !publicRoutes.includes(window.location.pathname)) {
    navigate("/login");
  }

  if (token && exptime) {
    const currentTime = new Date().getTime();
    if (currentTime > exptime) {
      localStorage.removeItem("token");
      console.log("Token has expired");
      navigate("/login");
    } else {
      console.log("Token is still valid");
    }
  }
useEffect(() => {
  console.log(token);
})
  return <>{token ? <Outlet /> : <Navigate to="/login" />}</>;
};

export default Private;
