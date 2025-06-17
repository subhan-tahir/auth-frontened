import React from "react";
import { Route, Routes } from "react-router-dom";
import Home from "../pages/Home";
import About from "../pages/About";
import MoreInfo from "../pages/MoreInfo";
import Products from "../pages/Products";
import CardDetailPage from "../pages/CardDetailPage";
import ErrorPage from "../pages/ErrorPage";
import SignUp from "../pages/SignUp";
import Login from "../pages/Login";
import Private from "../Private";
import Header from "../Header";
import VerifyEmailPage from "../pages/VerifyEmail";

const Router = () => {
  return (
    <Routes>
      {/* Public Routes */}
      <Route path="/signup" element={<SignUp />} />
      <Route path="/login" element={<Login />} />
      <Route path="header" element={<Header />} />
      <Route path="/verify-email" element={<VerifyEmailPage />} />

      {/* Private Routes */}
      <Route element={<Private />}>
        <Route path="/header" element={<Header />} />
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/about/moreInfo" element={<MoreInfo />} />
        <Route path="/products" element={<Products />} />
        <Route
          path="/productdetailpage/:cardTitle"
          element={<CardDetailPage />}
        />
      </Route>

      {/* Catch-All Route */}
      <Route path="*" element={<ErrorPage />} />
    </Routes>
  );
};

export default Router;
