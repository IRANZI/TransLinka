"use client";

import { Suspense } from "react";
import SelectSeats from "./SelectSeats"; 

export default function SelectSeatsPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <SelectSeats />
    </Suspense>
  );
}
