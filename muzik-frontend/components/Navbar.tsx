"use client";

import React, { useState } from "react";
import { HoveredLink, Menu, MenuItem, ProductItem } from "@/components/ui/navbar-menu";
import { cn } from "@/lib/utils";
import Link from "next/link";
import Image from "next/image";
import { SquareMenu } from "lucide-react";
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuLabel, 
  DropdownMenuSeparator, 
  DropdownMenuTrigger 
} from "./ui/dropdown-menu";
import { Button } from "./ui/button";

export function NavbarDemo() {
  return (
    <div className="relative w-full flex items-center justify-center">
      <Navbar className="top-2" />
      <p className="text-black dark:text-white">The Navbar will show on top of the page</p>
    </div>
  );
}

function Navbar({ className }: { className?: string }) {
  const [active, setActive] = useState<string | null>(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleLogin = () => {
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
  };

  return (
    <div className={cn("fixed top-10 inset-x-0 max-w-7xl mx-auto z-50 -mt-5", className)}>
      <Menu setActive={setActive}>
        <div className="flex items-center justify-between w-full">
          <div>
            <Link href="/" className="flex items-center space-x-3 text-xl font-bold shrink-0 bg-white rounded-full">
              <Image src="/logo.jpg" alt="MUZIK" width={40} height={40} className="rounded-full p-2" />
            </Link>
          </div>

          {/* Desktop Menu Items */}
          <div className="hidden md:flex items-center justify-center mx-auto">
            <div className="flex items-center gap-8">
              <ul className="flex items-center space-x-6 text-black">
                <li><Link href='/'>Home</Link></li>
                <li><Link href='/About'>About</Link></li>
                <li><Link href='#courses'>Courses</Link></li>
                {/* <li><Link href='#services'>Services</Link></li> */}
                <li><Link href='#contact'>Contact</Link></li>
              </ul>
            </div>
          </div>

          {/* Desktop Login Button / Avatar */}
          <div className="hidden md:block">
            <div className="flex items-center space-x-3 shrink-0 relative">
              {isLoggedIn ? (
                <div className="relative">
                  <Image
                    src="/avatar.jpg"
                    alt="Avatar"
                    width={40}
                    height={40}
                    className="rounded-full cursor-pointer"
                  />
                  <div className="absolute right-0 mt-2 bg-white p-3 rounded-lg shadow-lg w-40">
                    <p className="text-sm font-semibold text-gray-700">John Doe</p>
                    <p className="text-xs text-gray-500">johndoe@example.com</p>
                    <Button
                      onClick={handleLogout} variant="outline"
                      className="mt-2 w-full text-left text-sm text-red-600 hover:underline"
                    >
                      Logout
                    </Button>
                  </div>
                </div>
              ) : (
                <Button variant="outline" 
                  onClick={handleLogin}
                  className="text-black text-xs font-semibold bg-white p-3 rounded-full"
                >
                  Log in
                </Button>
              )}
            </div>
          </div>

          {/* Mobile Menu */}
          <div className="md:hidden ">
            <DropdownMenu>
              <DropdownMenuTrigger><SquareMenu className="text-black"/></DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuLabel>Menu</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <Link href='/'><DropdownMenuItem>Home</DropdownMenuItem></Link>
                <Link href='#about'><DropdownMenuItem>About</DropdownMenuItem></Link>
                <Link href='#courses'><DropdownMenuItem>Courses</DropdownMenuItem></Link>
                {/* <Link href='#services'><DropdownMenuItem>Services</DropdownMenuItem></Link> */}
                <Link href='#contact'><DropdownMenuItem>Contact</DropdownMenuItem></Link>
                <DropdownMenuSeparator />

                {/* User Info & Logout inside Dropdown */}
                {isLoggedIn ? (
                  <>
                    <DropdownMenuItem className="flex flex-col items-start">
                      <p className="text-sm font-semibold text-gray-700">John Doe</p>
                      <p className="text-xs text-gray-500">johndoe@example.com</p>
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={handleLogout} className="text-red-600">
                      Logout
                    </DropdownMenuItem>
                  </>
                ) : (
                  <DropdownMenuItem>
                    <Button variant="outline" 
                      onClick={handleLogin}
                      className="text-black text-xs font-semibold bg-white p-3 rounded-full w-full"
                    >
                      Log in
                    </Button>
                  </DropdownMenuItem>
                )}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>

        </div>
      </Menu>
    </div>
  );
}

export default Navbar;
