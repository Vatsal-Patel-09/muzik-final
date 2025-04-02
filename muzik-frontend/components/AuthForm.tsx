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
  username: z.string().min(2).max(50),
  email: z.string().email(),
})

import React, { useState } from 'react'
import OTPModal from "./OTPModal"

const AuthForm = () => {

  const [accountId, setAccountId] = useState(false);
  const [submit, setSubmit] = useState(false);

    // 1. Define your form.
    const form = useForm<z.infer<typeof formSchema>>({
      resolver: zodResolver(formSchema),
      defaultValues: {
        username: "",
        email: "",
      },
    })
   
    // 2. Define a submit handler.
    function onSubmit(values: z.infer<typeof formSchema>) {
      // Do something with the form values.
      // ✅ This will be type-safe and validated.
      console.log(values)
    }

  return (
    <div className="border-2 border-gray-500 rounded-lg p-8 w-1/4 bg-black/70 text-white">

          <h1 className="text-[34px] mb-4 font-semibold flex items-center justify-center">Login</h1>

          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">

              <FormField
                control={form.control}
                name="username"
                render={({ field }) => (

                  <FormItem>
                    <FormLabel>Username</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter your Username" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (

                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter your email to " {...field} />
                    </FormControl>
                    <FormDescription>
                      Enter the email with which the course was purchased.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />


              <Button type="submit" variant='ghost' className="border-2 border-white">Send OTP</Button>
            </form>
          </Form>

          {/* <OTPModal /> */}
    </div>
  )
}

export default AuthForm