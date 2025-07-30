'use client';
import React from "react";
import {
  User,
  Mail,
  MapPin,
  Phone,
  Send,
  MessageCircle,
  Twitter,
  Linkedin,
} from "lucide-react";

export default function ContactPage() {
  return (
    <section className="bg-white py-12 md:py-16 px-4 sm:px-6 font-sans">
      <div className="max-w-full mx-auto px-6 sm:px-8 lg:px-12">
        {/* Header Section */}
        <div className="text-center mb-12 md:mb-20">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 md:mb-8 font-heading">
            Get in Touch
          </h2>
          <p className="text-gray-600 text-xl max-w-3xl mx-auto leading-relaxed px-4 font-sans">
            Have questions about TransLinka? We're here to help. Reach out to our team and we'll get back to you as soon as possible.
          </p>
        </div>

        {/* Main Content - Two Columns */}
        <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-2">
            {/* Left Column - Contact Form */}
            <div className="p-4 sm:p-6 md:p-10 lg:p-16">
              <h3 className="text-2xl font-bold text-gray-900 mb-6 md:mb-10 font-heading">
                Send us a Message
              </h3>

              <form className="space-y-8">
                {/* Name Fields */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-8">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2 md:mb-3">
                      First Name
                    </label>
                    <div className="relative">
                      <input
                        type="text"
                        placeholder="John"
                        className="w-full pl-10 md:pl-12 pr-4 py-2.5 md:py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm md:text-base"
                      />
                      <User className="absolute left-3 md:left-4 top-1/2 transform -translate-y-1/2 w-4 h-4 md:w-5 md:h-5 text-gray-500" />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2 md:mb-3">
                      Last Name
                    </label>
                    <div className="relative">
                      <input
                        type="text"
                        placeholder="Doe"
                        className="w-full pl-10 md:pl-12 pr-4 py-2.5 md:py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm md:text-base"
                      />
                      <User className="absolute left-3 md:left-4 top-1/2 transform -translate-y-1/2 w-4 h-4 md:w-5 md:h-5 text-gray-500" />
                    </div>
                  </div>
                </div>

                {/* Email Field */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-3">
                    Email Address
                  </label>
                  <div className="relative">
                    <input
                      type="email"
                      placeholder="john.doe@email.com"
                      className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                    <Mail className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-500" />
                  </div>
                </div>

                {/* Subject Field */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-3">
                    Subject
                  </label>
                  <input
                    type="text"
                    placeholder="How can we help?"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>

                {/* Message Field */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-3">
                    Message
                  </label>
                  <textarea
                    rows={8}
                    placeholder="Write your message here..."
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                  ></textarea>
                </div>

                {/* Submit Button */}
                <div className="text-center pt-6">
                  <button
                    type="submit"
                    className="bg-blue-500 text-white px-12 py-4 rounded-lg font-medium hover:bg-blue-600 active:scale-95 transition-all duration-200 flex items-center justify-center gap-3 mx-auto"
                  >
                    Send Message
                    <Send className="w-5 h-5" />
                  </button>
                </div>
              </form>
            </div>

            {/* Right Column - Contact Information */}
            <div className="p-4 sm:p-6 md:p-10 lg:p-16 bg-gray-50 border-t lg:border-t-0 lg:border-l border-gray-200">
              <h3 className="text-2xl font-bold text-gray-900 mb-6 md:mb-10 font-heading">
                Contact Information
              </h3>

              {/* Contact Details */}
              <div className="space-y-12 mb-20">
                {/* Headquarters */}
                <div className="flex items-start space-x-8">
                  <div className="w-16 h-16 bg-blue-100 rounded-xl flex items-center justify-center flex-shrink-0">
                    <MapPin className="w-8 h-8 text-blue-600" />
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-900 mb-3 text-lg font-sans">
                      Headquarters
                    </h4>
                    <p className="text-gray-600 text-base font-sans">Kigali, Rwanda</p>
                  </div>
                </div>

                {/* Email */}
                <div className="flex items-start space-x-8">
                  <div className="w-16 h-16 bg-green-100 rounded-xl flex items-center justify-center flex-shrink-0">
                    <Mail className="w-8 h-8 text-green-600" />
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-900 mb-3 text-lg font-sans">Email</h4>
                    <p className="text-gray-600 text-base font-sans">lamshemaleandre@gmail.com</p>
                  </div>
                </div>

                {/* Phone */}
                <div className="flex items-start space-x-8">
                  <div className="w-16 h-16 bg-blue-100 rounded-xl flex items-center justify-center flex-shrink-0">
                    <Phone className="w-8 h-8 text-blue-600" />
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-900 mb-3 text-lg font-sans">Phone</h4>
                    <p className="text-gray-600 text-base font-sans">+250-722-500-692</p>
                  </div>
                </div>
              </div>

              {/* Follow Us Section */}
              <div>
                <h4 className="text-xl font-bold text-gray-900 mb-10 font-heading">
                  Follow Us
                </h4>
                <div className="flex space-x-8">
                  {/* WhatsApp */}
                  <a href="#" aria-label="Message us on WhatsApp">
                    <div className="w-16 h-16 bg-blue-100 rounded-xl flex items-center justify-center hover:bg-blue-200 transition-colors cursor-pointer">
                      <MessageCircle className="w-8 h-8 text-blue-600" />
                    </div>
                  </a>

                  {/* Twitter */}
                  <a href="#" aria-label="Follow us on Twitter">
                    <div className="w-16 h-16 bg-blue-100 rounded-xl flex items-center justify-center hover:bg-blue-200 transition-colors cursor-pointer">
                      <Twitter className="w-8 h-8 text-blue-600" />
                    </div>
                  </a>

                  {/* LinkedIn */}
                  <a href="#" aria-label="Connect on LinkedIn">
                    <div className="w-16 h-16 bg-blue-100 rounded-xl flex items-center justify-center hover:bg-blue-200 transition-colors cursor-pointer">
                      <Linkedin className="w-8 h-8 text-blue-600" />
                    </div>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
