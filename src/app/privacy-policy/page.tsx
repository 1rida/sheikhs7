// my-app/src/app/privacy-policy/page.tsx
import React from 'react';

const PrivacyPolicyPage: React.FC = () => {
  return (
    <div className="bg-white container mx-auto p-8 max-w-3xl">
      <h1 className="text-4xl font-bold mb-6 text-gray-800">Privacy Policy</h1>

      <p className="mb-4 text-gray-700">
        This Privacy Policy describes how Sheikh&apos;s7 we collects, uses, and discloses your personal information when you visit, use, or make a purchase from www.sheikhs7.com 
      </p>

      <h2 className="text-2xl font-semibold mt-8 mb-4 text-gray-800">1. Information We Collect</h2>
      <p className="mb-4 text-gray-700">
        We collect various types of information in connection with the services we provide, including:
      </p>
      <ul className="list-disc list-inside mb-4 text-gray-700">
        <li><strong>Personal Information:</strong> Name, email address, shipping address, billing address, phone number, and payment information (processed securely by third-party payment processors).</li>
        <li><strong>Order Information:</strong> Details of products you purchase, transaction history.</li>
        <li><strong>Usage Data:</strong> Information about how you access and use the Site, such as your IP address, browser type, operating system, referring URLs, pages viewed, and access times.</li>
      </ul>

      <h2 className="text-2xl font-semibold mt-8 mb-4 text-gray-800">2. How We Use Your Information</h2>
      <p className="mb-4 text-gray-700">
        We use the information we collect for various purposes, including to:
      </p>
      <ul className="list-disc list-inside mb-4 text-gray-700">
        <li>Process and fulfill your orders, including sending shipping notifications and customer service communications.</li>
        <li>Improve and personalize your experience on our Site.</li>
        <li>Communicate with you about products, services, promotions, and news (if you have opted in).</li>
        <li>Maintain the security of the Site and prevent fraud.</li>
        <li>Analyze and understand how users interact with our Site to improve its functionality and content.</li>
      </ul>

      <h2 className="text-2xl font-semibold mt-8 mb-4 text-gray-800">3. Sharing Your Information</h2>
      <p className="mb-4 text-gray-700">
        We may share your personal information with third parties for various purposes:
      </p>
      <ul className="list-disc list-inside mb-4 text-gray-700">
        <li><strong>Service Providers:</strong> We may share your information with third-party vendors, service providers, contractors, or agents who perform services for us or on our behalf.</li>
        <li><strong>Legal Compliance:</strong> We may disclose your information to comply with applicable laws and regulations, to respond to a subpoena, search warrant, or other lawful request for information we receive, or to otherwise protect our rights.</li>
      </ul>

      <h2 className="text-2xl font-semibold mt-8 mb-4 text-gray-800">4. Your Rights</h2>
      <p className="mb-4 text-gray-700">
        You have certain rights regarding your personal information, including the right to access, correct, or delete your data. Please contact us to exercise these rights.
      </p>

      <h2 className="text-2xl font-semibold mt-8 mb-4 text-gray-800">5. Changes to This Policy</h2>
      <p className="mb-4 text-gray-700">
        We may update this Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page.
      </p>

      <h2 className="text-2xl font-semibold mt-8 mb-4 text-gray-800">6. Contact Us</h2>
      <p className="mb-4 text-gray-700">
        For more information about our privacy practices, if you have questions, or if you would like to make a complaint, please contact us by e-mail at sheikhseven07@gmail.com.
      </p>

      <p className="text-sm text-gray-500 mt-8">
        Last updated: February 15, 2026
      </p>
    </div>
  );
};

export default PrivacyPolicyPage;
