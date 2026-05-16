import React, { useRef, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";

function Verify({ setToken }) {
  const navigate = useNavigate();
  const { state } = useLocation();
  const email = state?.email;
  const inputs = useRef([]);
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const token = state?.token;

  const handleChange = (e, index) => {
    const value = e.target.value.slice(-1); // take last char in case of autofill
    if (!/^\d$/.test(value)) {
      e.target.value = otp[index]; // restore previous value
      return;
    }

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);
    e.target.value = value; // explicitly set DOM value

    if (inputs.current[index + 1]) {
      inputs.current[index + 1].focus();
    }
  };

  const handleKeyDown = (e, index) => {
    if (e.key === "Backspace") {
      if (otp[index] !== "") {
        // box has value — just clear it, stay on same box
        const newOtp = [...otp];
        newOtp[index] = "";
        setOtp(newOtp);
        e.target.value = "";
      } else if (index > 0) {
        // box is empty — go to previous and clear it
        const newOtp = [...otp];
        newOtp[index - 1] = "";
        setOtp(newOtp);
        inputs.current[index - 1].value = "";
        inputs.current[index - 1].focus();
      }
    }
  };
  const handleVerify = async () => {
    const code = otp.join("");

    if (code.length < 6) {
      alert("Please enter all 6 digits");
      return;
    }

    try {
      const res = await fetch("http://localhost:5000/api/auth/verify-otp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: email, code }), // replace with actual email
      });

      const data = await res.json();
      console.log("verify response:", data);
      if (res.ok) {
        await localStorage.setItem("token", data.token); // won't help but let's try
        console.log("token saved:", localStorage.getItem("token")); // ✅ check if it saved
        setToken(data.token);
        window.location.href = "/";

        // success — redirect or show success UI
        console.log(data.message); // "Email verified!"
        navigate("/");
      } else {
        alert(data.error); // "Invalid OTP", "OTP expired", etc.
      }
    } catch (err) {
      console.error("Network error:", err);
    }
  };

  const inputClass =
    "w-12 h-12 text-center bg-white/5 border border-white/10 rounded-xl text-slate-100 text-sm outline-none focus:border-blue-500/60 focus:bg-blue-500/10 transition-all";

  return (
    <>
      <div className="min-h-screen bg-[rgb(13,23,35)] flex items-center justify-center font-sans overflow-hidden relative">
        <div className="fixed w-96 h-96 bg-blue-500 rounded-full blur-[80px] opacity-20 -top-24 -left-24 pointer-events-none" />
        <div className="fixed w-72 h-72 bg-violet-500 rounded-full blur-[80px] opacity-20 -bottom-20 -right-20 pointer-events-none" />

        <div className="w-[420px] bg-white/[0.04] border border-white/10 rounded-3xl px-10 py-12 backdrop-blur-2xl shadow-[0_32px_80px_rgba(0,0,0,0.5)]">
          <div className="w-10 h-[3px] bg-gradient-to-r from-blue-500 to-violet-500 rounded-full mb-5" />

          <h1
            className="text-[2rem] font-semibold text-slate-100 tracking-tight mb-2"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            Verify Your Email
          </h1>

          <form
            className="flex flex-col gap-5"
            onSubmit={(e) => {
              e.preventDefault();
              const code = otp.join("");
              console.log("OTP submitted:", code);
            }}
          >
            <div className="flex gap-3 justify-center">
              {[0, 1, 2, 3, 4, 5].map((_, index) => (
                <input
                  key={index}
                  type="text"
                  maxLength={1}
                  className={inputClass}
                  ref={(el) => (inputs.current[index] = el)}
                  onChange={(e) => handleChange(e, index)}
                  onKeyDown={(e) => handleKeyDown(e, index)}
                />
              ))}
            </div>

            <button
              onClick={() => handleVerify()}
              type="button"
              className="mt-2 w-full py-3.5 rounded-xl bg-gradient-to-r from-blue-500 to-violet-500 text-white text-sm font-medium tracking-wide hover:-translate-y-0.5 active:translate-y-0 transition-all"
            >
              Proceed
            </button>
          </form>
        </div>
      </div>
    </>
  );
}

export default Verify;
