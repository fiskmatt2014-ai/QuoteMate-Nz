import Image from "next/image";

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="pt-20 pb-16 text-center">
          <h1 className="text-5xl font-bold text-gray-900 mb-4">
            QuoteMate NZ
          </h1>
          <p className="text-xl text-gray-600 mb-8">
            Simple quotes and invoices for NZ tradies
          </p>
          <div className="flex gap-4 justify-center">
            <a
              href="/signup"
              className="px-8 py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition"
            >
              Get Started
            </a>
            <a
              href="/login"
              className="px-8 py-3 bg-white text-blue-600 rounded-lg font-medium border-2 border-blue-600 hover:bg-blue-50 transition"
            >
              Sign In
            </a>
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-8 py-16">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold mb-3">Easy Quotes</h3>
            <p className="text-gray-600">
              Create professional quotes in minutes with automatic GST calculation.
            </p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold mb-3">Quick Invoices</h3>
            <p className="text-gray-600">
              Send invoices to clients and track payment status effortlessly.
            </p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold mb-3">Customer Management</h3>
            <p className="text-gray-600">
              Keep all your customer details organized in one place.
            </p>
          </div>
        </div>

        <div className="py-16 text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Built for New Zealand Tradies
          </h2>
          <p className="text-lg text-gray-600 mb-8">
            Includes 15% GST calculation, NZ date formats, and NZD currency
          </p>
        </div>
      </div>
    </div>
  );
}
