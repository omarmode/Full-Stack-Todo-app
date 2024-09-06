"use client";
import { SignIn } from "@clerk/nextjs";
import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import Loading from "./loading"; // تأكد من أن المسار صحيح

export default function SignInPage() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // محاكاة عملية تحميل Clerk
    // يمكنك استبدال هذا الكود بالتحقق من حالة تحميل Clerk الفعلية
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2000); // مدة التحميل الافتراضية (مثال)

    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return <Loading />;
  }

  return (
    <div className="relative flex items-center justify-center h-screen bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 overflow-hidden">
      {/* SVG متحرك */}
      <motion.svg
        className="absolute top-0 left-0 w-72 h-72 opacity-70"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 100 100"
        animate={{ rotate: 360 }}
        transition={{ duration: 10, repeat: Infinity }}
      >
        <path
          fill="none"
          stroke="white"
          strokeWidth="2"
          d="M10,30 Q50,5 90,30 T90,90 Q50,115 10,90 T10,30"
        />
      </motion.svg>

      {/* أشكال متحركة مع تفاعل الماوس */}
      <motion.div
        className="absolute top-10 left-10 w-48 h-48 bg-pink-300 rounded-full filter blur-2xl opacity-70"
        whileHover={{ scale: 1.2 }}
        whileTap={{ scale: 0.8 }}
      />
      <motion.div
        className="absolute bottom-10 right-10 w-48 h-48 bg-yellow-300 rounded-full filter blur-2xl opacity-70"
        whileHover={{ scale: 1.2 }}
        whileTap={{ scale: 0.8 }}
      />
      <motion.div
        className="absolute top-1/2 left-1/2 w-32 h-32 bg-blue-300 rounded-full filter blur-2xl opacity-70"
        whileHover={{ scale: 1.5, rotate: 90 }}
        whileTap={{ scale: 0.9 }}
      />

      {/* صندوق تسجيل الدخول */}
      <div className="relative z-10 bg-white p-10 rounded-lg shadow-lg max-w-md w-full">
        <h1 className="text-3xl font-bold text-center text-gray-800 mb-6">
          Welcome Back!
        </h1>
        <SignIn
          appearance={{
            elements: {
              formButtonPrimary:
                "bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-lg w-full",
              formFieldInput: "border-gray-300 rounded-lg",
              formHeaderTitle: "text-xl font-bold text-center text-gray-800",
            },
          }}
        />
      </div>
    </div>
  );
}
