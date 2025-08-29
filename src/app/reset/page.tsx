"use client";
import { useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import axios from "axios";
import toast from "react-hot-toast";

export default function ResetPasswordPage() {
  const [newPassword, setNewPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const searchParams = useSearchParams();
  const router = useRouter();
  const token = searchParams.get("token");

  const handleSubmit = async () => {
    setLoading(true);
    try {
      await axios.post("/api/users/reset", { token, newPassword });
      toast.success("Password reset successful");
      router.push("/login");
    } catch (error: any) {
      toast.error(error.response?.data?.error || "Error resetting password");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <h1>Reset Password</h1>
      <input
        type="password"
        placeholder="Enter new password"
        className="p-2 border rounded mb-4"
        value={newPassword}
        onChange={e => setNewPassword(e.target.value)}
      />
      <button
        onClick={handleSubmit}
        className="bg-green-500 text-white px-4 py-2 rounded"
        disabled={loading}
      >
        {loading ? "Resetting..." : "Reset Password"}
      </button>
    </div>
  );
}