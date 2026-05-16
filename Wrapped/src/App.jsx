import { useState, useEffect } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import HeaderSection from "./sections/Header";
import Tutorial from "./sections/Tutorial";
import FileInput from "./sections/FileInput";
import Login from "../auth/pages/auth/login/Login";
import Signup from "../auth/pages/auth/signup/Signup";
import Verify from "../auth/pages/auth/verify/Verify";

function MainPage() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      const token = localStorage.getItem("token");
      const response = await fetch("http://localhost:5000/user/me", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await response.json();
      setUser(data);
    };

    fetchUser();
  }, []);

  return (
    <main className="bg-[rgb(13,23,35)] h-[375vh]">
      <HeaderSection />
      <Tutorial />
      <FileInput />
    </main>
  );
}

function App() {
  const [token, setToken] = useState(localStorage.getItem("token"));

  return (
    <Routes>
      <Route
        path="/"
        element={token ? <MainPage /> : <Navigate to="/signup" />}
      />
      <Route
        path="/login"
        element={!token ? <Login setToken={setToken} /> : <Navigate to="/" />}
      />
      <Route
        path="/signup"
        element={!token ? <Signup setToken={setToken} /> : <Navigate to="/" />}
      />
      <Route path="/verify" element={<Verify setToken={setToken} />} />
    </Routes>
  );
}

export default App;
