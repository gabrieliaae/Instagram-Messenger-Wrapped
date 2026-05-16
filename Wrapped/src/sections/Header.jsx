import { useState, useEffect } from "react";

function HeaderSection() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      const token = localStorage.getItem("token");
      console.log("Token:", token); // check it looks right

      const response = await fetch("http://localhost:5000/user/me", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      console.log("Status:", response.status); // is it still 401?
      const data = await response.json();
      console.log("Response data:", data); // what does the server actually return?

      setUser(data);
    };

    fetchUser();
  }, []);
  const handleLogout = () => {
    localStorage.removeItem("token");
    window.location.href = "/login"; // forces full page reload so App re-reads token
  };
  return (
    <div className="relative min-h-screen overflow-hidden bg-[rgb(13,23,35)]">
      <header className="w-screen h-screen flex justify-center relative">
        <nav className="text-white h-15 flex items-center justify-center w-[95%] mt-3 px-8  top-3 z-10 sticky ">
          {/* Left — logo with flex-1 */}
          <div className="flex-1">
            <div className="font-bold text-2xl border-2 border-white p-3 rounded-2xl w-fit">
              Wrapped <i className="fa-regular fa-message"></i>
            </div>
          </div>

          {/* Center — nav buttons */}
          <div className="flex gap-4">
            <button
              onClick={() =>
                document
                  .getElementById("tutorial")
                  .scrollIntoView({ behavior: "smooth" })
              }
              className="px-6 py-2.5 rounded-full ml-20 text-sm font-medium bg-[rgb(60,30,100)] text-white hover:bg-[rgb(120,40,100)] transition-all duration-200"
            >
              Tutorial
            </button>
            <button
              onClick={() =>
                document
                  .getElementById("download")
                  .scrollIntoView({ behavior: "smooth" })
              }
              className="px-6 py-2.5 rounded-full text-sm font-medium bg-[rgb(100,30,80)] text-white hover:bg-[rgb(80,40,120)] transition-all duration-200"
            >
              Download
            </button>
          </div>

          {/* Right — login buttons with flex-1 */}
          {user && (
            <div className="flex-1 flex gap-3 justify-end items-center text-2xl ">
              <i className="fa-solid fa-circle-user"></i>
              <h1>{user.name}</h1>
            </div>
          )}
          {!user && (
            <div className="flex-1 flex gap-3 justify-end">
              <button className="px-4 py-2 rounded-full text-sm font-medium text-white border border-white/30 hover:bg-white/10 transition-all duration-200">
                Login
              </button>
              <button className="px-4 py-2 rounded-full text-sm font-medium bg-white text-[rgb(26,126,154)] hover:bg-white/90 transition-all duration-200">
                Sign Up
              </button>
            </div>
          )}
          <button
            onClick={handleLogout}
            className="ml-10 px-6 py-2.5 rounded-full text-sm font-medium bg-[rgb(100,30,80)] text-white hover:bg-[rgb(120,40,100)] transition-all duration-200"
          >
            Log Out
          </button>
        </nav>

        {/* Slogan */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col gap-12 text-white w-10/24">
          <div className="text-5xl font-bold pl-60">Make texting</div>
          <div className="text-7xl font-bold pl-33 text-[rgb(100,30,80)] font-['Satisfy']">
            <span className="text-[rgb(60,30,100)]">Memor</span>able
          </div>
          <div className="text-5xl font-bold">throughout the year</div>
        </div>

        {/* Circle — top left */}
        <div className="absolute -top-20 -left-20 w-120 h-120 rounded-full bg-[rgb(100,30,80)] flex items-end justify-end">
          <p className="text-white text-sm leading-relaxed w-44 mb-40 mr-38 opacity-90 italic">
            "Turn your everyday conversations into beautiful memories you'll
            want to relive. Every message tells a story worth remembering."
          </p>
        </div>

        {/* Circle — bottom right */}
        <div className="absolute -bottom-20 -right-20 w-120 h-120 rounded-full bg-[rgb(60,30,100)] flex items-start justify-start">
          <p className="text-white text-sm leading-relaxed w-44 mt-35 ml-33 opacity-90 italic">
            "Start wrapping your chats today and discover the moments that made
            your year truly special. Every conversation shaped your journey."
          </p>
        </div>
      </header>
    </div>
  );
}
export default HeaderSection;
