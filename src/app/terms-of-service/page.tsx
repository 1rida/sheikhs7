// my-app/src/app/terms-of-service/page.tsx
import React from 'react';
import Image from 'next/image'; // Import Image component

const TermsOfServicePage: React.FC = () => {
  return (
    <div className="container mx-auto p-8 max-w-3xl">
      <div className="relative w-full h-48 mb-8 overflow-hidden rounded-lg shadow-md">
        <Image
          src="/terms-of-service-banner.jpg" // Using the selected image
          alt="Terms of Service Banner"
          layout="fill"
          objectFit="cover"
          className="rounded-lg"
        />
        <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center">
          <h1 className="text-4xl font-bold text-white z-10">Terms of Service</h1>
        </div>
      </div>

      <p className="mb-4 text-gray-700">
        Welcome to Sheikh&apos;s7! These Terms of Service  govern your use of our website located at www.sheikhs7.com  and the products and services offered by Sheikh&apos;s7 
      </p>
      <p className="mb-4 text-gray-700">
        By accessing or using the Site or Services, you agree to be bound by these Terms. If you disagree with any part of the terms, then you may not access the Service.
      </p>

      <h2 className="text-2xl font-semibold mt-8 mb-4 text-gray-800">1. Use of the Service</h2>
      <p className="mb-4 text-gray-700">
        You agree to use the Site and Services only for lawful purposes and in accordance with these Terms. You are responsible for all activities that occur under your account.
      </p>

      <h2 className="text-2xl font-semibold mt-8 mb-4 text-gray-800">2. Products and Services</h2>
      <p className="mb-4 text-gray-700">
        We sell hair care products and related services. All descriptions of products or product pricing are subject to change at any time without notice, at our sole discretion. We reserve the right to discontinue any product at any time.
      </p>
      <p className="mb-4 text-gray-700">
        We have made every effort to display as accurately as possible the colors and images of our products that appear at the store. We cannot guarantee that your computer monitor&apos;s display of any color will be accurate.
      </p>

      <h2 className="text-2xl font-semibold mt-8 mb-4 text-gray-800">3. Intellectual Property</h2>
      <p className="mb-4 text-gray-700">
        The Site and its original content, features, and functionality are and will remain the exclusive property of Sheikh&apos;s7 and its licensors. Our trademarks and trade dress may not be used in connection with any product or service without the prior written consent of Sheikh&apos;s7.
      </p>

      <h2 className="text-2xl font-semibold mt-8 mb-4 text-gray-800">4. Limitation of Liability</h2>
      <p className="mb-4 text-gray-700">
        In no event shall Sheikh&apos;s7, nor its directors, employees, partners, agents, suppliers, or affiliates, be liable for any indirect, incidental, special, consequential or punitive damages, including without limitation, loss of profits, data, use, goodwill, or other intangible losses, resulting from (i) your access to or use of or inability to access or use the Service; (ii) any conduct or content of any third party on the Service; (iii) any content obtained from the Service; and (iv) unauthorized access, use or alteration of your transmissions or content, whether based on warranty, contract, tort (including negligence) or any other legal theory, whether or not we have been informed of the possibility of such damage, and even if a remedy set forth herein is found to have failed of its essential purpose.
      </p>

      <h2 className="text-2xl font-semibold mt-8 mb-4 text-gray-800">5. Governing Law</h2>
      <p className="mb-4 text-gray-700">
        These Terms shall be governed and construed in accordance with the laws of Pakistan, without regard to its conflict of law provisions.
      </p>

      <h2 className="text-2xl font-semibold mt-8 mb-4 text-gray-800">6. Changes to Terms</h2>
      <p className="mb-4 text-gray-700">
        We reserve the right, at our sole discretion, to modify or replace these Terms at any time. If a revision is material we will try to provide at least 30 days notice prior to any new terms taking effect. What constitutes a material change will be determined at our sole discretion.
      </p>

      <h2 className="text-2xl font-semibold mt-8 mb-4 text-gray-800">7. Contact Us</h2>
      <p className="mb-4 text-gray-700">
        If you have any questions about these Terms, please contact us at sheikhseven07@gmail.com.
      </p>

      <p className="text-sm text-gray-500 mt-8">
        Last updated: February 15, 2026
      </p>
    </div>
  );
};

export default TermsOfServicePage;
