"use client";

import React, { use, useEffect, useState } from "react";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";

import Image from "next/image";
import { Button } from "./ui/button";
// import { sendEmailOTP, verifySecret } from '@/lib/actions/user.actions';
import { useRouter } from "next/navigation";
import axios from "axios";
import { z } from "zod";
import { ToastContainer, toast } from "react-toastify";

const formSchema = z.object({
  username: z.string().min(2).max(50),
  email: z.string().email(),
});

const OTPModal = () => {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(true);
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [storeOtp, setStoreOtp] = useState({
    email: "",
    otp: "",
  });
  const handleSubmit = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setIsLoading(true);

    // try {
    //     const sessionId = await verifySecret({ accountId, password });

    //     if(sessionId) router.push("/");
    // } catch (error) {
    //     console.log('Failed to verify OTP', error);
    // }

    setIsLoading(false);
  };

  useEffect(() => {
    localStorage.getItem("email")
      ? setStoreOtp({ ...storeOtp, email: localStorage.getItem("email") || "" })
      : setStoreOtp({ ...storeOtp, email: "" });
  }, []);

  const sendOtpFunction = async (props: { email: string; otp: string }) => {
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
            router.push("/");
          }, 2000);
        })
        .catch((error) => {
          console.error("Error sending OTP", error);
        });
    } catch (error) {
      console.error("adsjgygufgdsfsdf", error);
    }
  };

  return (
    <AlertDialog open={isOpen} onOpenChange={setIsOpen}>
      <AlertDialogContent className="shad-alert-dialog">
        <AlertDialogHeader className="relative flex justify-center">
          <AlertDialogTitle className="h2 text-center">
            Enter your OTP
            <Image
              src="/assets/icons/close-dark.svg"
              alt="close"
              width={20}
              height={20}
              onClick={() => setIsOpen(false)}
              className="otp-close-button"
            />
          </AlertDialogTitle>
          <AlertDialogDescription className="subtitle-2 text-center text-light-100">
            We&apos;ve sent a code to{" "}
            <span className="pl-1 text-brand">{storeOtp?.email}</span>
            <div
              style={{
                position: "absolute",
                top: "0",
              }}
            >
              <ToastContainer />
            </div>
          </AlertDialogDescription>
        </AlertDialogHeader>
        <InputOTP maxLength={6} value={password} onChange={setPassword}>
          <InputOTPGroup className="shad-otp">
            <InputOTPSlot index={0} className="shad-otp-slot" />
            <InputOTPSlot index={1} className="shad-otp-slot" />
            <InputOTPSlot index={2} className="shad-otp-slot" />
            <InputOTPSlot index={3} className="shad-otp-slot" />
            <InputOTPSlot index={4} className="shad-otp-slot" />
            <InputOTPSlot index={5} className="shad-otp-slot" />
          </InputOTPGroup>
        </InputOTP>
        <div
          style={{
            display: "flex",
            justifyContent: "flex-start",
            gap: "10px",
          }}
        >
          <input
            onChange={(e) => {
              setStoreOtp({ ...storeOtp, otp: e.target.value });
            }}
            type="text"
            name="otp"
            style={{ height: "40px", width: "200px", background: "red" }}
          />
        </div>

        <button
          onClick={() => {
            sendOtpFunction({ email: storeOtp.email, otp: storeOtp.otp });
          }}
        >
          Submit
        </button>
        <AlertDialogFooter>
          <div className="flex w-full flex-col gap-4">
            <AlertDialogAction
              onClick={handleSubmit}
              className="shad-submit-btn h-12"
              type="button"
            >
              Submit
              {isLoading && (
                <Image
                  src="/assets/icons/loader.svg"
                  alt="loader"
                  width={24}
                  height={24}
                  className="ml-2 animate-spin"
                />
              )}
            </AlertDialogAction>

            <div className="subtitle-2 mt-2 text-center text-light-100">
              Didn&apos;t get a code?
              <Button type="button" variant="link" className="pl-1 text-brand">
                Click to resend
              </Button>{" "}
              {/*onClick={handleResendOTP} */}
            </div>
          </div>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default OTPModal;
