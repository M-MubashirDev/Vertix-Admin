// Logo.jsx
import React from "react";

const Logo = () => {
  return (
    <div className="flex justify-center items-center p-4">
      <img
        src="/logo.png"         {/* Path to your WebP logo */}
        alt="Car Wash Logo"      {/* Alternative text */}
        className="w-32 h-auto"   {/* Adjust width/height as needed */}
      />
    </div>
  );
};

export default Logo;
