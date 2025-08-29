"use client";
import { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    setLoading(true);
    try {
      await axios.post("/api/users/forgotpassword", { email });
      toast.success("Reset link sent to your email");
    } catch (error: any) {
      toast.error(error.response?.data?.error || "Error sending email");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <h1>Forgot Password</h1>
      <input
        type="email"
        placeholder="Enter your email"
        className="p-2 border rounded mb-4"
        value={email}
        onChange={e => setEmail(e.target.value)}
      />
      <button
        onClick={handleSubmit}
        className="bg-blue-500 text-white px-4 py-2 rounded"
        disabled={loading}
      >
        {loading ? "Sending..." : "Send Reset Link"}
      </button>
    </div>
  );
}