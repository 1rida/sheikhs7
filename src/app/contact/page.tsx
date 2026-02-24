"use client";

import React, { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const ContactPage = () => {
  const contactDetailsRef = useRef(null);
  
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  useEffect(() => {
    const el = contactDetailsRef.current;
    if (el) {
      gsap.fromTo(
        el,
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1.2,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: el,
            start: 'top 90%',
            toggleActions: 'play none none reverse',
          },
        }
      );
    }
  }, []);

  const handleSendToWhatsApp = (e: React.FormEvent) => {
    e.preventDefault();
    
    const whatsappNumber = "923092138872";
    const text = `Hello! My name is ${name}.
Email: ${email}
Message: ${message}`;
    
    const url = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(text)}`;
    
    window.open(url, '_blank');
  };

  return (
    <div className="bg-gray-50">
      {/* Hero Banner Section */}
      <section 
        className="relative min-h-[50vh] flex items-center justify-center text-center bg-cover bg-center" 
        style={{ backgroundImage: "url('/contact-banner.jpg')" }}
      >
        <div className="absolute inset-0 bg-black/50" />
        <div className="relative z-10 px-4">
          <h1 className="text-4xl md:text-6xl font-extrabold text-white leading-tight shadow-md">
            Contact Us
          </h1>
          <p className="mt-4 text-lg text-gray-200">
            We&#39;re here to help. Reach out to us with any questions or feedback.
          </p>
        </div>
      </section>

      {/* Contact Form and Details Section */}
      <section className="py-20 md:py-28">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {/* Contact Details */}
            <div ref={contactDetailsRef} className="bg-white p-8 rounded-lg shadow-md">
              <h2 className="text-3xl font-bold text-gray-800 mb-6">Get in Touch</h2>
              <div className="space-y-4 text-gray-600 mb-8">
                <p>
                  <strong>Address:</strong> Karachi
                </p>
                <p>
                  <strong>Email:</strong> sheikhsevenop@gmail.com
                </p>
                <p>
                  <strong>Phone:</strong> +92 309 2138872
                </p>
              </div>
              
              {/* Social Icons */}
              <div className="flex space-x-6 mb-4">
                <a href="https://facebook.com/sheikhs7" target="_blank" rel="noopener noreferrer" aria-label="Facebook" className="text-gray-400 hover:text-green-500 transition-transform text-3xl duration-300 hover:scale-110">
                  <i className="fab fa-facebook-f w-10 h-10"></i>
                </a>
                <a href="https://www.instagram.com/sheikh.s7_official/" target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="text-gray-400 hover:text-green-500 transition-transform text-3xl duration-300 hover:scale-110">
                  <i className="fab fa-instagram w-10 h-10"></i>
                </a>
                <a href="https://wa.me/923092138872" target="_blank" rel="noopener noreferrer" aria-label="WhatsApp" className="text-gray-500 hover:text-green-600 transition-transform text-3xl duration-300 hover:scale-110">
                  <i className="fab fa-whatsapp w-10 h-10"></i>
                </a>
                <a href="mailto:sheikhseven07@gmail.com" aria-label="Email" className="text-gray-500 hover:text-green-600 transition-transform text-3xl duration-300 hover:scale-110">
                  <i className="fas fa-envelope w-10 h-10"></i>
                </a>
              </div>
              <p className="mt-4 text-xl font-semibold text-red-600">
                Delivery across Pakistan in 2-3 days.
              </p>
            </div>

            {/* Contact Form */}
            <div className="bg-white p-8 rounded-lg shadow-md">
              <h2 className="text-3xl font-bold text-gray-800 mb-6">Send a Message</h2>
              <form className="space-y-6" onSubmit={handleSendToWhatsApp}>
                <div>
                  <label htmlFor="name" className="sr-only">Name</label>
                  <input 
                    type="text" 
                    id="name" 
                    placeholder="Your Name" 
                    className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500" 
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                  />
                </div>
                <div>
                  <label htmlFor="email" className="sr-only">Email</label>
                  <input 
                    type="email" 
                    id="email" 
                    placeholder="Your Email" 
                    className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>
                <div>
                  <label htmlFor="message" className="sr-only">Message</label>
                  <textarea 
                    id="message" 
                    rows={5} 
                    placeholder="Your Message" 
                    className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    required
                  ></textarea>
                </div>
                <div>
                  <button type="submit" className="w-full bg-green-600 text-white font-bold px-6 py-3 rounded-md hover:bg-green-700 transition-colors">
                    Send via WhatsApp
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ContactPage;
