"use client";

import React, { use, useState } from "react";
import { Sidebar, SidebarBody, SidebarLink } from "@/components/ui/sidebar";
import {
  IconArrowLeft,
  IconBrandTabler,
  IconSettings,
  IconUserBolt,
} from "@tabler/icons-react";
import { Library, NotebookPen } from "lucide-react";
import Link from "next/link";
import { motion } from "motion/react";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { useEffect } from "react";
import axios from "axios";

const layout = ({ children }: { children: React.ReactNode }) => {
  const links = [
    {
      label: "All Courses",
      href: "/all-courses",
      icon: (
        <Library className="h-5 w-5 shrink-0 text-black dark:text-neutral-200" />
      ),
    },
    {
      label: "Purchased Courses",
      href: "/purchased-courses",
      icon: (
        <NotebookPen className="h-5 w-5 shrink-0 text-black dark:text-neutral-200" />
      ),
    },
    // {
    //   label: "Settings",
    //   href: "#",
    //   icon: (
    //     <IconSettings className="h-5 w-5 shrink-0 text-neutral-700 dark:text-neutral-200" />
    //   ),
    // },
    {
      label: "Logout",
      href: "/login",
      icon: (
        <IconArrowLeft className="h-5 w-5 shrink-0 text-black dark:text-neutral-200" />
      ),
    },
  ];
  const [open, setOpen] = useState(false);
  const [storeUserData, setStoreUserData] = useState({});

  const fetchLoggedInUser = async () => {
    try {
      await axios
        .get("https://muzik-mgj9.onrender.com/api/user/me", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        })
        .then((response) => {
          setStoreUserData(response?.data?.user);
        })
        .catch((error) => {
          console.log("error", error);
        });
    } catch (error) {
      console.error("Error fetching logged in user data", error);
    }
  };

  useEffect(() => {
    fetchLoggedInUser();
  }, []);

  return (
    <div
      className={cn(
        "mx-auto flex w-full max-w-8xl flex-1 flex-col overflow-hidden bg-neutral-200 md:flex-row dark:border-neutral-700 dark:bg-neutral-800",
        "h-screen" // for your use case, use `h-screen` instead of `h-[60vh]`
      )}
    >
      <Sidebar open={open} setOpen={setOpen}>
        <SidebarBody className="justify-between gap-10">
          <div className="flex flex-1 flex-col overflow-x-hidden overflow-y-auto">
            {open ? <Logo /> : <LogoIcon />}
            <div className="mt-8 flex flex-col gap-2">
              {links.map((link, idx) => {
                console.log("sdjfhuidbf", link);
                if (link?.label === "Logout") {
                  return (
                    <SidebarLink
                      key={idx}
                      link={link}
                      onClick={() => {
                        localStorage.removeItem("token");
                        window.location.href = "/login";
                      }}
                    />
                  );
                } else {
                  return <SidebarLink key={idx} link={link} />;
                }
              })}
            </div>
          </div>
          <div>
            <SidebarLink
              link={{
                label: storeUserData?.email,
                href: "#",
                icon: (
                  <Image
                    src="/avatar.jpg"
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
        <div className="flex h-auto w-2xl flex-1 flex-col gap-2 rounded-tl-2xl md:p-10 dark:border-neutral-700 dark:bg-neutral-900 bg-white">
          {children}
        </div>
      </div>
    </div>
  );
};
export const Logo = () => {
  return (
    <Link
      href="/"
      className="relative z-20 flex items-center space-x-2 pt-1 text-sm font-normal text-black"
    >
      <Image
        src="/logo.jpg"
        width={24}
        height={24}
        alt="logo"
        className="rounded-full "
      />
    </Link>
  );
};
export const LogoIcon = () => {
  return (
    <Link
      href="/"
      className="relative z-20 flex items-center space-x-2 pt-1 text-sm font-normal  text-black"
    >
      <Image
        src="/logo.jpg"
        width={24}
        height={24}
        alt="logo"
        className="rounded-full "
      />
    </Link>
  );
};

export default layout;
