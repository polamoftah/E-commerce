import React, { useEffect, useState } from "react";
import style from "./Layout.module.css";
import Navbar from "../Navbar/Navbar";
import Footer from "../Footer/Footer";
import { Navigate, Outlet, useLocation } from "react-router-dom";

export default function Layout() {
  return (
    <>
      <Navbar />
      <div className="container  mx-auto py-20">
        <Outlet />
      </div>
      <Footer />
    </>
  );
}
