'use client';

import React, { useState } from 'react';
import Image from 'next/image';

const Footer: React.FC = () => {
  const [email, setEmail] = useState<string>('');
  const [message, setMessage] = useState<string>('');
  const [messageType, setMessageType] = useState<'success' | 'error' | ''>('');

  const handleSubscribe = async (event: React.FormEvent) => {
    event.preventDefault();
    setMessage('Subscribing...');
    setMessageType('');

    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setMessage('Please enter a valid email address.');
      setMessageType('error');
      return;
    }

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500));

    // Simulate success
    setMessage('Thank you for subscribing!');
    setMessageType('success');
    setEmail(''); // Clear input

    // Clear message after a few seconds
    setTimeout(() => {
      setMessage('');
      setMessageType('');
    }, 5000);
  };

  return (
    <footer className="bg-gray-800 text-gray-300">
      <div className="container mx-auto px-6 py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-10">
          
          {/* Brand and Social */}
          <div className="lg:col-span-1 md:col-span-3 sm:col-span-2">
            <div className="mb-4">
              <Image 
                src="/logo.png" 
                alt="Sheikh's7 Logo"
                width={120}
                height={40}
                objectFit="contain"
              />
            </div>
            <p className="text-gray-400 max-w-xs text-sm">
              Premium hair care, powered by nature to restore and revitalize your hair&#39;s natural beauty.
            </p>
            <div className="flex space-x-5 mt-6">
              <a href="https://facebook.com/sheikhs7" target="_blank" rel="noopener noreferrer" aria-label="Facebook" className="text-gray-400 hover:text-green-500 transition-transform duration-300 text-3xl hover:scale-110">
                <i className="fab fa-facebook-f w-8 h-8"></i>
              </a>
              <a href="https://instagram.com/sheikhs7" target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="text-gray-400 hover:text-green-500 transition-transform duration-300 text-3xl hover:scale-110">
                <i className="fab fa-instagram w-8 h-8"></i>
              </a>
              <a href="https://wa.me/yourphonenumber" target="_blank" rel="noopener noreferrer" aria-label="WhatsApp" className="text-gray-400 hover:text-green-500  text-3xl transition-transform duration-300 hover:scale-110">
                <i className="fab fa-whatsapp w-8 h-8"></i>
              </a>
              <a href="https://tiktok.com/@sheikhs7" target="_blank" rel="noopener noreferrer" aria-label="TikTok" className="text-gray-400 hover:text-green-500 transition-transform  text-3xl duration-300 hover:scale-110">
                <i className="fab fa-tiktok w-8 h-8"></i>
              </a>
            </div>
          </div>
          
          {/* Links */}
          <div>
            <h4 className="text-lg font-semibold text-white mb-4 tracking-wider">Links</h4>
            <ul className="space-y-3">
              <li><a href="/" className="hover:text-green-400 transition-colors">Home</a></li>
              <li><a href="#services" className="hover:text-green-400 transition-colors">Products</a></li>
              <li><a href="#about" className="hover:text-green-400 transition-colors">About Us</a></li>
            </ul>
          </div>
          
          {/* Legal */}
          <div>
            <h4 className="text-lg font-semibold text-white mb-4 tracking-wider">Legal</h4>
            <ul className="space-y-3">
              <li><a href="/privacy-policy" className="hover:text-green-400 transition-colors">Privacy Policy</a></li>
              <li><a href="/terms-of-service" className="hover:text-green-400 transition-colors">Terms of Service</a></li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h4 className="text-lg font-semibold text-white mb-4 tracking-wider">Stay Updated</h4>
            <p className="text-gray-400 mb-4 text-sm">Get exclusive updates on new products and offers.</p>
            <form onSubmit={handleSubscribe}>
              <div className="flex flex-col sm:flex-row">
                <input 
                  type="email" 
                  placeholder="Enter your email" 
                  className="w-full px-4 py-3 text-gray-900 bg-gray-200 rounded-md sm:rounded-r-none focus:outline-none focus:ring-2 focus:ring-green-500"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
                <button 
                  type="submit"
                  className="bg-green-600 text-white font-bold px-4 py-3 mt-2 sm:mt-0 rounded-md sm:rounded-l-none hover:bg-green-700 transition-colors"
                >
                  Subscribe
                </button>
              </div>
              {message && (
                <p className={`mt-2 text-sm ${messageType === 'error' ? 'text-red-500' : 'text-green-400'}`}>
                  {message}
                </p>
              )}
            </form>
          </div>

        </div>
        
        {/* Bottom Bar */}
        <div className="mt-16 pt-8 border-t border-gray-700 text-center">
          <p className="text-gray-500 text-sm">&copy; {new Date().getFullYear()} Sheikh&#39;s7. All Rights Reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
