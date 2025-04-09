"use client";

import AuthForm from "@/components/AuthForm";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Page() {
  return (
    <div className="relative h-screen w-screen bg-black/100">
      <div
        className="absolute inset-0 bg-cover bg-center opacity-40"
        style={{ backgroundImage: "url('/login-image.jpg')" }}
      ></div>
      <div className="relative flex h-full items-center justify-center">
        <AuthForm />
      </div>
      {/* Global ToastContainer for toast notifications */}
      <ToastContainer />
    </div>
  );
}

export default Page;
