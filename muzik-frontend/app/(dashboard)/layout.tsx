"use client";

import React, { useState } from "react";
import { Sidebar, SidebarBody, SidebarLink } from "@/components/ui/sidebar";
import {
  IconArrowLeft,
  IconBrandTabler,
  IconSettings,
  IconUserBolt,
} from "@tabler/icons-react";
import Link from "next/link";
import { motion } from "motion/react";
import Image from "next/image";
import { cn } from "@/lib/utils";


// const layout = ( {children} : {children:React.ReactNode}) => {
//   return (
//     <div className='flex flex-row'>
//         <div className='bg-black text-white w-full h-screen flex flex-col justify-center items-center'>
//             <DashboardSidebar />
//             {children}
            
//         </div>
//         {/* <div className='w-full h-screen flex flex-col justify-center items-center'>{children}</div> */}
//     </div>
//   )
// }

// export default layout

const layout = ({ children } : { children:React.ReactNode }) => {
    const links = [
      {
        label: "Dashboard",
        href: "#",
        icon: (
          <IconBrandTabler className="h-5 w-5 shrink-0 text-neutral-700 dark:text-neutral-200" />
        ),
      },
      {
        label: "Profile",
        href: "#",
        icon: (
          <IconUserBolt className="h-5 w-5 shrink-0 text-neutral-700 dark:text-neutral-200" />
        ),
      },
      {
        label: "Settings",
        href: "#",
        icon: (
          <IconSettings className="h-5 w-5 shrink-0 text-neutral-700 dark:text-neutral-200" />
        ),
      },
      {
        label: "Logout",
        href: "#",
        icon: (
          <IconArrowLeft className="h-5 w-5 shrink-0 text-neutral-700 dark:text-neutral-200" />
        ),
      },
    ];
    const [open, setOpen] = useState(false);
    return (
      <div
        className={cn(
          "mx-auto flex w-full max-w-8xl flex-1 flex-col overflow-hidden border border-neutral-200 bg-gray-100 md:flex-row dark:border-neutral-700 dark:bg-neutral-800",
          "h-screen", // for your use case, use `h-screen` instead of `h-[60vh]`
        )}
      >
        <Sidebar open={open} setOpen={setOpen}>
          <SidebarBody className="justify-between gap-10">
            <div className="flex flex-1 flex-col overflow-x-hidden overflow-y-auto">
              {open ? <Logo /> : <LogoIcon />}
              <div className="mt-8 flex flex-col gap-2">
                {links.map((link, idx) => (
                  <SidebarLink key={idx} link={link} />
                ))}
              </div>
            </div>
            <div>
              <SidebarLink
                link={{
                  label: "Manu Arora",
                  href: "#",
                  icon: (
                    <Image
                      src="https://assets.aceternity.com/manu.png"
                      className="h-7 w-7 shrink-0 rounded-full"
                      width={50}
                      height={50}
                      alt="Avatar"
                    />
                  ),
                }}
              />
            </div>
          </SidebarBody>
        </Sidebar>
        <div className="flex flex-1">
            <div className="flex h-full w-2xl flex-1 flex-col gap-2 rounded-tl-2xl border border-neutral-200 bg-white p-2 md:p-10 dark:border-neutral-700 dark:bg-neutral-900">
                {children}
            </div>
        </div>

      </div>
    );
  }
  export const Logo = () => {
    return (
      <Link
        href="#"
        className="relative z-20 flex items-center space-x-2 pt-1 text-sm font-normal text-black"
      >
        <Image src='/logo.jpg' width={24} height={24} alt="logo" className="rounded-full " />

      </Link>
    );
  };
  export const LogoIcon = () => {
    return (
      <Link
        href="#"
        className="relative z-20 flex items-center space-x-2 pt-1 text-sm font-normal text-black"
      >
        <Image src='/logo.jpg' width={24} height={24} alt="logo" className="rounded-full " />
      </Link>
    );
  };

export default layout;