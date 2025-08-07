"use client";

import AuthForm from "@/components/AuthForm";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

function Page() {
  return (
    <div className="relative min-h-screen w-full bg-black/100">
      {/* Return to Homepage button */}
      <Link 
        href="/" 
        className="absolute top-4 left-4 sm:top-6 sm:left-6 z-20 flex items-center gap-2 px-3 py-2 sm:px-4 sm:py-2 bg-white/10 backdrop-blur-sm text-white rounded-lg hover:bg-white/20 transition-all duration-200 text-sm sm:text-base"
      >
        <ArrowLeft className="h-4 w-4 sm:h-5 sm:w-5" />
        <span>Home</span>
      </Link>

      {/* Background image with improved opacity */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-40"
        style={{ backgroundImage: "url('/login-image.jpg')" }}
      ></div>
      
      {/* Main content */}
      <div className="relative flex min-h-screen items-center justify-center p-4 sm:p-6 lg:p-8">
        <div className="w-full max-w-sm sm:max-w-md">
          <AuthForm />
        </div>
      </div>
      
      {/* Global ToastContainer for toast notifications */}
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
        className="!mt-16"
      />
    </div>
  );
}

export default Page;
