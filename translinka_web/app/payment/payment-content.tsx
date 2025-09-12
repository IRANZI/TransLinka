"use client";

import { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { Bell, CreditCard, Smartphone, Check, Apple, Wallet, X } from 'lucide-react';

export default function PaymentPage() {
  const router = useRouter();
  const searchParams = useSearchParams();

  
  const [bookingDetails, setBookingDetails] = useState({
    from: '',
    to: '',
    date: '',
    passengers: 1,
    selectedSeats: [] as string[],
    totalPrice: 0,
    bookingType: 'individual',
  });

  const [paymentMethod, setPaymentMethod] = useState('wallet');
  const [walletBalance, setWalletBalance] = useState(0); 
  const [showAddMoneyModal, setShowAddMoneyModal] = useState(false);
  const [addMoneyAmount, setAddMoneyAmount] = useState('');
  const [addMoneyPaymentMethod, setAddMoneyPaymentMethod] = useState('card');
  const [addMoneyCardDetails, setAddMoneyCardDetails] = useState({
    number: '',
    expiry: '',
    cvv: '',
    name: '',
  });
  const [cardDetails, setCardDetails] = useState({
    number: '',
    expiry: '',
    cvv: '',
    name: '',
  });


  useEffect(() => {
    const bookingType = searchParams.get('bookingType') || 'individual';
    setBookingDetails({
      from: searchParams.get('from') || 'Remera',
      to: searchParams.get('to') || 'Masaka',
      date: searchParams.get('date') || new Date().toLocaleDateString(),
      passengers: parseInt(searchParams.get('passengers') || '1'),
      selectedSeats: searchParams.get('seats')?.split(',') || ['A1'],
      totalPrice: parseInt(searchParams.get('total') || (bookingType === 'charter' ? '150000' : '2300')),
      bookingType: bookingType,
    });
  }, [searchParams]);

  const baseFare = bookingDetails.bookingType === 'charter' ? 150000 : 2000;
  const serviceFee = bookingDetails.bookingType === 'charter' ? 5000 : 300;
  const luggageFee = 0;

  const handleAddMoney = () => {
    const amount = parseInt(addMoneyAmount);
    if (amount > 0) {
      setWalletBalance(prev => prev + amount);
      setAddMoneyAmount('');
      setShowAddMoneyModal(false);
    }
  };

  const handlePayment = () => {
    if (paymentMethod === 'wallet' && walletBalance < bookingDetails.totalPrice) {
      alert('Insufficient wallet balance. Please add money to your wallet.');
      return;
    }

    if (paymentMethod === 'wallet') {
      setWalletBalance(prev => prev - bookingDetails.totalPrice);
    }

    console.log('Processing payment...', { bookingDetails, paymentMethod, cardDetails });

    const params = new URLSearchParams({
      from: bookingDetails.from,
      to: bookingDetails.to,
      date: bookingDetails.date,
      passengers: bookingDetails.passengers.toString(),
      seats: bookingDetails.selectedSeats.join(','),
      total: bookingDetails.totalPrice.toString(),
      bookingType: bookingDetails.bookingType,
    });

    router.push(`/booking-confirmation?${params.toString()}`);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-full mx-auto px-6 sm:px-8 lg:px-12">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <div className="flex items-center">
              <img
                src="/logo.png"
                alt="TransLinka Logo"
                className="h-8 w-8 object-contain mr-3"
              />
              <span className="text-xl font-heading font-bold text-gray-900">
                TransLinka
              </span>
            </div>

            {/* Navigation */}
            <nav className="hidden md:flex space-x-8">
              <Link href="/dashboard" className="text-gray-600 hover:text-gray-900 font-medium font-sans">
                Dashboard
              </Link>
              <Link href="/book-ticket" className="text-blue-600 font-medium font-sans">
                Book Ticket
              </Link>
              <Link href="/my-tickets" className="text-gray-600 hover:text-gray-900 font-medium font-sans">
                My Tickets
              </Link>
              <Link href="/ar-navigation" className="text-gray-600 hover:text-gray-900 font-medium font-sans">
                AR Navigation
              </Link>
            </nav>

            {/* User Menu */}
            <div className="flex items-center space-x-4">
              <button className="relative p-2 text-gray-600 hover:text-gray-900">
                <Bell className="w-5 h-5" />
                <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
              </button>
               <Link href="/profile">
                <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center cursor-pointer hover:opacity-90 transition">
                  <span className="text-white text-base font-medium">J</span>
                </div>
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Add Money Modal */}
      {showAddMoneyModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-md w-full p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold text-gray-900">Add Money To Wallet</h2>
              <button
                onClick={() => setShowAddMoneyModal(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Amount (frw)
              </label>
              <input
                type="number"
                placeholder="Enter Amount"
                value={addMoneyAmount}
                onChange={(e) => setAddMoneyAmount(e.target.value)}
                className="w-full px-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900"
              />
            </div>

            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-3">
                Payment Method
              </label>
              <div className="grid grid-cols-2 gap-3 mb-4">
                <button
                  onClick={() => setAddMoneyPaymentMethod('card')}
                  className={`flex items-center justify-center p-3 border rounded-lg transition-colors ${
                    addMoneyPaymentMethod === 'card'
                      ? 'border-blue-500 bg-blue-50 text-blue-700'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <CreditCard className="w-4 h-4 mr-2" />
                  <span className="text-sm font-medium">Card</span>
                </button>
                <button
                  onClick={() => setAddMoneyPaymentMethod('digital')}
                  className={`flex items-center justify-center p-3 border rounded-lg transition-colors ${
                    addMoneyPaymentMethod === 'digital'
                      ? 'border-blue-500 bg-blue-50 text-blue-700'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <Smartphone className="w-4 h-4 mr-2" />
                  <span className="text-sm font-medium">Digital</span>
                </button>
              </div>

              {/* Digital Payment  */}
              {addMoneyPaymentMethod === 'digital' && (
                <div className="space-y-2">
                  <button className="w-full flex items-center p-3 border border-gray-200 rounded-lg hover:border-gray-300 transition-colors">
                    <div className="w-6 h-6 bg-black rounded flex items-center justify-center mr-3">
                      <Apple className="w-4 h-4 text-white" />
                    </div>
                    <span className="text-sm font-medium text-gray-900">Apple Pay</span>
                  </button>
                  <button className="w-full flex items-center p-3 border border-gray-200 rounded-lg hover:border-gray-300 transition-colors">
                    <div className="w-6 h-6 bg-blue-500 rounded flex items-center justify-center mr-3">
                      <span className="text-white text-xs font-bold">G</span>
                    </div>
                    <span className="text-sm font-medium text-gray-900">Google Pay</span>
                  </button>
                  <button className="w-full flex items-center p-3 border border-gray-200 rounded-lg hover:border-gray-300 transition-colors">
                    <div className="w-6 h-6 bg-blue-600 rounded flex items-center justify-center mr-3">
                      <span className="text-white text-xs font-bold">P</span>
                    </div>
                    <span className="text-sm font-medium text-gray-900">PayPal</span>
                  </button>
                </div>
              )}

              {/* Card Form */}
              {addMoneyPaymentMethod === 'card' && (
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2 font-sans">
                      Card Number
                    </label>
                    <input
                      type="text"
                      placeholder="1 555 123 4567"
                      value={addMoneyCardDetails.number}
                      onChange={(e) => setAddMoneyCardDetails({ ...addMoneyCardDetails, number: e.target.value })}
                      className="w-full px-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent font-sans text-sm"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2 font-sans">
                        Expiry Date
                      </label>
                      <input
                        type="text"
                        placeholder="MM/DD"
                        value={addMoneyCardDetails.expiry}
                        onChange={(e) => setAddMoneyCardDetails({ ...addMoneyCardDetails, expiry: e.target.value })}
                        className="w-full px-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent font-sans text-sm"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2 font-sans">
                        CVV
                      </label>
                      <input
                        type="text"
                        placeholder="123"
                        value={addMoneyCardDetails.cvv}
                        onChange={(e) => setAddMoneyCardDetails({ ...addMoneyCardDetails, cvv: e.target.value })}
                        className="w-full px-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent font-sans text-sm"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2 font-sans">
                      Cardholder Name
                    </label>
                    <input
                      type="text"
                      placeholder="John Doe"
                      value={addMoneyCardDetails.name}
                      onChange={(e) => setAddMoneyCardDetails({ ...addMoneyCardDetails, name: e.target.value })}
                      className="w-full px-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent font-sans text-sm"
                    />
                  </div>
                </div>
              )}
            </div>

            <div className="flex gap-3">
              <button
                onClick={() => setShowAddMoneyModal(false)}
                className="flex-1 px-4 py-3 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors font-medium"
              >
                Cancel
              </button>
              <button
                onClick={handleAddMoney}
                className="flex-1 px-4 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors font-medium"
              >
                Add Money
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Main Content */}
      <main className="max-w-full mx-auto px-6 sm:px-8 lg:px-12 py-8">
        <div className="bg-white">
          {/* Header */}
          <div className="mb-6">
            <h1 className="text-xl font-heading font-bold text-gray-900 mb-1">Payment</h1>
            <p className="text-sm text-gray-600 font-sans">Secure Checkout</p>
          </div>

          {/* Booking Summary */}
          <div className="bg-blue-50 rounded-lg p-4 mb-6">
            <div className="flex items-center justify-between mb-2">
              <h3 className="font-heading font-semibold text-gray-900">
                {bookingDetails.from} → {bookingDetails.to}
              </h3>
              <span className="text-sm font-medium text-blue-600 font-sans">
                {bookingDetails.bookingType === 'charter' ? 'Whole Bus Charter' : 
                 `${bookingDetails.selectedSeats.length} Seat${bookingDetails.selectedSeats.length > 1 ? 's' : ''}`}
              </span>
            </div>
            <p className="text-sm text-gray-600 font-sans mb-3">City Express</p>
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <span className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded font-sans">
                  {bookingDetails.date}
                </span>
                <span className="text-xs text-gray-600 font-sans">9:00 PM</span>
              </div>
              <div className="flex items-center space-x-2">
                <span className="text-xs text-gray-600 font-sans">
                  {bookingDetails.bookingType === 'charter' ? 'Full Bus (45 seats)' : 
                   `Seat ${bookingDetails.selectedSeats.join(', ')}`}
                </span>
              </div>
            </div>
          </div>

          {/* Price Breakdown */}
          <div className="mb-6">
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm text-gray-600 font-sans">
                {bookingDetails.bookingType === 'charter' ? 'Charter Fee' : 'Base Fare'}
              </span>
              <span className="text-sm text-gray-900 font-sans">
                {baseFare.toLocaleString()} frw
              </span>
            </div>
            <div className="flex justify-between items-center mb-4">
              <span className="text-sm text-gray-600 font-sans">Service Fee</span>
              <span className="text-sm text-gray-900 font-sans">
                {serviceFee.toLocaleString()} frw
              </span>
            </div>
            <div className="border-t pt-3">
              <div className="flex justify-between items-center">
                <span className="text-lg font-semibold text-gray-900 font-sans">Total</span>
                <span className="text-lg font-bold text-blue-600 font-sans">
                  {bookingDetails.totalPrice.toLocaleString()} frw
                </span>
              </div>
            </div>
          </div>

          {/* TransLinka Wallet Section */}
          <div className="mb-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-base font-semibold text-gray-900">TransLinka Wallet</h3>
              <button
                onClick={() => setShowAddMoneyModal(true)}
                className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors text-sm font-medium"
              >
                Add Money
              </button>
            </div>
            
            <div className="bg-gray-50 rounded-lg p-4 mb-4">
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Available Balance:</span>
                <span className="text-lg font-bold text-blue-600">{walletBalance} frw</span>
              </div>
            </div>

            {/* Insufficient Balance Warning */}
            {walletBalance < bookingDetails.totalPrice && (
              <div className="bg-red-50 border border-red-200 rounded-lg p-3 mb-4">
                <div className="text-sm text-red-600">
                  <span className="font-medium">Needs {(bookingDetails.totalPrice - walletBalance).toLocaleString()} frw more</span>
                </div>
              </div>
            )}
          </div>

          {/* Payment Method */}
          <div className="mb-6">
            <h3 className="text-base font-heading font-semibold text-gray-900 mb-4">
              Payment Method
            </h3>
            <div className="grid grid-cols-3 gap-3">
              <button
                onClick={() => setPaymentMethod('wallet')}
                className={`flex items-center justify-center p-3 border-2 rounded-lg transition-colors ${
                  paymentMethod === 'wallet'
                    ? 'border-blue-500 bg-blue-50 text-blue-700'
                    : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                <Wallet className="w-4 h-4 mr-2" />
                <span className="text-sm font-medium font-sans">Wallet</span>
              </button>
              <button
                onClick={() => setPaymentMethod('card')}
                className={`flex items-center justify-center p-3 border-2 rounded-lg transition-colors ${
                  paymentMethod === 'card'
                    ? 'border-blue-500 bg-blue-50 text-blue-700'
                    : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                <CreditCard className="w-4 h-4 mr-2" />
                <span className="text-sm font-medium font-sans">Card</span>
              </button>
              <button
                onClick={() => setPaymentMethod('digital')}
                className={`flex items-center justify-center p-3 border-2 rounded-lg transition-colors ${
                  paymentMethod === 'digital'
                    ? 'border-blue-500 bg-blue-50 text-blue-700'
                    : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                <Smartphone className="w-4 h-4 mr-2" />
                <span className="text-sm font-medium font-sans">Digital</span>
              </button>
            </div>
          </div>

          {/* Card Form */}
          {paymentMethod === 'card' && (
            <div className="space-y-4 mb-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2 font-sans">
                  Card Number
                </label>
                <input
                  type="text"
                  placeholder="1 555 123 4567"
                  value={cardDetails.number}
                  onChange={(e) => setCardDetails({ ...cardDetails, number: e.target.value })}
                  className="w-full px-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent font-sans text-sm"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2 font-sans">
                    Expiry Date
                  </label>
                  <input
                    type="text"
                    placeholder="MM/DD"
                    value={cardDetails.expiry}
                    onChange={(e) => setCardDetails({ ...cardDetails, expiry: e.target.value })}
                    className="w-full px-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent font-sans text-sm"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2 font-sans">
                    CVV
                  </label>
                  <input
                    type="text"
                    placeholder="123"
                    value={cardDetails.cvv}
                    onChange={(e) => setCardDetails({ ...cardDetails, cvv: e.target.value })}
                    className="w-full px-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent font-sans text-sm"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2 font-sans">
                  Cardholder Name
                </label>
                <input
                  type="text"
                  placeholder="John Doe"
                  value={cardDetails.name}
                  onChange={(e) => setCardDetails({ ...cardDetails, name: e.target.value })}
                  className="w-full px-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent font-sans text-sm"
                />
              </div>
            </div>
          )}

          {/* Digital Payment */}
          {paymentMethod === 'digital' && (
            <div className="space-y-3 mb-6">
              <button className="w-full flex items-center justify-start p-4 border border-gray-200 rounded-lg hover:border-gray-300 transition-colors">
                <div className="w-6 h-6 bg-black rounded flex items-center justify-center mr-3">
                  <Apple className="w-4 h-4 text-white" />
                </div>
                <span className="text-sm font-medium text-gray-900 font-sans">Apple Pay</span>
              </button>

              <button className="w-full flex items-center justify-start p-4 border border-gray-200 rounded-lg hover:border-gray-300 transition-colors">
                <div className="w-6 h-6 bg-blue-500 rounded flex items-center justify-center mr-3">
                  <span className="text-white text-xs font-bold">G</span>
                </div>
                <span className="text-sm font-medium text-gray-900 font-sans">Google Pay</span>
              </button>

              <button className="w-full flex items-center justify-start p-4 border border-gray-200 rounded-lg hover:border-gray-300 transition-colors">
                <div className="w-6 h-6 bg-blue-600 rounded flex items-center justify-center mr-3">
                  <span className="text-white text-xs font-bold">P</span>
                </div>
                <span className="text-sm font-medium text-gray-900 font-sans">PayPal</span>
              </button>

              <button className="w-full flex items-center justify-start p-4 border border-gray-200 rounded-lg hover:border-gray-300 transition-colors">
                <div className="w-6 h-6 bg-blue-600 rounded flex items-center justify-center mr-3">
                  <span className="text-white text-xs font-bold">M</span>
                </div>
                <span className="text-sm font-medium text-gray-900 font-sans">MoMo Pay</span>
              </button>
            </div>
          )}

          {/* Security Notice */}
          <div className="bg-green-50 border border-green-200 rounded-lg p-3 mb-6">
            <div className="flex items-start">
              <Check className="w-4 h-4 text-green-600 mt-0.5 mr-2 flex-shrink-0" />
              <div>
                <h4 className="text-sm font-medium text-green-800 font-sans">Secured Payment</h4>
                <p className="text-xs text-green-700 mt-1 font-sans">
                  Your payment is encrypted and protected by bank-level security.
                </p>
              </div>
            </div>
          </div>

          {/* Pay Button */}
          <button
            onClick={handlePayment}
            disabled={paymentMethod === 'wallet' && walletBalance < bookingDetails.totalPrice}
            className={`w-full py-4 rounded-lg font-medium transition-colors flex items-center justify-center font-sans mb-4 ${
              paymentMethod === 'wallet' && walletBalance < bookingDetails.totalPrice
                ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                : 'bg-blue-600 text-white hover:bg-blue-700'
            }`}
          >
            {paymentMethod === 'wallet' ? (
              <Wallet className="w-4 h-4 mr-2" />
            ) : (
              <CreditCard className="w-4 h-4 mr-2" />
            )}
            Pay {bookingDetails.totalPrice.toLocaleString()} frw
          </button>

          {/* Terms */}
          <p className="text-xs text-gray-500 text-center font-sans">
            By completing this purchase, you agree to our{' '}
            <Link href="/terms" className="text-blue-600 hover:underline">
              Terms of Service
            </Link>{' '}
            and{' '}
            <Link href="/privacy" className="text-blue-600 hover:underline">
              Privacy Policy
            </Link>
          </p>
        </div>
      </main>
    </div>
  );
}
