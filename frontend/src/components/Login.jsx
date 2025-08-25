import React, { useState } from "react";

const Login = ({ onLogin, onSignup }) => {
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Login failed");
      localStorage.setItem("token", data.token);
      onLogin();
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 font-roboto">
      {/* ✅ Same size as signup but no image */}
      <div className="bg-white rounded-lg shadow-lg w-full max-w-2xl border border-gray-200 px-12 py-10">
        <img
          src="https://www.google.com/images/branding/googlelogo/2x/googlelogo_color_92x30dp.png"
          alt="Google Logo"
          className="w-28 mb-6"
        />
        <h2 className="text-2xl font-normal mb-2 text-gray-800">Log in</h2>
        <p className="text-gray-500 mb-8 text-sm">to continue to Gmail</p>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <input
            name="email"
            value={form.email}
            onChange={handleChange}
            placeholder="Email"
            type="email"
            className="px-4 py-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
            required
          />
          <input
            name="password"
            value={form.password}
            onChange={handleChange}
            placeholder="Password"
            type="password"
            className="px-4 py-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
            required
          />
          {error && <div className="text-red-500 text-sm">{error}</div>}
          <button
            type="submit"
            className="bg-[#1a73e8] hover:bg-[#1765c1] text-white font-medium py-2 rounded shadow mt-2 tracking-wide"
          >
            Next
          </button>
        </form>

        <div className="flex items-center my-6">
          <div className="flex-1 h-px bg-gray-200" />
          <span className="mx-2 text-gray-400 text-xs">or</span>
          <div className="flex-1 h-px bg-gray-200" />
        </div>

        <p className="text-xs text-gray-500">
          Don&apos;t have an account?{" "}
          <button
            type="button"
            className="text-blue-500 underline hover:text-blue-700 focus:outline-none"
            onClick={onSignup}
          >
            Sign up
          </button>
        </p>
      </div>
    </div>
  );
};

export default Login;
