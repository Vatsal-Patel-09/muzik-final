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
})

import React, { useState } from 'react'
import OTPModal from "./OTPModal"
import axios from "axios"

const AuthForm = () => {
  const [isOTPModalOpen, setIsOTPModalOpen] = useState(false); // State to control OTP modal visibility
  const [email, setEmail] = useState(""); // State to store the email dynamically

    // 1. Define your form.
    const form = useForm<z.infer<typeof formSchema>>({
      resolver: zodResolver(formSchema),
      defaultValues: {
        // username: "",
        email: "",
      },
    })
   
    // 2. Define a submit handler.
    function onSubmit(values: z.infer<typeof formSchema>) {
      // Do something with the form values.
      // ✅ This will be type-safe and validated.
      console.log("dsgygsdufgusdgfsd", values)
      sendOtpFunction(values)
    }

    const sendOtpFunction = async (values: z.infer<typeof formSchema>) => {
      try {
        await axios.post("https://muzik-mgj9.onrender.com/api/auth/login-otp", {
          email: values.email
        }).then((response) => {
          localStorage.setItem("email", values.email)
          // console.log("dsbfygdsuf", response)
          setIsOTPModalOpen(true);
        }).catch((error) => {
          console.error("Error sending OTP", error)
  
        })
  
      } catch (error) {
        console.error("adsjgygufgdsfsdf", error)
      }
    }

  return (
    <div className="border-2 border-gray-500 rounded-lg p-8 bg-white/70 text-black">
      <h1 className="text-3xl lg:text-5xl lg:leading-tight mb-4 font-semibold flex items-center justify-center">Login</h1>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input placeholder="Enter your email" {...field} />
                </FormControl>
                <FormDescription className="text-gray-900">
                  Enter the email with which the course was purchased.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit" variant="default" className="border-2 border-black">Send OTP</Button>
        </form>
      </Form>

      {isOTPModalOpen && (
        <OTPModal 
          email={email} 
          onClose={() => setIsOTPModalOpen(false)} // Allow modal to be reopened
        />
      )}
    </div>
  );
};

export default AuthForm;