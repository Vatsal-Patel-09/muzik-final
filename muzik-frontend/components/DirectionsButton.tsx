"use client";

import { Button } from "@/components/ui/button"; // Adjust the import based on your setup

export default function DirectionsButton({ className = "" }) {
  const handleClick = () => {
    const placeId = "0x395e85ec707d29a9:0xfb32f2b2ef518ccf";
    const url = `https://www.google.com/maps/dir/?api=1&destination=place_id:${placeId}`;
    window.open(url, "_blank"); // Opens Google Maps directions in a new tab
  };

  return (
    <Button onClick={handleClick} className={className}>
      Get Directions
    </Button>
  );
}
