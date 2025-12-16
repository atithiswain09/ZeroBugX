import { useState, useEffect, useRef } from "react";
import Logo from "../assets/zerobugx.png";
import { Link,useNavigate } from "react-router-dom";
import gsap from "gsap";
import toast, { Toaster } from "react-hot-toast";
import { signupAPI } from "../api/Auth.api";

export default function SignupComponent() {
         const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

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

  // 📌 COMPLETELY FIXED SIGNUP FUNCTION
  const handleSubmit = async (e) => {
    e.preventDefault();

    console.log("🔵 Step 1: Form Data Received:", formData);

    // ===== Trim all fields to remove whitespace =====
    const trimmedData = {
      username: formData.username.trim(),
      email: formData.email.trim(),
      password: formData.password.trim(),
      confirmPassword: formData.confirmPassword.trim(),
    };

    
    if (
      !trimmedData.username ||
      !trimmedData.email ||
      !trimmedData.password ||
      !trimmedData.confirmPassword
    ) {
      
      toast.error("All fields are required!");
      return;
    }

    if (trimmedData.password !== trimmedData.confirmPassword) {
      console.log("❌ Validation Failed: Passwords don't match");
      toast.error("Passwords do not match!");
      return;
    }

    if (trimmedData.password.length < 6) {
      console.log("❌ Validation Failed: Password too short");
      toast.error("Password must be at least 6 characters!");
      return;
    }

    console.log("✅ Step 3: Frontend Validation Passed");

    try {
      // ✅ Remove confirmPassword before sending to backend
      const { ...signupData } = trimmedData;

      console.log("📤 Step 4: Data Being Sent to Backend:", signupData);
      console.log("📤 Data as JSON:", JSON.stringify(signupData));

      // 📌 Calling backend with only username, email, password
      const response = await signupAPI(signupData);

      console.log("✅ Step 5: Backend Response Received:", response);

      // Success Message
      toast.success(response.data.message || "Signup Successful!");
      // Clear form
      setFormData({
        username: "",
        email: "",
        password: "",
        confirmPassword: "",
      });
             
     navigate('/'); // Navigates to the '/new-page' route
    } catch (error) {
      // Backend Error
      console.error("❌ Step 5: Error Occurred");
      console.error("❌ Full Error:", error);
      console.error("❌ Error Response:", error.response);
      console.error("❌ Error Data:", error.response?.data);
      console.error("❌ Error Status:", error.response?.status);
      console.error("❌ Error Message:", error.response?.data?.message);

      toast.error(error.response?.data?.message || "Signup Failed!");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#0B0F17] px-4">
      <Toaster position="top-center" />

      <div ref={boxRef} className="w-full max-w-md p-8 bg-[#111827] rounded-xl">
        <div className="flex flex-col items-center mb-6">
          <img
            src={Logo}
            className="w-24 h-24 rounded-xl mb-2"
            alt="ZeroBugX Logo"
          />
          <h1 ref={titleRef} className="text-3xl font-bold text-green-400">
            ZeroBugX
          </h1>
          <p className="text-gray-400">Create your account</p>
        </div>

        {/* FORM */}
        <form onSubmit={handleSubmit} className="space-y-4 text-white">
          <input
            type="text"
            name="username"
            placeholder="Enter username"
            className="w-full bg-[#0d131e] border border-gray-700 rounded-lg px-4 py-2"
            value={formData.username}
            onChange={handleChange}
            required
          />

          <input
            type="email"
            name="email"
            placeholder="Enter email"
            className="w-full bg-[#0d131e] border border-gray-700 rounded-lg px-4 py-2"
            value={formData.email}
            onChange={handleChange}
            required
          />

          <input
            type="password"
            name="password"
            placeholder="Enter password"
            className="w-full bg-[#0d131e] border border-gray-700 rounded-lg px-4 py-2"
            value={formData.password}
            onChange={handleChange}
            required
          />

          <input
            type="password"
            name="confirmPassword"
            placeholder="Confirm password"
            className="w-full bg-[#0d131e] border border-gray-700 rounded-lg px-4 py-2"
            value={formData.confirmPassword}
            onChange={handleChange}
            required
          />

          <button
            type="submit"
            className="w-full bg-green-500 hover:bg-green-600 rounded-lg py-2 cursor-pointer font-semibold mt-3"
          >
            Sign Up
          </button>
        </form>

        <p className="text-center text-gray-400 mt-3">
          Already have an account?
          <Link to="/login" className="text-green-400 ml-1">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
}
