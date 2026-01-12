import React, { useState, useEffect, useRef } from "react";
import Logo from "../assets/zerobugx.png";
import { Link, useNavigate } from "react-router-dom";
import gsap from "gsap";
import { loginAPI } from "../api/Auth.api";
import toast, { Toaster } from "react-hot-toast";
import { Eye, EyeOff } from "lucide-react";
import { AuthContext } from "../context/AuthContext";
import { useContext } from "react";
export default function LoginComponent() {
  const navigate = useNavigate();
   const {setUser,setIsAuth}=useContext(AuthContext);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [showPassword, setShowPassword] = useState(false);

  const boxRef = useRef(null);
  const titleRef = useRef(null);

  useEffect(() => {
    gsap.from(boxRef.current, {
      opacity: 0,
      scale: 0.8,
      duration: 0.8,
      ease: "power3.out",
    });

    gsap.from(titleRef.current, {
      opacity: 0,
      y: -40,
      duration: 1.1,
      delay: 0.4,
      ease: "power3.out",
    });
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.email || !formData.password) {
      toast.error("All fields are required!");
      return;
    }

    try {
      const res = await loginAPI(formData);

      const { token, user } = res.data;
      
      // Store token & user details
      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify(user));

      toast.success("Login Successful!");
         setUser(user)
         setIsAuth(true)
      // Clear form
      setFormData({
        email: "",
        password: "",
      });

      // Navigate to home page
      navigate("/reviwe");
    } catch (error) {
      setUser(null);
      setIsAuth(false);
      console.log(error);
      toast.error(error.response?.data?.message || "Login failed!");
    }
  };

  return (
    <div className="min-h-screen bg-[#0B0F17] flex items-center justify-center px-4">
      {/*  TOASTIFY */}
      <Toaster
        position="top-center"
        toastOptions={{
          style: {
            fontSize: "16px",
            padding: "12px 18px",
            borderRadius: "10px",
            background: "#1F2937",
            color: "#fff",
            border: "1px solid #4ADE80",
          },
          success: {
            iconTheme: {
              primary: "#4ADE80",
              secondary: "#1F2937",
            },
          },
          error: {
            iconTheme: {
              primary: "#F87171",
              secondary: "#1F2937",
            },
          },
        }}
      />

      <div
        ref={boxRef}
        className="bg-[#111827] w-full max-w-md p-8 rounded-xl shadow-xl"
      >
        <div className="flex flex-col items-center mb-6">
          <img
            src={Logo}
            alt="ZeroBugX"
            className="h-24 w-24 rounded-lg mb-2"
          />
          <h1 ref={titleRef} className="text-3xl font-bold text-green-400">
            ZeroBugX
          </h1>
          <p className="text-gray-400 text-sm mt-1">Login to continue</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4 text-white">
          <input
            type="email"
            name="email"
            placeholder="Enter email"
            value={formData.email}
            onChange={handleChange}
            className="w-full bg-[#0d131e] border border-gray-700 rounded-lg px-4 py-2 focus:border-green-400 outline-none text-green-400"
          />

          <div className="relative w-full">
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              placeholder="Enter password"
              value={formData.password}
              onChange={handleChange}
              className="w-full bg-[#0d131e] border border-gray-700 rounded-lg px-4 py-2 focus:border-green-400 outline-none text-green-400"
            />

            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-2.5 text-gray-400 hover:text-green-400"
            >
              {showPassword ? <EyeOff size={22} /> : <Eye size={22} />}
            </button>
          </div>

          <button
            type="submit"
            className="w-full py-2 bg-green-500 cursor-pointer rounded-lg font-semibold text-white hover:bg-green-600 mt-3"
          >
            Login
          </button>
        </form>

        <p className="text-center text-gray-400 text-sm mt-4">
          Don't have an account?
          <Link
            to="/signup"
            className="text-green-400 ml-1 hover:text-green-300"
          >
            Sign Up
          </Link>
        </p>
      </div>
    </div>
  );
}
 