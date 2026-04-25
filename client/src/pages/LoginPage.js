import React, { useState } from "react";
import AuthCard from "../components/AuthCard";
import "./AuthPages.css";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();
    console.log("User Login:", { email, password });
  };

  return (
    <AuthCard 
      title="Welcome Back 👋"
      subtitle="Login to continue"
    >
      <form onSubmit={handleLogin}>
        <input 
          type="email" 
          placeholder="Email Address"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <input 
          type="password" 
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <button className="auth-btn" type="submit">Login</button>

        <span 
          className="auth-link"
          onClick={() => window.location.href = "/signup"}
        >
          Don't have an account? Sign Up
        </span>
      </form>
    </AuthCard>
  );
}
