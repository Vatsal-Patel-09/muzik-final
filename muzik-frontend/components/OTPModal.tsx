"use client";

import React, { useState } from "react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { X } from "lucide-react";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import Image from "next/image";
import { Button } from "./ui/button";
import { useRouter } from "next/navigation";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";  // Import Toastify CSS

const OTPModal = ({ email, onClose }: { email: string; onClose: () => void }) => {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(true);
  const [otp, setOtp] = useState(""); // State to store OTP
  const [isLoading, setIsLoading] = useState(false);

  const sendOtpFunction = async (props: { email: string; otp: string }) => {
    // Validate OTP length before making the API call.
    if (props.otp.length !== 6) {
      toast.error("Please enter a valid 6-digit OTP.", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      return;
    }
    try {
      await axios
        .post("https://muzik-mgj9.onrender.com/api/auth/login", {
          email: props.email,
          otp: props.otp,
        })
        .then((response) => {
          localStorage.setItem("token", response?.data?.token);
          toast.success("OTP verified successfully", {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
          });
          setTimeout(() => {
            router.push("/purchased-courses");
          }, 2000);
        })
        .catch((error) => {
          toast.error("Failed to verify OTP. Please try again.", {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
          });
          console.error("Error sending OTP", error);
        });
    } catch (error) {
      console.error("Unexpected error in sendOtpFunction", error);
    }
  };

  const handleClose = () => {
    setIsOpen(false);
    onClose(); // Notify parent to allow reopening
  };

  return (
    <AlertDialog open={isOpen} onOpenChange={setIsOpen}>
      <AlertDialogContent className="shad-alert-dialog rounded-lg p-6 bg-white shadow-lg">
        {/* ToastContainer placed without inline styles */}
        <ToastContainer />
        <AlertDialogHeader className="relative flex justify-center">
          <X
            width={24}
            height={24}
            onClick={handleClose}
            className="absolute right-4 top-4 cursor-pointer text-gray-500 hover:text-gray-700 transition-colors"
          />
          <AlertDialogTitle className="text-center text-xl font-bold text-gray-800">
            Verify Your OTP
          </AlertDialogTitle>
          <AlertDialogDescription className="mt-2 text-center text-sm text-gray-600">
            We&apos;ve sent a code to{" "}
            <span className="font-semibold text-brand">{email}</span>
          </AlertDialogDescription>
        </AlertDialogHeader>

        <div className="mt-6 flex justify-center">
          <InputOTP maxLength={6} value={otp} onChange={setOtp}>
            <InputOTPGroup className="flex gap-3">
              <InputOTPSlot index={0} className="w-12 h-14 border rounded-lg text-center text-lg focus:outline-none focus:ring-2 focus:ring-brand" />
              <InputOTPSlot index={1} className="w-12 h-14 border rounded-lg text-center text-lg focus:outline-none focus:ring-2 focus:ring-brand" />
              <InputOTPSlot index={2} className="w-12 h-14 border rounded-lg text-center text-lg focus:outline-none focus:ring-2 focus:ring-brand" />
              <InputOTPSlot index={3} className="w-12 h-14 border rounded-lg text-center text-lg focus:outline-none focus:ring-2 focus:ring-brand" />
              <InputOTPSlot index={4} className="w-12 h-14 border rounded-lg text-center text-lg focus:outline-none focus:ring-2 focus:ring-brand" />
              <InputOTPSlot index={5} className="w-12 h-14 border rounded-lg text-center text-lg focus:outline-none focus:ring-2 focus:ring-brand" />
            </InputOTPGroup>
          </InputOTP>
        </div>

        <AlertDialogFooter className="mt-6">
          <div className="flex w-full flex-col gap-4">
            <AlertDialogAction
              onClick={() => sendOtpFunction({ email, otp })}
              className="h-12 bg-brand rounded-lg bg-black hover:bg-black/85 flex justify-center items-center text-base font-medium shadow-md transition-all duration-200"
              type="button"
            >
              Submit
            </AlertDialogAction>

            <div className="text-center text-sm text-gray-600">
              Didn&apos;t get a code?{" "}
              <Button
                type="button"
                variant="link"
                className="font-medium hover:underline"
              >
                Resend OTP
              </Button>
            </div>
          </div>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default OTPModal;
