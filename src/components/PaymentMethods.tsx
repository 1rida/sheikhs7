'use client';

import React from 'react';
import Image from 'next/image';

const PaymentMethods = () => {
  const methods = [
    { src: '/easypaisa.png', alt: 'Easypaisa' },
    { src: '/jazzcash.png', alt: 'JazzCash' },
    { src: '/cod.png', alt: 'Cash on Delivery' },
  ];

  return (
    <div className="bg-gray-50 border-t border-gray-200 py-6">
      <div className="container mx-auto px-4 flex flex-col items-center">
        <h4 className="text-sm font-semibold text-gray-500 uppercase tracking-widest mb-4">Accepted Payment Methods</h4>
        <div className="flex items-center justify-center space-x-4 sm:space-x-8 md:space-x-20">
          <div className="relative w-24 h-12 sm:w-32 sm:h-16 md:w-48 md:h-24 flex items-center justify-center">
            <Image
              src="/visa.png"
              alt="Visa"
              fill
              className="object-contain opacity-100 hover:scale-110 transition-transform duration-300"
            />
          </div>
          <div className="relative w-24 h-12 sm:w-32 sm:h-16 md:w-48 md:h-24 flex items-center justify-center">
            <Image
              src="/jazzcash.png"
              alt="JazzCash"
              fill
              className="object-contain opacity-100 hover:scale-110 transition-transform duration-300"
            />
          </div>
          <div className="relative w-24 h-12 sm:w-32 sm:h-16 md:w-48 md:h-24 flex items-center justify-center">
            <Image
              src="/easypaisa.png"
              alt="Easypaisa"
              fill
              className="object-contain opacity-100 hover:scale-110 transition-transform duration-300"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentMethods;
