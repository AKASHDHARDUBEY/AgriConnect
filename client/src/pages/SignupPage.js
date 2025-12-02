import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import AuthCard from "../components/AuthCard";
import "./AuthPages.css";

export default function SignupPage() {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSignup = async (e) => {
    e.preventDefault();
    try {
      const apiUrl = process.env.REACT_APP_API_URL || 'http://localhost:5001';
      const response = await axios.post(`${apiUrl}/auth/signup`, {
        name,
        email,
        password
      }, { withCredentials: true });

      if (response.data.status === 'success') {
        alert('Account created successfully!');
        navigate('/'); // Redirect to home/dashboard
      }
    } catch (err) {
      alert(err.response?.data?.message || 'Signup failed. Please try again.');
    }
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
          onClick={() => navigate("/login")}
        >
          Already have an account? Login
        </span>
      </form>
    </AuthCard>
  );
}
