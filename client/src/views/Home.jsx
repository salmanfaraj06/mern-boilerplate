// Home.jsx
import React, { useState } from "react";

export default function Home() {
  const [darkMode, setDarkMode] = useState(false);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  return (
    <div className={darkMode ? "dark" : ""}>
      <div className="bg-white dark:bg-black text-black dark:text-white min-h-screen flex flex-col items-center justify-center">
        <h1 className="text-4xl mb-4">Welcome to Our MERN Starter Kit</h1>
        <p className="mb-4">
          This is a fully responsive landing page for a MERN stack application.
        </p>
        <button
          onClick={toggleDarkMode}
          className="p-2 bg-blue-500 text-white rounded"
        >
          Toggle Dark Mode
        </button>
      </div>
    </div>
  );
}
