import React, { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import Logo from "../assets/zerobugx.png";
import gsap from "gsap";

function Navbar() {
  const logoRef = useRef(null);
  const titleRef = useRef(null);

  useEffect(() => {
    gsap.from([logoRef.current, titleRef.current], {
      opacity: 0,
      y: -20,
      duration: 0.8,
      stagger: 0.2,
      ease: "power3.out",
    });
  }, []);

  return (
    <div className="fixed top-0 left-0 w-full bg-[#0B0F17]/90 backdrop-blur-md border-b border-gray-800 flex items-center justify-between px-8 py-5 shadow-lg z-50">
      {/* Left Logo */}
      <div className="flex items-center gap-4">
        <img
          src={Logo}
          alt="logo"
          className="w-16 ml-7 object-contain rounded-lg"
          ref={logoRef}
        />
        <h1 className="text-green-400 font-bold ml-5 text-xl" ref={titleRef}>
          ZeroBugX
        </h1>
        <div className="flex gap-8 ml-6 text-gray-300 font-bold">
        <Link to="/">Home</Link>
        <Link to="/profile">Profile</Link>
      </div>
      </div>
      <button className="bg-green-500 px-4 py-2 cursor-pointer rounded-lg hover:bg-green-400">
        Logout
      </button>
    </div>
  );
}

export default Navbar;
