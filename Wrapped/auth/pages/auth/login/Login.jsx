import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
function Login({ setToken }) {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false); // ✅ add this
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:5000/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      const result = await response.json();

      if (response.ok) {
        navigate("/verify", {
          state: { email: formData.email, token: result.token },
        });
      }
    } catch (error) {
      console.error(error.message);
    }
  };
  return (
    <div className="min-h-screen bg-[rgb(13,23,35)] flex items-center justify-center font-sans overflow-hidden relative">
      <div className="fixed w-96 h-96 bg-blue-500 rounded-full blur-[80px] opacity-20 -top-24 -left-24 pointer-events-none" />
      <div className="fixed w-72 h-72 bg-violet-500 rounded-full blur-[80px] opacity-20 -bottom-20 -right-20 pointer-events-none" />

      <div className="w-[420px] bg-white/[0.04] border border-white/10 rounded-3xl px-10 py-12 backdrop-blur-2xl shadow-[0_32px_80px_rgba(0,0,0,0.5)]">
        <div className="w-10 h-[3px] bg-gradient-to-r from-blue-500 to-violet-500 rounded-full mb-5" />

        <h1
          className="text-[2rem] font-semibold text-slate-100 tracking-tight mb-2"
          style={{ fontFamily: "'Playfair Display', serif" }}
        >
          Log In
        </h1>

        <form className="flex flex-col gap-5" onSubmit={handleSubmit}>
          <div>
            <label className="block text-[0.72rem] font-medium text-white/50 uppercase tracking-widest mb-2">
              Email Address
            </label>
            <div className="relative">
              <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-white/30 text-sm">
                ✉️
              </span>
              <input
                required
                onChange={handleInputChange}
                type="email"
                name="email"
                placeholder="jane@example.com"
                className="w-full pl-10 pr-4 py-3 bg-white/5 border border-white/10 rounded-xl text-slate-100 text-sm placeholder:text-white/20 outline-none focus:border-blue-500/60 focus:bg-blue-500/10 transition-all"
              />
            </div>
          </div>

          <div>
            <label className="block text-[0.72rem] font-medium text-white/50 uppercase tracking-widest mb-2">
              Password
            </label>
            <div className="relative">
              <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-white/30 text-sm">
                🔒
              </span>
              <input
                required
                onChange={handleInputChange}
                type={showPassword ? "text" : "password"} // ✅
                name="password"
                placeholder="Min. 8 characters"
                className="w-full pl-10 pr-10 py-3 bg-white/5 border border-white/10 rounded-xl text-slate-100 text-sm placeholder:text-white/20 outline-none focus:border-blue-500/60 focus:bg-blue-500/10 transition-all"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3.5 top-1/2 -translate-y-1/2 text-white/30 text-sm hover:text-white/60 transition-all"
              >
                {showPassword ? (
                  <i className="fa-regular fa-eye" />
                ) : (
                  <i className="fa-regular fa-eye-slash" />
                )}
              </button>
            </div>
          </div>

          <button
            type="submit"
            className="mt-2 w-full py-3.5 rounded-xl bg-gradient-to-r from-blue-500 to-violet-500 text-white text-sm font-medium tracking-wide hover:-translate-y-0.5 active:translate-y-0 transition-all"
          >
            login
          </button>
        </form>

        <p className="mt-6 text-center text-xs text-white/30">
          Don't have an account?{" "}
          <a href="#" className="text-blue-400 hover:underline">
            <button onClick={() => navigate("/signup")}>Signup</button>
          </a>
        </p>
      </div>
    </div>
  );
}

export default Login;
