'use client';

import { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Bell, Send, Mic, ArrowLeft } from 'lucide-react';

interface Message {
  id: string;
  text: string;
  isBot: boolean;
  timestamp: Date;
}

export default function ChatSupportPage() {
  const router = useRouter();
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: "👋 Hi I'm Linka, your TransLinka AI assistant. I'm here to help you with booking, schedules, routes, and any questions about your bus travel!",
      isBot: true,
      timestamp: new Date()
    }
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = async () => {
    if (!inputMessage.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text: inputMessage,
      isBot: false,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputMessage('');
    setIsTyping(true);

    // Simulate AI response
    setTimeout(() => {
      const botResponse = generateBotResponse(inputMessage);
      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: botResponse,
        isBot: true,
        timestamp: new Date()
      };
      setMessages(prev => [...prev, botMessage]);
      setIsTyping(false);
    }, 1500);
  };

  const generateBotResponse = (userInput: string): string => {
    const input = userInput.toLowerCase();
    
    if (input.includes('book') || input.includes('ticket')) {
      return "I can help you book a ticket! You can use the 'Book a ticket' button below or visit our booking page. What's your departure and destination?";
    } else if (input.includes('schedule') || input.includes('time')) {
      return "I can help you find bus schedules! Use the 'Find bus schedules' button below or let me know your route and I'll check the available times.";
    } else if (input.includes('route') || input.includes('direction')) {
      return "I can provide route information! Use the 'Get Route info' button below or tell me your starting point and destination.";
    } else if (input.includes('price') || input.includes('cost')) {
      return "Bus fares vary by route and distance. Typically range from 1,500 to 3,000 frw. Would you like me to check prices for a specific route?";
    } else if (input.includes('cancel') || input.includes('refund')) {
      return "For cancellations and refunds, you can manage your bookings in the 'My Tickets' section. Cancellations made 24 hours before departure are eligible for full refund.";
    } else if (input.includes('hello') || input.includes('hi')) {
      return "Hello! 👋 How can I assist you with your bus travel today? I can help with bookings, schedules, routes, and more!";
    } else {
      return "I'm here to help with any questions about TransLinka services! You can ask me about booking tickets, schedules, routes, prices, or use the quick action buttons below.";
    }
  };

  const handleQuickAction = (action: string) => {
    switch (action) {
      case 'schedule':
        router.push('/book-ticket');
        break;
      case 'book':
        router.push('/book-ticket');
        break;
      case 'route':
        router.push('/ar-navigation');
        break;
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
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
              <span className="text-xl font-heading font-bold text-gray-900">TransLinka</span>
            </div>

            {/* Navigation */}
            <nav className="hidden md:flex space-x-8">
              <Link href="/dashboard" className="text-gray-600 hover:text-gray-900 font-medium font-sans">
                Dashboard
              </Link>
              <Link href="/book-ticket" className="text-gray-600 hover:text-gray-900 font-medium font-sans">
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
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
                  <span className="text-white text-sm font-medium font-sans">JD</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Chat Container */}
      <div className="flex-1 max-w-7xl mx-auto w-full px-4 py-6 flex flex-col">
        {/* Chat Header */}
        <div className="bg-white rounded-t-xl border border-gray-200 p-4 flex items-center space-x-3">
          <button 
            onClick={() => router.back()}
            className="p-2 text-gray-600 hover:text-gray-900 rounded-lg hover:bg-gray-100"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-green-500 rounded-full flex items-center justify-center">
              <span className="text-white font-bold text-sm">🤖</span>
            </div>
            <div>
              <h2 className="font-heading font-semibold text-gray-900">Linka AI</h2>
              <div className="flex items-center space-x-1">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <span className="text-sm text-gray-600 font-sans">Online</span>
              </div>
            </div>
          </div>
        </div>

        {/* Messages Area */}
        <div className="flex-1 bg-white border-x border-gray-200 p-4 overflow-y-auto min-h-96 max-h-[600px]">
          <div className="space-y-4">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${message.isBot ? 'justify-start' : 'justify-end'}`}
              >
                <div className={`flex items-start space-x-2 max-w-xs lg:max-w-md ${message.isBot ? '' : 'flex-row-reverse space-x-reverse'}`}>
                  {message.isBot && (
                    <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center flex-shrink-0">
                      <span className="text-white text-xs">🤖</span>
                    </div>
                  )}
                  <div
                    className={`px-4 py-2 rounded-lg ${
                      message.isBot
                        ? 'bg-gray-100 text-gray-900'
                        : 'bg-blue-600 text-white'
                    }`}
                  >
                    <p className="text-sm font-sans">{message.text}</p>
                  </div>
                </div>
              </div>
            ))}
            
            {isTyping && (
              <div className="flex justify-start">
                <div className="flex items-start space-x-2">
                  <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
                    <span className="text-white text-xs">🤖</span>
                  </div>
                  <div className="bg-gray-100 px-4 py-2 rounded-lg">
                    <div className="flex space-x-1">
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                    </div>
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>
        </div>

        {/* Quick Actions */}
        <div className="bg-gray-50 border-x border-gray-200 p-4">
          <div className="flex flex-wrap gap-2 justify-center">
            <button
              onClick={() => handleQuickAction('schedule')}
              className="bg-white border border-gray-300 text-gray-700 px-4 py-2 rounded-lg text-sm font-medium hover:bg-gray-50 transition-colors font-sans"
            >
              Find bus schedules
            </button>
            <button
              onClick={() => handleQuickAction('book')}
              className="bg-white border border-gray-300 text-gray-700 px-4 py-2 rounded-lg text-sm font-medium hover:bg-gray-50 transition-colors font-sans"
            >
              Book a ticket
            </button>
            <button
              onClick={() => handleQuickAction('route')}
              className="bg-white border border-gray-300 text-gray-700 px-4 py-2 rounded-lg text-sm font-medium hover:bg-gray-50 transition-colors font-sans"
            >
              Get Route info
            </button>
          </div>
        </div>

        {/* Input Area */}
        <div className="bg-white rounded-b-xl border border-gray-200 p-4">
          <div className="flex items-center space-x-3">
            <div className="flex-1 relative">
              <input
                type="text"
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Ask me anything about bus travel..."
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent font-sans text-sm"
              />
            </div>
            <button className="p-3 text-gray-600 hover:text-gray-900 rounded-lg hover:bg-gray-100">
              <Mic className="w-5 h-5" />
            </button>
            <button
              onClick={handleSendMessage}
              disabled={!inputMessage.trim()}
              className="bg-blue-600 text-white p-3 rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Send className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
