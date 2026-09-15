"use client";

import { useEffect, useMemo, useState, type ReactNode } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import {
  AlertCircle,
  ArrowLeft,
  Calendar,
  Check,
  Clock,
  CreditCard,
  Lock,
  MapPin,
  Plus,
  ShieldCheck,
  Smartphone,
  Users,
  Wallet,
  WalletCards,
  X,
} from "lucide-react";
import AppHeader from "@/components/AppHeader";
import { api } from "@/lib/api";
import { useAuth } from "@/components/AuthProvider";

type PayMethod = "momo" | "card" | "wallet" | "digital";
type DigitalWallet = "apple" | "google" | "paypal";
type MomoNetwork = "mtn" | "airtel";

function VisaMark() {
  return (
    <span className="inline-flex items-center rounded-[4px] border border-navy-100 bg-white px-1.5 py-0.5 text-[11px] font-black tracking-wide text-[#1A1F71]">
      VISA
    </span>
  );
}

function MastercardMark() {
  return (
    <svg className="h-5 w-8" viewBox="0 0 32 20" aria-hidden="true">
      <circle cx="12" cy="10" r="8" fill="#EB001B" />
      <circle cx="20" cy="10" r="8" fill="#F79E1B" />
      <path d="M16 4.2a8 8 0 010 11.6 8 8 0 010-11.6z" fill="#FF5F00" />
    </svg>
  );
}

function ApplePayMark() {
  return (
    <span className="inline-flex items-center gap-1.5 text-navy-900">
      <svg className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
        <path d="M16.365 12.74c-.027-2.55 2.084-3.77 2.177-3.83-1.187-1.736-3.037-1.976-3.688-2.003-1.57-.16-3.063.92-3.86.92-.81 0-2.013-.897-3.316-.873-1.707.025-3.29.995-4.166 2.53-1.785 3.093-.456 7.666 1.281 10.174.85 1.222 1.858 2.59 3.187 2.54 1.287-.05 1.772-.822 3.33-.822 1.555 0 1.98.822 3.336.797 1.383-.025 2.25-1.222 3.094-2.447.608-.887.86-1.358 1.347-2.38-3.542-1.358-3.405-3.984-3.322-4.106zm-3.207-7.92c.708-.857 1.188-2.056 1.057-3.27-1.022.041-2.255.68-2.99 1.536-.657.754-1.23 1.96-1.014 3.112 1.129.087 2.24-.574 2.947-1.378z" />
      </svg>
      <span className="text-base font-semibold tracking-tight">Pay</span>
    </span>
  );
}

function GooglePayMark() {
  return (
    <span className="inline-flex items-center gap-2">
      <svg className="h-5 w-5" viewBox="0 0 24 24" aria-hidden="true">
        <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
        <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
        <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
        <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
      </svg>
      <span className="text-base font-semibold text-navy-900">Pay</span>
    </span>
  );
}

function PayPalMark() {
  return (
    <svg className="h-6 w-6" viewBox="0 0 24 24" aria-hidden="true">
      <path fill="#003087" d="M7.2 21.5H4.1c-.3 0-.5-.3-.5-.6L6 3.4c.1-.5.5-.9 1-.9h7.2c3.2 0 5.3 1.6 5 4.6-.3 3.4-2.5 5.3-5.8 5.3H10l-.9 9.1z" />
      <path fill="#009CDE" d="M9.3 12.4h3.2c3.3 0 5.5-1.9 5.8-5.3.1-.8 0-1.5-.3-2.1 1.8 1.1 2.6 3 2.3 5.6-.4 3.6-3 5.6-6.5 5.6h-2.6L10 21.5H7.4l1.9-9.1z" />
    </svg>
  );
}

function MomoMark() {
  return (
    <span className="inline-flex items-center gap-2">
      <span className="flex h-7 w-7 items-center justify-center rounded-md bg-[#FFCC00] text-[10px] font-black text-navy-950">
        Mo
      </span>
      <span className="text-sm font-semibold text-navy-900">MoMo</span>
    </span>
  );
}

function AirtelMark() {
  return (
    <span className="inline-flex items-center gap-2">
      <span className="flex h-7 w-7 items-center justify-center rounded-md bg-[#ED1C24] text-[9px] font-black text-white">
        A
      </span>
      <span className="text-sm font-semibold text-navy-900">Airtel Money</span>
    </span>
  );
}

function formatCardNumber(value: string) {
  return value.replace(/\D/g, "").slice(0, 16).replace(/(.{4})/g, "$1 ").trim();
}

function formatExpiry(value: string) {
  const digits = value.replace(/\D/g, "").slice(0, 4);
  if (digits.length <= 2) return digits;
  return `${digits.slice(0, 2)}/${digits.slice(2)}`;
}

function cardBrand(number: string) {
  const digits = number.replace(/\s/g, "");
  if (digits.startsWith("4")) return "visa";
  if (/^5[1-5]/.test(digits) || /^2[2-7]/.test(digits)) return "mastercard";
  return null;
}

function money(value: number) {
  return `${value.toLocaleString()} Rwf`;
}

export default function PaymentPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { user, setUser, refresh, loading: authLoading } = useAuth();

  const bookingType = searchParams.get("bookingType") || "individual";
  const parsedTotal = parseInt(
    String(
      searchParams.get("total") ||
        searchParams.get("totalPrice") ||
        searchParams.get("price") ||
        (bookingType === "charter" ? "80000" : "2000")
    ).replace(/[^\d]/g, ""),
    10
  );
  const bookingDetails = {
    from: searchParams.get("from") || "Remera",
    to: searchParams.get("to") || "Masaka",
    date: searchParams.get("date") || "Today",
    departureTime: searchParams.get("departureTime") || "9:00 PM",
    company: searchParams.get("company") || "City Express",
    passengers: parseInt(searchParams.get("passengers") || "1", 10),
    selectedSeats: searchParams.get("seats")?.split(",").filter(Boolean) || ["A1"],
    totalPrice: Number.isNaN(parsedTotal) ? 2300 : parsedTotal,
    bookingType,
  };

  const [paymentMethod, setPaymentMethod] = useState<PayMethod>("momo");
  const [momoNetwork, setMomoNetwork] = useState<MomoNetwork>("mtn");
  const [momoPhone, setMomoPhone] = useState("");
  const [digitalWallet, setDigitalWallet] = useState<DigitalWallet>("apple");
  const [walletBalance, setWalletBalance] = useState(0);

  useEffect(() => {
    if (user) setWalletBalance(user.walletBalance);
    if (user?.phone && !momoPhone) setMomoPhone(user.phone);
  }, [user]);
  const [showAddMoneyModal, setShowAddMoneyModal] = useState(false);
  const [addMoneyAmount, setAddMoneyAmount] = useState("");
  const [addMoneyPaymentMethod, setAddMoneyPaymentMethod] = useState<"card" | "momo">("momo");
  const [processing, setProcessing] = useState(false);
  const [error, setError] = useState("");
  const [cardDetails, setCardDetails] = useState({
    number: "",
    expiry: "",
    cvv: "",
    name: "",
  });

  const baseFare = bookingDetails.bookingType === "charter" ? 150000 : 2000;
  const serviceFee = bookingDetails.bookingType === "charter" ? 5000 : 300;
  const walletShortfall = Math.max(0, bookingDetails.totalPrice - walletBalance);
  const detectedBrand = cardBrand(cardDetails.number);

  const payLabel = useMemo(() => {
    const amount = money(bookingDetails.totalPrice);
    if (paymentMethod === "momo") return `Pay ${amount} with MoMo`;
    if (paymentMethod === "card") return `Pay ${amount}`;
    if (paymentMethod === "wallet") return `Pay ${amount} from wallet`;
    if (digitalWallet === "apple") return `Pay ${amount} with Apple Pay`;
    if (digitalWallet === "google") return `Pay ${amount} with Google Pay`;
    return `Pay ${amount} with PayPal`;
  }, [bookingDetails.totalPrice, paymentMethod, digitalWallet]);

  const walletBlocked = paymentMethod === "wallet" && walletBalance < bookingDetails.totalPrice;

  const handleAddMoney = async () => {
    const amount = parseInt(addMoneyAmount, 10);
    if (!amount || amount <= 0) {
      setError("Enter an amount to add.");
      return;
    }
    try {
      const updated = await api<{ walletBalance: number; user: typeof user }>("/api/wallet", {
        method: "POST",
        body: JSON.stringify({ amount, method: addMoneyPaymentMethod }),
      });
      setWalletBalance(updated.walletBalance);
      if (updated.user) setUser(updated.user);
      setAddMoneyAmount("");
      setShowAddMoneyModal(false);
      setError("");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Could not add money");
    }
  };

  const validate = () => {
    if (paymentMethod === "wallet" && walletBalance < bookingDetails.totalPrice) {
      return "Not enough wallet balance. Add money, or choose another method.";
    }
    if (paymentMethod === "card") {
      const digits = cardDetails.number.replace(/\s/g, "");
      if (digits.length < 13) return "Enter a valid card number.";
      if (cardDetails.expiry.length < 5) return "Enter the expiry as MM/YY.";
      if (cardDetails.cvv.length < 3) return "Enter the CVV on the back of your card.";
      if (!cardDetails.name.trim()) return "Enter the name on the card.";
    }
    if (paymentMethod === "momo") {
      const phone = momoPhone.replace(/[\s\-()]/g, "");
      if (phone.length < 9) return "Enter the mobile money number that will receive the prompt.";
    }
    return "";
  };

  const handlePayment = async () => {
    const message = validate();
    if (message) {
      setError(message);
      return;
    }
    if (authLoading) return;
    if (!user) {
      window.location.href = `/signin?next=${encodeURIComponent(window.location.pathname + window.location.search)}`;
      return;
    }
    setError("");
    setProcessing(true);
    try {
      const result = await api<{
        booking: { reference: string; id: string; amount: number; seats: string[]; origin: string; destination: string; travelDate: string };
        payment: { transactionId: string; method: string; status: string };
        walletBalance?: number;
      }>("/api/payments", {
        method: "POST",
        body: JSON.stringify({
          routeId: searchParams.get("routeId"),
          busId: searchParams.get("busId"),
          from: bookingDetails.from,
          to: bookingDetails.to,
          origin: bookingDetails.from,
          destination: bookingDetails.to,
          travelDate: bookingDetails.date,
          seats: bookingDetails.selectedSeats,
          passengers: bookingDetails.passengers,
          bookingType: bookingDetails.bookingType,
          method: paymentMethod.toUpperCase(),
          provider: paymentMethod === "momo" ? momoNetwork : paymentMethod === "digital" ? digitalWallet : paymentMethod,
          momoPhone,
          cardLast4: cardDetails.number.replace(/\s/g, "").slice(-4),
        }),
      });
      await refresh();
      const params = new URLSearchParams({
        from: result.booking.origin,
        to: result.booking.destination,
        date: bookingDetails.date,
        passengers: bookingDetails.passengers.toString(),
        seats: result.booking.seats.join(","),
        total: String(result.booking.amount),
        bookingType: bookingDetails.bookingType,
        reference: result.booking.reference,
        method: result.payment?.method || paymentMethod.toUpperCase(),
        transactionId: result.payment?.transactionId || "",
      });
      router.push(`/booking-confirmation?${params.toString()}`);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Payment failed");
      setProcessing(false);
    }
  };

  const methods: { id: PayMethod; label: string; hint: string; icon: ReactNode }[] = [
    {
      id: "momo",
      label: "Mobile Money",
      hint: "MoMo & Airtel",
      icon: <Smartphone className="h-5 w-5" />,
    },
    {
      id: "card",
      label: "Card",
      hint: "Visa, Mastercard",
      icon: <CreditCard className="h-5 w-5" />,
    },
    {
      id: "wallet",
      label: "Wallet",
      hint: money(walletBalance),
      icon: <Wallet className="h-5 w-5" />,
    },
    {
      id: "digital",
      label: "Apple / Google",
      hint: "PayPal too",
      icon: <WalletCards className="h-5 w-5" />,
    },
  ];

  return (
    <div className="min-h-screen bg-navy-50 pb-28 lg:pb-10">
      <AppHeader />

      {showAddMoneyModal && (
        <div className="fixed inset-0 z-50 flex items-end justify-center bg-navy-950/50 p-0 sm:items-center sm:p-4">
          <div
            role="dialog"
            aria-modal="true"
            aria-labelledby="add-money-title"
            className="max-h-[92svh] w-full overflow-y-auto rounded-t-3xl bg-white p-5 shadow-lift sm:max-w-md sm:rounded-2xl sm:p-6"
          >
            <div className="mb-5 flex items-center justify-between">
              <div>
                <h2 id="add-money-title" className="text-xl font-bold text-navy-900">
                  Add money
                </h2>
                <p className="mt-1 text-sm text-navy-500">Top up your TransLinka wallet</p>
              </div>
              <button
                type="button"
                onClick={() => setShowAddMoneyModal(false)}
                className="rounded-full p-2 text-navy-400 hover:bg-navy-50 hover:text-navy-800"
                aria-label="Close"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <label className="mb-2 block text-sm font-medium text-navy-700">Amount (Rwf)</label>
            <input
              type="number"
              inputMode="numeric"
              placeholder="5,000"
              value={addMoneyAmount}
              onChange={(e) => setAddMoneyAmount(e.target.value)}
              className="mb-3 w-full rounded-xl border border-navy-100 bg-navy-50/60 px-4 py-3 text-navy-900 outline-none focus:border-navy-500 focus:bg-white focus:ring-2 focus:ring-navy-500/20"
            />
            <div className="mb-5 grid grid-cols-4 gap-2">
              {["2000", "5000", "10000", "20000"].map((amount) => (
                <button
                  key={amount}
                  type="button"
                  onClick={() => setAddMoneyAmount(amount)}
                  className={`rounded-lg border py-2 text-xs font-semibold sm:text-sm ${
                    addMoneyAmount === amount
                      ? "border-navy-700 bg-navy-700 text-white"
                      : "border-navy-100 bg-navy-50 text-navy-800"
                  }`}
                >
                  {parseInt(amount, 10).toLocaleString()}
                </button>
              ))}
            </div>

            <p className="mb-3 text-sm font-medium text-navy-700">Pay with</p>
            <div className="mb-5 grid grid-cols-2 gap-3">
              <button
                type="button"
                onClick={() => setAddMoneyPaymentMethod("momo")}
                className={`flex items-center justify-center gap-2 rounded-xl border px-3 py-3 text-sm font-semibold ${
                  addMoneyPaymentMethod === "momo"
                    ? "border-navy-700 bg-navy-50 text-navy-900"
                    : "border-navy-100 text-navy-700"
                }`}
              >
                <Smartphone className="h-4 w-4" />
                MoMo
              </button>
              <button
                type="button"
                onClick={() => setAddMoneyPaymentMethod("card")}
                className={`flex items-center justify-center gap-2 rounded-xl border px-3 py-3 text-sm font-semibold ${
                  addMoneyPaymentMethod === "card"
                    ? "border-navy-700 bg-navy-50 text-navy-900"
                    : "border-navy-100 text-navy-700"
                }`}
              >
                <CreditCard className="h-4 w-4" />
                Card
              </button>
            </div>

            <div className="flex gap-3">
              <button type="button" onClick={() => setShowAddMoneyModal(false)} className="btn-secondary flex-1">
                Cancel
              </button>
              <button type="button" onClick={handleAddMoney} className="btn-primary flex-1">
                Add money
              </button>
            </div>
          </div>
        </div>
      )}

      <main className="page-wrap py-5 sm:py-8">
        <button
          type="button"
          onClick={() => router.back()}
          className="mb-4 inline-flex items-center gap-1.5 text-sm font-medium text-navy-600 hover:text-navy-900"
        >
          <ArrowLeft className="h-4 w-4" />
          Back
        </button>

        <div className="mb-6 flex flex-col gap-3 sm:mb-8 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-label text-navy-500">Secure checkout</p>
            <h1 className="mt-1 text-2xl font-bold text-navy-900 sm:text-3xl">Payment</h1>
            <p className="mt-1 text-sm text-navy-600 sm:text-base">
              Choose how you want to pay for this trip.
            </p>
          </div>
          <ol className="flex items-center gap-2 text-xs font-semibold text-navy-400 sm:text-sm">
            <li>Seats</li>
            <li className="h-px w-6 bg-navy-200" />
            <li className="text-navy-800">Payment</li>
            <li className="h-px w-6 bg-navy-200" />
            <li>Ticket</li>
          </ol>
        </div>

        <div className="grid grid-cols-1 items-start gap-6 lg:grid-cols-12">
          <section className="space-y-5 lg:col-span-7">
            <div className="rounded-2xl border border-navy-100 bg-white p-4 shadow-soft sm:p-6">
              <h2 className="mb-4 text-base font-semibold text-navy-900 sm:text-lg">Payment method</h2>
              <div className="grid grid-cols-2 gap-3">
                {methods.map((method) => {
                  const selected = paymentMethod === method.id;
                  return (
                    <button
                      key={method.id}
                      type="button"
                      onClick={() => {
                        setPaymentMethod(method.id);
                        setError("");
                      }}
                      className={`flex flex-col items-start rounded-xl border p-3 text-left transition sm:p-3.5 ${
                        selected
                          ? "border-navy-700 bg-navy-50 ring-2 ring-navy-700/15"
                          : "border-navy-100 hover:border-navy-300"
                      }`}
                      aria-pressed={selected}
                    >
                      <span
                        className={`mb-2 flex h-9 w-9 items-center justify-center rounded-lg ${
                          selected ? "bg-navy-700 text-white" : "bg-navy-50 text-navy-700"
                        }`}
                      >
                        {method.icon}
                      </span>
                      <span className="text-sm font-semibold text-navy-900">{method.label}</span>
                      <span className="mt-0.5 text-[11px] text-navy-500 sm:text-xs">{method.hint}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {paymentMethod === "momo" && (
              <div className="rounded-2xl border border-navy-100 bg-white p-4 shadow-soft sm:p-6">
                <h3 className="mb-4 text-base font-semibold text-navy-900">Mobile money</h3>
                <div className="mb-4 grid grid-cols-1 gap-3 sm:grid-cols-2">
                  <button
                    type="button"
                    onClick={() => setMomoNetwork("mtn")}
                    className={`flex items-center justify-between rounded-xl border px-4 py-3 ${
                      momoNetwork === "mtn"
                        ? "border-navy-700 bg-navy-50"
                        : "border-navy-100"
                    }`}
                  >
                    <MomoMark />
                    {momoNetwork === "mtn" && <Check className="h-4 w-4 text-navy-700" />}
                  </button>
                  <button
                    type="button"
                    onClick={() => setMomoNetwork("airtel")}
                    className={`flex items-center justify-between rounded-xl border px-4 py-3 ${
                      momoNetwork === "airtel"
                        ? "border-navy-700 bg-navy-50"
                        : "border-navy-100"
                    }`}
                  >
                    <AirtelMark />
                    {momoNetwork === "airtel" && <Check className="h-4 w-4 text-navy-700" />}
                  </button>
                </div>
                <label className="mb-2 block text-sm font-medium text-navy-700">Phone number</label>
                <div className="relative">
                  <Smartphone className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-navy-400" />
                  <input
                    type="tel"
                    inputMode="tel"
                    name="momoPhone"
                    autoComplete="tel"
                    placeholder="+250 7..."
                    value={momoPhone}
                    onChange={(e) => setMomoPhone(e.target.value)}
                    className="input-field"
                  />
                </div>
                <p className="mt-3 text-sm text-navy-500">
                  You will get a prompt on this number to approve the payment.
                </p>
              </div>
            )}

            {paymentMethod === "card" && (
              <div className="rounded-2xl border border-navy-100 bg-white p-4 shadow-soft sm:p-6">
                <div className="mb-4 flex items-center justify-between gap-3">
                  <h3 className="text-base font-semibold text-navy-900">Card details</h3>
                  <div className="flex items-center gap-2 rounded-lg border border-navy-100 bg-white px-2 py-1">
                    <span className={detectedBrand === "mastercard" ? "opacity-30" : ""}>
                      <VisaMark />
                    </span>
                    <span className={detectedBrand === "visa" ? "opacity-30" : ""}>
                      <MastercardMark />
                    </span>
                  </div>
                </div>

                <div className="space-y-4">
                  <div>
                    <label className="mb-2 block text-sm font-medium text-navy-700">Card number</label>
                    <div className="relative">
                      <CreditCard className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-navy-400" />
                      <input
                        type="text"
                        inputMode="numeric"
                        autoComplete="cc-number"
                        placeholder="ACCT-000015"
                        value={cardDetails.number}
                        onChange={(e) =>
                          setCardDetails({ ...cardDetails, number: formatCardNumber(e.target.value) })
                        }
                        className="input-field pr-16"
                      />
                      <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2">
                        {detectedBrand === "visa" && <VisaMark />}
                        {detectedBrand === "mastercard" && <MastercardMark />}
                      </span>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="mb-2 block text-sm font-medium text-navy-700">Expiry</label>
                      <input
                        type="text"
                        inputMode="numeric"
                        autoComplete="cc-exp"
                        placeholder="MM/YY"
                        value={cardDetails.expiry}
                        onChange={(e) =>
                          setCardDetails({ ...cardDetails, expiry: formatExpiry(e.target.value) })
                        }
                        className="w-full rounded-xl border border-navy-100 bg-navy-50/60 px-4 py-3 text-sm text-navy-900 outline-none focus:border-navy-500 focus:bg-white focus:ring-2 focus:ring-navy-500/20 sm:text-base"
                      />
                    </div>
                    <div>
                      <label className="mb-2 block text-sm font-medium text-navy-700">CVV</label>
                      <input
                        type="password"
                        inputMode="numeric"
                        autoComplete="cc-csc"
                        placeholder="123"
                        maxLength={4}
                        value={cardDetails.cvv}
                        onChange={(e) =>
                          setCardDetails({
                            ...cardDetails,
                            cvv: e.target.value.replace(/\D/g, "").slice(0, 4),
                          })
                        }
                        className="w-full rounded-xl border border-navy-100 bg-navy-50/60 px-4 py-3 text-sm text-navy-900 outline-none focus:border-navy-500 focus:bg-white focus:ring-2 focus:ring-navy-500/20 sm:text-base"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="mb-2 block text-sm font-medium text-navy-700">Name on card</label>
                    <input
                      type="text"
                      autoComplete="cc-name"
                      placeholder="Name as printed on the card"
                      value={cardDetails.name}
                      onChange={(e) => setCardDetails({ ...cardDetails, name: e.target.value })}
                      className="w-full rounded-xl border border-navy-100 bg-navy-50/60 px-4 py-3 text-sm text-navy-900 outline-none focus:border-navy-500 focus:bg-white focus:ring-2 focus:ring-navy-500/20 sm:text-base"
                    />
                  </div>
                </div>
              </div>
            )}

            {paymentMethod === "wallet" && (
              <div className="rounded-2xl border border-navy-100 bg-white p-4 shadow-soft sm:p-6">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <h3 className="text-base font-semibold text-navy-900">TransLinka wallet</h3>
                    <p className="mt-1 text-sm text-navy-500">Pay instantly from your stored balance.</p>
                  </div>
                  <button
                    type="button"
                    onClick={() => setShowAddMoneyModal(true)}
                    className="inline-flex items-center gap-1 rounded-xl bg-navy-700 px-3 py-2 text-sm font-semibold text-white hover:bg-navy-800"
                  >
                    <Plus className="h-4 w-4" />
                    Add
                  </button>
                </div>
                <div className="mt-4 rounded-xl bg-navy-50 px-4 py-4">
                  <p className="text-xs font-medium uppercase tracking-wide text-navy-500">Available</p>
                  <p className="mt-1 text-2xl font-bold text-navy-900">{money(walletBalance)}</p>
                </div>
                {walletShortfall > 0 && (
                  <div className="mt-4 flex items-start gap-2 rounded-xl border border-amber-200 bg-amber-50 p-3 text-sm text-amber-900">
                    <AlertCircle className="mt-0.5 h-4 w-4 shrink-0" />
                    <span>
                      You need {money(walletShortfall)} more. Add money or switch to MoMo or card.
                    </span>
                  </div>
                )}
              </div>
            )}

            {paymentMethod === "digital" && (
              <div className="rounded-2xl border border-navy-100 bg-white p-4 shadow-soft sm:p-6">
                <h3 className="mb-4 text-base font-semibold text-navy-900">Express wallets</h3>
                <div className="space-y-3">
                  {(
                    [
                      { id: "apple" as const, label: <ApplePayMark /> },
                      { id: "google" as const, label: <GooglePayMark /> },
                      { id: "paypal" as const, label: <span className="inline-flex items-center gap-2"><PayPalMark /><span className="font-semibold text-navy-900">PayPal</span></span> },
                    ]
                  ).map((wallet) => (
                    <button
                      key={wallet.id}
                      type="button"
                      onClick={() => setDigitalWallet(wallet.id)}
                      className={`flex w-full items-center justify-between rounded-xl border px-4 py-3.5 ${
                        digitalWallet === wallet.id
                          ? "border-navy-700 bg-navy-50"
                          : "border-navy-100 hover:border-navy-300"
                      }`}
                    >
                      {wallet.label}
                      {digitalWallet === wallet.id && <Check className="h-4 w-4 text-navy-700" />}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {error && (
              <div className="flex items-start gap-2 rounded-xl border border-rose-200 bg-rose-50 p-3 text-sm text-rose-800">
                <AlertCircle className="mt-0.5 h-4 w-4 shrink-0" />
                {error}
              </div>
            )}

            <div className="flex items-start gap-2 rounded-xl border border-emerald-100 bg-emerald-50 p-3 text-sm text-emerald-900">
              <ShieldCheck className="mt-0.5 h-4 w-4 shrink-0" />
              <span>Your payment is encrypted. TransLinka never stores full card numbers.</span>
            </div>

            <button
              type="button"
              onClick={handlePayment}
              disabled={walletBlocked || processing || authLoading}
              className="btn-primary hidden w-full disabled:cursor-not-allowed disabled:bg-navy-300 lg:inline-flex"
            >
              <Lock className="h-4 w-4" />
              {processing ? "Processing…" : payLabel}
            </button>
          </section>

          <aside className="lg:col-span-5">
            <div className="rounded-2xl border border-navy-100 bg-white p-4 shadow-soft sm:p-6 lg:sticky lg:top-24">
              <h2 className="text-base font-semibold text-navy-900 sm:text-lg">Trip summary</h2>
              <div className="mt-4 flex items-start gap-3">
                <span className="mt-0.5 flex h-9 w-9 items-center justify-center rounded-lg bg-navy-50 text-navy-700">
                  <MapPin className="h-4 w-4" />
                </span>
                <div>
                  <p className="font-semibold text-navy-900">
                    {bookingDetails.from} → {bookingDetails.to}
                  </p>
                  <p className="text-sm text-navy-500">{bookingDetails.company}</p>
                </div>
              </div>

              <dl className="mt-4 space-y-3 text-sm">
                <div className="flex items-center justify-between">
                  <dt className="inline-flex items-center gap-2 text-navy-500">
                    <Calendar className="h-4 w-4" />
                    Date
                  </dt>
                  <dd className="font-medium text-navy-900">{bookingDetails.date}</dd>
                </div>
                <div className="flex items-center justify-between">
                  <dt className="inline-flex items-center gap-2 text-navy-500">
                    <Clock className="h-4 w-4" />
                    Departure
                  </dt>
                  <dd className="font-medium text-navy-900">{bookingDetails.departureTime}</dd>
                </div>
                <div className="flex items-center justify-between">
                  <dt className="inline-flex items-center gap-2 text-navy-500">
                    <Users className="h-4 w-4" />
                    {bookingDetails.bookingType === "charter" ? "Charter" : "Seats"}
                  </dt>
                  <dd className="font-medium text-navy-900">
                    {bookingDetails.bookingType === "charter"
                      ? "Full bus (45 seats)"
                      : bookingDetails.selectedSeats.join(", ")}
                  </dd>
                </div>
              </dl>

              <div className="mt-5 space-y-2 border-t border-navy-100 pt-4 text-sm">
                <div className="flex justify-between text-navy-600">
                  <span>{bookingDetails.bookingType === "charter" ? "Charter fee" : "Base fare"}</span>
                  <span>{money(baseFare)}</span>
                </div>
                <div className="flex justify-between text-navy-600">
                  <span>Service fee</span>
                  <span>{money(serviceFee)}</span>
                </div>
                <div className="flex justify-between pt-2 text-base font-bold text-navy-900">
                  <span>Total</span>
                  <span>{money(bookingDetails.totalPrice)}</span>
                </div>
              </div>

              <div className="mt-5 flex flex-wrap items-center gap-2 border-t border-navy-100 pt-4">
                <span className="text-xs font-medium text-navy-500">We accept</span>
                <span className="rounded border border-navy-100 bg-white px-1.5 py-1">
                  <VisaMark />
                </span>
                <span className="rounded border border-navy-100 bg-white px-1.5 py-1">
                  <MastercardMark />
                </span>
                <span className="rounded border border-navy-100 bg-white px-1.5 py-1">
                  <MomoMark />
                </span>
              </div>
            </div>
          </aside>
        </div>

        <p className="mt-6 hidden text-center text-xs text-navy-500 lg:block">
          By paying, you agree to our{" "}
          <Link href="/terms" className="font-medium text-navy-800 hover:underline">
            Terms of Service
          </Link>{" "}
          and{" "}
          <Link href="/privacy" className="font-medium text-navy-800 hover:underline">
            Privacy Policy
          </Link>
          .
        </p>
      </main>

      <div className="fixed inset-x-0 bottom-0 z-30 border-t border-navy-100 bg-white/95 p-3 backdrop-blur lg:hidden">
        <div className="mx-auto flex max-w-content items-center gap-3">
          <div className="min-w-0">
            <p className="text-xs text-navy-500">Total</p>
            <p className="truncate text-base font-bold text-navy-900">{money(bookingDetails.totalPrice)}</p>
          </div>
          <button
            type="button"
            onClick={handlePayment}
            disabled={walletBlocked || processing || authLoading}
            className="btn-primary min-h-12 flex-1 disabled:cursor-not-allowed disabled:bg-navy-300"
          >
            <Lock className="h-4 w-4" />
            {processing ? "Processing…" : "Pay now"}
          </button>
        </div>
        <p className="mt-2 text-center text-[11px] text-navy-500">
          Encrypted checkout ·{" "}
          <Link href="/terms" className="underline">
            Terms
          </Link>
        </p>
      </div>
    </div>
  );
}
