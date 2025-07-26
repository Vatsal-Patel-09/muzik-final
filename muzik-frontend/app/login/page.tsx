"use client";

import AuthForm from "@/components/AuthForm";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Page() {
  return (
    <div className="relative min-h-screen w-full bg-black/100">
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
