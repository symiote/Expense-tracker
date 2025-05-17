import { useState } from "react";
import axios from "axios";
import { validateEmail } from "../../utils/helper";
import axiosInstance from "../../utils/axiosInstance";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [msg, setMsg] = useState("");
  const [error, setError] = useState(null);
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateEmail(email)) {
      setError("Please Enter a valid email address.");
      return;
    }

    try {
      const res = await axiosInstance.post("/api/v1/auth/forgot-password", { email });
      setMsg(res.data.message);
      setEmail("");
      setError("");
    } catch (err) {
      setMsg(err.response?.data?.message || "Failed to send reset link.");
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-md mx-auto mt-10 p-6 bg-white shadow-lg rounded-2xl space-y-4"
    >
      <h2 className="text-2xl font-semibold text-center text-gray-800">
        Forgot Password
      </h2>

      <input
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        type="email"
        placeholder="Enter your email"
        required
        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
      />

      <button
        type="submit"
        className="w-full bg-blue-600 hover:bg-violet-900 text-white font-semibold py-2 rounded-lg transition duration-300"
      >
        Send Reset Link
      </button>

      {error && <p className="text-red-500 text-xs pb-2.5">{error}</p>}

      {msg && (
        <p className="text-center text-sm text-green-600 font-medium">{msg}</p>
      )}
    </form>
  );
}
