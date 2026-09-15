import { Suspense } from "react";
import PaymentContent from "./payment-content";

function PaymentFallback() {
  return (
    <div className="min-h-screen bg-navy-50">
      <div className="page-wrap py-10">
        <div className="h-8 w-40 animate-pulse rounded-lg bg-navy-100" />
        <div className="mt-6 grid gap-6 lg:grid-cols-12">
          <div className="h-96 animate-pulse rounded-2xl bg-white lg:col-span-7" />
          <div className="h-72 animate-pulse rounded-2xl bg-white lg:col-span-5" />
        </div>
      </div>
    </div>
  );
}

export default function PaymentPage() {
  return (
    <Suspense fallback={<PaymentFallback />}>
      <PaymentContent />
    </Suspense>
  );
}
