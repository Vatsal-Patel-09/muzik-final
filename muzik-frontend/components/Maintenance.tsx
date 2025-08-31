"use client";

import React from 'react';
import { Settings } from 'lucide-react';

const Maintenance = () => {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="text-center px-6 max-w-md mx-auto">
        {/* Icon */}
        <div className="mb-8 flex justify-center">
          <Settings className="w-12 h-12 text-gray-400" />
        </div>

        {/* Main Heading */}
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          MUZIK SKILL HOUSE
        </h1>

        {/* Maintenance Message */}
        <h2 className="text-2xl font-semibold text-gray-700 mb-6">
          Under Maintenance
        </h2>
        
        <div className="space-y-4 text-gray-600">
          <p className="text-lg">
            We're currently updating our platform.
          </p>
          
          <p>
            Stay tuned for future updates
          </p>
          
          <p className="font-medium">
            Services will be resumed soon
          </p>
        </div>

        {/* Contact Info */}
        <div className="mt-8 text-gray-500 text-sm">
          <p>Thank you for your patience</p>
        </div>
      </div>
    </div>
  );
};

export default Maintenance;
