"use client"
 
import { z } from "zod"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"

import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
 
const formSchema = z.object({
  email: z.string().email(),
  otp: z.string().optional(),
})

import React, { useState } from 'react'
import axios from "axios"
import { toast } from "react-toastify"
import { useRouter } from "next/navigation"
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp"

const AuthForm = () => {
  const router = useRouter();
  const [email, setEmail] = useState(""); // State to store the email dynamically
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);
  const [isOtpSent, setIsOtpSent] = useState(false); // State to show OTP input
  const [isLoading, setIsLoading] = useState(false); // Loading state for button
  const [isLoginLoading, setIsLoginLoading] = useState(false); // Loading state for login
  const [otp, setOtp] = useState(""); // OTP state

    // 1. Define your form.
    const form = useForm<z.infer<typeof formSchema>>({
      resolver: zodResolver(formSchema),
      defaultValues: {
        email: "",
        otp: "",
      },
    })

    function onSubmit(values: z.infer<typeof formSchema>) {
      if (isButtonDisabled || isLoading) return;
      
      if (!isOtpSent) {
        // Send OTP
        const lowercasedEmail = values.email.trim().toLowerCase();
        console.log("Form values:", lowercasedEmail);
        
        setEmail(lowercasedEmail);
        sendOtpFunction({ email: lowercasedEmail }); // Send lowercase email
      } else {
        // Verify OTP and login
        verifyOtpAndLogin(values);
      }
    }

    const sendOtpFunction = async (values: { email: string }) => {
      setIsLoading(true);
      setIsButtonDisabled(true);
      
      try {
        await axios.post("https://muzik-mgj9.onrender.com/api/auth/login-otp", {
          email: values.email
        }).then((response) => {
          localStorage.setItem("email", values.email);
          localStorage.setItem("token", response?.data?.token);
          
          toast.success("OTP sent successfully! Please check your Spam Mail", {
            position: "top-right",
            autoClose: 3000,
          });
          
          console.log("OTP sent successfully", response.data);
          setIsOtpSent(true); // Show OTP input
        }).catch((error) => {
          toast.error("Failed to send OTP. Please try again.", {
            position: "top-right",
            autoClose: 3000,
          });
          console.error("Error sending OTP", error);
        });
      } catch (error) {
        toast.error("An unexpected error occurred. Please try again.", {
          position: "top-right",
          autoClose: 3000,
        });
        console.error("Unexpected error", error);
      } finally {
        setIsLoading(false);
        setIsButtonDisabled(false);
      }
    }

    const verifyOtpAndLogin = async (values: z.infer<typeof formSchema>) => {
      // Validate OTP length before making the API call.
      if (!values.otp || values.otp.length !== 6) {
        toast.error("Please enter a valid 6-digit OTP.", {
          position: "top-right",
          autoClose: 3000,
        });
        return;
      }

      setIsLoginLoading(true);
      setIsButtonDisabled(true);

      try {
        await axios.post("https://muzik-mgj9.onrender.com/api/auth/login", {
          email: email,
          otp: values.otp,
        }).then((response) => {
          localStorage.setItem("token", response?.data?.token);
          toast.success("Login successful! Redirecting...", {
            position: "top-right",
            autoClose: 2000,
          });
          
          setTimeout(() => {
            router.push("/purchased-courses");
          }, 2000);
        }).catch((error) => {
          toast.error("Failed to verify OTP. Please try again.", {
            position: "top-right",
            autoClose: 3000,
          });
          console.error("Error verifying OTP", error);
          setIsButtonDisabled(false);
          setIsLoginLoading(false);
        });
      } catch (error) {
        toast.error("An unexpected error occurred. Please try again.", {
          position: "top-right",
          autoClose: 3000,
        });
        console.error("Unexpected error in verifyOtpAndLogin", error);
        setIsButtonDisabled(false);
        setIsLoginLoading(false);
      }
    }

  return (
    <div className="relative w-full">
      {/* Translucent card */}
      <div className="bg-white/70 border-2 border-gray-500 rounded-2xl p-4 sm:p-6 lg:p-8 xl:p-10 shadow-2xl">
        {/* Header */}
        <div className="text-center mb-6 sm:mb-8">
          <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-black mb-2">
            Welcome Back
          </h1>
          <p className="text-gray-700 text-xs sm:text-sm md:text-base">
            Sign in to access your courses
          </p>
        </div>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 sm:space-y-6">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-black font-medium text-xs sm:text-sm md:text-base">
                    Email Address
                  </FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Enter your email"
                      {...field}
                      onChange={(e) => field.onChange(e.target.value.toLowerCase())}
                      disabled={isOtpSent}
                      className="h-10 sm:h-12 bg-white border-gray-300 text-black placeholder:text-gray-500 focus:border-gray-500 transition-all duration-200 rounded-xl text-sm sm:text-base"
                    />
                  </FormControl>
                  <FormDescription className="text-gray-600 text-xs sm:text-sm">
                    Enter the email with which the course was purchased.
                  </FormDescription>
                  <FormMessage className="text-red-600 text-xs sm:text-sm" />
                </FormItem>
              )}
            />

            {/* OTP Input - Only show after OTP is sent */}
            {isOtpSent && (
              <FormField
                control={form.control}
                name="otp"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-black font-medium text-xs sm:text-sm md:text-base">
                      Verification Code
                    </FormLabel>
                    <FormControl>
                      <div className="flex justify-center py-2 sm:py-4">
                        <InputOTP 
                          maxLength={6} 
                          value={otp} 
                          onChange={(value) => {
                            setOtp(value);
                            field.onChange(value);
                          }}
                        >
                          <InputOTPGroup className="grid grid-cols-6 gap-1 sm:gap-2 md:gap-3 max-w-xs mx-auto">
                            {[0, 1, 2, 3, 4, 5].map((index) => (
                              <InputOTPSlot 
                                key={index}
                                index={index} 
                                className="w-8 h-10 sm:w-10 sm:h-12 md:w-12 md:h-14 bg-white border-2 border-gray-300 rounded-lg sm:rounded-xl text-center text-base sm:text-lg md:text-xl font-semibold text-black focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 hover:border-gray-400" 
                              />
                            ))}
                          </InputOTPGroup>
                        </InputOTP>
                      </div>
                    </FormControl>
                    <FormDescription className="text-gray-600 text-center text-xs sm:text-sm">
                      Enter the 6-digit code sent to your email.
                    </FormDescription>
                    <FormMessage className="text-red-600 text-center text-xs sm:text-sm" />
                  </FormItem>
                )}
              />
            )}

            <Button 
              type="submit" 
              className="w-full h-10 sm:h-12 md:h-14 bg-black hover:bg-gray-800 text-white font-semibold text-xs sm:text-sm md:text-base rounded-xl transition-all duration-200 transform hover:scale-[1.02] active:scale-[0.98] shadow-lg disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none border-2 border-black"
              disabled={isButtonDisabled || isLoading || isLoginLoading}
            >
              {isLoading ? (
                <div className="flex items-center gap-2">
                  <div className="animate-spin rounded-full h-3 w-3 sm:h-4 sm:w-4 md:h-5 md:w-5 border-b-2 border-white"></div>
                  <span className="text-xs sm:text-sm md:text-base">Sending OTP...</span>
                </div>
              ) : isLoginLoading ? (
                <div className="flex items-center gap-2">
                  <div className="animate-spin rounded-full h-3 w-3 sm:h-4 sm:w-4 md:h-5 md:w-5 border-b-2 border-white"></div>
                  <span className="text-xs sm:text-sm md:text-base">Logging in...</span>
                </div>
              ) : isOtpSent ? (
                "Verify OTP & Login"
              ) : (
                "Send OTP"
              )}
            </Button>

            {/* Resend OTP option */}
            {isOtpSent && (
              <div className="text-center space-y-2 sm:space-y-3">
                <p className="text-xs sm:text-sm text-gray-600">
                  Didn't receive the OTP?
                </p>
                <Button
                  type="button"
                  variant="link"
                  className="text-black hover:text-gray-700 font-medium text-xs sm:text-sm underline decoration-1 underline-offset-2 h-auto p-2 rounded-lg transition-all duration-200"
                  onClick={() => sendOtpFunction({ email })}
                  disabled={isLoading}
                >
                  {isLoading ? "Resending..." : "Resend OTP"}
                </Button>
              </div>
            )}
          </form>
        </Form>
      </div>
    </div>
  );
};

export default AuthForm;