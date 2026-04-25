import React, { useState } from "react";
import AuthCard from "../components/AuthCard";
import "./AuthPages.css";

export default function SignupPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSignup = (e) => {
    e.preventDefault();
    console.log("New User:", { name, email, password });
  };

  return (
    <AuthCard 
      title="Create Account 🌱"
      subtitle="Join AgriConnect today"
    >
      <form onSubmit={handleSignup}>
        
        <input 
          type="text" 
          placeholder="Full Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />

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

        <button className="auth-btn" type="submit">Create Account</button>

        <span 
          className="auth-link"
          onClick={() => window.location.href = "/login"}
        >
          Already have an account? Login
        </span>
      </form>
    </AuthCard>
  );
}
