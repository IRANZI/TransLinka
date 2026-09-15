import { Suspense } from "react";
import BookingConfirmationPage from "./booking_confirmation";

export default function Page() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <BookingConfirmationPage />
    </Suspense>
  );
}
