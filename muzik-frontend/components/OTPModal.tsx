"use client";

import React, { use, useEffect, useState } from 'react'

import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
} from "@/components/ui/alert-dialog"

  import { X } from 'lucide-react';

  import {
    InputOTP,
    InputOTPGroup,
    InputOTPSlot,
} from "@/components/ui/input-otp"

import Image from 'next/image';
import { Button } from './ui/button';
// import { sendEmailOTP, verifySecret } from '@/lib/actions/user.actions';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import { z } from 'zod';


const formSchema = z.object({
    username: z.string().min(2).max(50),
    email: z.string().email(),
})


const OTPModal = () => {

    const router = useRouter();
    const [isOpen, setIsOpen] = useState(true);
    const [password, setPassword] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [storeOtp, setStoreOtp] = useState({
        email: '',
        otp: ''
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
            : setStoreOtp({ ...storeOtp, email: "" })
    }, []);

  return (
    <AlertDialog open={isOpen} onOpenChange={setIsOpen}>
        <AlertDialogContent className='shad-alert-dialog rounded-lg p-6'>
            <AlertDialogHeader className='relative flex justify-center'>
                <X 
                    width={20} 
                    height={20} 
                    onClick={() => setIsOpen(false)} 
                    className="absolute right-4 top-4 cursor-pointer text-gray-500 hover:text-gray-700"
                />
                <AlertDialogTitle className='h2 text-center text-xl font-semibold text-gray-800'>
                    Enter your OTP
                </AlertDialogTitle>
                <AlertDialogDescription className='subtitle-2 mt-2 text-center text-sm text-gray-600'>
                    We&apos;ve sent a code to <span className='pl-1 font-medium text-brand'>johnDoe@gmail.com</span>
                </AlertDialogDescription>
            </AlertDialogHeader>

            <div className="mt-6 flex justify-center">
                <InputOTP maxLength={6} value={password} onChange={setPassword}>
                    <InputOTPGroup className='shad-otp flex gap-2'>
                        <InputOTPSlot index={0} className='shad-otp-slot w-10 h-12 border rounded-md text-center text-lg' />
                        <InputOTPSlot index={1} className='shad-otp-slot w-10 h-12 border rounded-md text-center text-lg' />
                        <InputOTPSlot index={2} className='shad-otp-slot w-10 h-12 border rounded-md text-center text-lg' />
                        <InputOTPSlot index={3} className='shad-otp-slot w-10 h-12 border rounded-md text-center text-lg' />
                        <InputOTPSlot index={4} className='shad-otp-slot w-10 h-12 border rounded-md text-center text-lg' />
                        <InputOTPSlot index={5} className='shad-otp-slot w-10 h-12 border rounded-md text-center text-lg' />
                    </InputOTPGroup>
                </InputOTP>
            </div>

            <AlertDialogFooter className="mt-4">
                <div className='flex w-full flex-col gap-3'>
                    <AlertDialogAction 
                        onClick={handleSubmit} 
                        className='h-12 bg-brand text-white bg-black hover:bg-gray-900 rounded-md hover:bg-brand-dark flex justify-center items-center' 
                        type='button'
                    >
                        Submit
                        {isLoading && (
                            <Image src='/assets/icons/loader.svg' alt='loader' width={24} height={24} className='ml-2 animate-spin' />
                        )}
                    </AlertDialogAction>
                
                    <div className='subtitle-2 text-center text-sm text-gray-600'>
                        Didn&apos;t get a code?
                        <Button 
                            type='button' 
                            variant='link' 
                            className='pl-1 text-brand font-medium hover:underline'
                        >
                            Click to resend
                        </Button> {/*onClick={handleResendOTP} */}
                    </div>
                </div>
            </AlertDialogFooter>
        </AlertDialogContent>
    </AlertDialog>
  )
}

export default OTPModal