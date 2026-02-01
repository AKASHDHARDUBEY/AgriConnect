import React, { useState } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import { UserProvider } from "./context/UserContext";
import { HelmetProvider } from "react-helmet-async";
import "./App.css";

/* USER COMPONENTS */
import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";
import TopBar from "./components/TopBar";

/* USER PAGES */
import Home from "./pages/Home";
import LandingHero from "./components/LandingHero";
import Marketplace from "./pages/Marketplace";
import UploadPage from "./pages/UploadPage";
import MyAdsPage from "./pages/MyAdsPage";

/* AUTH PAGES */
import Login from "./components/Login";
import SignupPage from "./pages/SignupPage";
import AdminLogin from "./pages/AdminLogin";

/* ADMIN PAGES */
import AdminDashboard from "./pages/AdminDashboard";
import AdminManageListings from "./pages/AdminManageListings";

/* ADMIN SYSTEM */
import AdminProtectedRoute from "./components/AdminProtectedRoute";
import AdminLayout from "./layouts/AdminLayout";


/* --------------------------- USER MAIN LAYOUT --------------------------- */
function MainLayout({ children, searchTerm, setSearchTerm }) {
  return (
    <div className="app-layout">
      <Sidebar />

      <main className="app-main">
        <TopBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />

        <div className="page-area">
          {children}
        </div>
      </main>
    </div>
  );
}


/* ------------------------------ ROOT APP ------------------------------ */
export default function App() {
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();

  const handleCropAdded = () => {
    navigate("/");
  };

  return (
    <HelmetProvider>
      <UserProvider>
        <div className="App">

          {/* NAVBAR ALWAYS VISIBLE */}
          <Navbar />

          <Routes>
            {/* ... routes ... */}
            {/* ================= USER ROUTES ================= */}

            {/* HOME */}
            <Route
              path="/"
              element={
                <MainLayout
                  searchTerm={searchTerm}
                  setSearchTerm={setSearchTerm}
                >
                  <>
                    <LandingHero />
                    <Marketplace searchTerm={searchTerm} />
                  </>
                </MainLayout>
              }
            />

            {/* UPLOAD PAGE */}
            <Route
              path="/upload"
              element={
                <MainLayout
                  searchTerm={searchTerm}
                  setSearchTerm={setSearchTerm}
                >
                  <UploadPage onCropAdded={handleCropAdded} />
                </MainLayout>
              }
            />

            {/* MY ADS PAGE */}
            <Route
              path="/myads"
              element={
                <MainLayout
                  searchTerm={searchTerm}
                  setSearchTerm={setSearchTerm}
                >
                  <MyAdsPage />
                </MainLayout>
              }
            />


            {/* ================= AUTH ROUTES (NO SIDEBAR) ================= */}

            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<SignupPage />} />
            <Route path="/admin" element={<AdminLogin />} />


            {/* ================= ADMIN PROTECTED ROUTES ================= */}

            {/* Admin Dashboard */}
            <Route
              path="/admin/dashboard"
              element={
                <AdminProtectedRoute>
                  <AdminLayout>
                    <AdminDashboard />
                  </AdminLayout>
                </AdminProtectedRoute>
              }
            />

            {/* Admin Manage Listings */}
            <Route
              path="/admin/listings"
              element={
                <AdminProtectedRoute>
                  <AdminLayout>
                    <AdminManageListings />
                  </AdminLayout>
                </AdminProtectedRoute>
              }
            />


            {/* ================= FALLBACK ROUTE ================= */}
            <Route
              path="*"
              element={
                <MainLayout
                  searchTerm={searchTerm}
                  setSearchTerm={setSearchTerm}
                >
                  <>
                    <LandingHero />
                    <Marketplace searchTerm={searchTerm} />
                  </>
                </MainLayout>
              }
            />

          </Routes>


          {/* FOOTER of the website */}
          <footer className="app-footer">
            <p>© 2024 AgriConnect - Connecting Farmers, Buyers & Communities</p>
          </footer>

        </div>
      </UserProvider>
      );
}
