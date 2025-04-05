"use client";

import React, { useEffect } from "react";
import axios from "axios";
import { Button } from "@/components/ui/button";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";

const paymentSchema = z.object({
    amount: z.string().min(1, "Amount is required"),
    email: z.string().email("Invalid email"),
});

const PaymentForm = () => {
    const [scriptLoaded, setScriptLoaded] = useState(false);

    const form = useForm<z.infer<typeof paymentSchema>>({
        resolver: zodResolver(paymentSchema),
        defaultValues: {
            amount: "",
            email: "",
        },
    });


    useEffect(() => {
        const script = document.createElement("script");
        script.src = "https://checkout.razorpay.com/v1/checkout.js";
        script.async = true;
        script.onload = () => setScriptLoaded(true);
        document.body.appendChild(script);
    }, []);

    // Handle Payment
    async function onSubmit(values: z.infer<typeof paymentSchema>) {
        if (!scriptLoaded) {
            alert("Razorpay SDK not yet loaded. Please wait...");
            return;
        }
        try {

            // Request backend to create a Razorpay order
            const { data } = await axios.post("https://muzik-mgj9.onrender.com/api/payments/create_razorpay_order", {
                amount: parseInt(values.amount), // Convert to number
                email: values?.email,
            });

            // Configure Razorpay checkout
            const options = {
                key: "rzp_live_a2JtgAgHLcozFk", // Replace with actual Key ID
                amount: data.amount,
                currency: data.currency,
                name: "Your Company",
                description: "Payment for services",
                order_id: data.id,
                handler: async (response: any) => {
                    // Verify payment
                    const verifyRes = await axios.post("https://muzik-mgj9.onrender.com/api/payments/get_razorpay_order_status", response);
                    alert(verifyRes.data.message);
                },
                prefill: {
                    email: values.email,
                },
                theme: {
                    color: "#3399cc",
                },
            };



            const rzp = new (window as any).Razorpay(options);
            rzp.open();
        } catch (error) {
            console.error("Payment initiation failed:", error);
        }
    }

    return (
        <div className="border-2 border-gray-500 rounded-lg p-8 w-1/4 bg-black/70 text-white">
            <h1 className="text-[34px] mb-4 font-semibold flex items-center justify-center">
                Razorpay Payment
            </h1>

            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                    <FormField
                        control={form.control}
                        name="amount"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Amount (INR)</FormLabel>
                                <FormControl>
                                    <Input type="number" placeholder="Enter amount" {...field} />
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
                                    <Input type="email" placeholder="Enter your email" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <Button type="submit" variant="ghost" className="border-2 border-white">
                        Pay Now
                    </Button>
                </form>
            </Form>
        </div>
    );
};

export default PaymentForm;
