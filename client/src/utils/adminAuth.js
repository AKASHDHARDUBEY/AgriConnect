// src/utils/adminAuth.js

export function adminLogin(email, password) {
  // TEMPORARY: Replace with real backend call
  if (email === "admin@agriconnect.com" && password === "admin123") {
    localStorage.setItem("isAdmin", "true");
    return { success: true };
  }
  return { success: false, message: "Invalid admin credentials" };
}

export function adminLogout() {
  localStorage.removeItem("isAdmin");
}

export function isAdminAuthenticated() {
  return localStorage.getItem("isAdmin") === "true";
}
