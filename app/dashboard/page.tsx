'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Navigation from '@/components/Navigation';
import { formatCurrency } from '@/lib/utils/format';
import Link from 'next/link';

export default function DashboardPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({
    totalQuotes: 0,
    totalInvoices: 0,
    totalCustomers: 0,
    recentQuotes: [] as any[],
    recentInvoices: [] as any[],
  });

  useEffect(() => {
    const checkAuth = async () => {
      const res = await fetch('/api/auth/me');
      if (!res.ok) {
        router.push('/login');
        return;
      }

      // Fetch data
      const [quotesRes, invoicesRes, customersRes] = await Promise.all([
        fetch('/api/quotes'),
        fetch('/api/invoices'),
        fetch('/api/customers'),
      ]);

      const [quotesData, invoicesData, customersData] = await Promise.all([
        quotesRes.json(),
        invoicesRes.json(),
        customersRes.json(),
      ]);

      setStats({
        totalQuotes: quotesData.quotes?.length || 0,
        totalInvoices: invoicesData.invoices?.length || 0,
        totalCustomers: customersData.customers?.length || 0,
        recentQuotes: quotesData.quotes?.slice(0, 5) || [],
        recentInvoices: invoicesData.invoices?.slice(0, 5) || [],
      });

      setLoading(false);
    };

    checkAuth();
  }, [router]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navigation />
        <div className="flex items-center justify-center h-screen">
          <div className="text-gray-600">Loading...</div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Dashboard</h1>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-gray-500 text-sm font-medium">Total Customers</h3>
            <p className="text-3xl font-bold text-gray-900 mt-2">{stats.totalCustomers}</p>
            <Link href="/customers" className="text-blue-600 text-sm mt-2 inline-block hover:underline">
              View all →
            </Link>
          </div>
          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-gray-500 text-sm font-medium">Total Quotes</h3>
            <p className="text-3xl font-bold text-gray-900 mt-2">{stats.totalQuotes}</p>
            <Link href="/quotes" className="text-blue-600 text-sm mt-2 inline-block hover:underline">
              View all →
            </Link>
          </div>
          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-gray-500 text-sm font-medium">Total Invoices</h3>
            <p className="text-3xl font-bold text-gray-900 mt-2">{stats.totalInvoices}</p>
            <Link href="/invoices" className="text-blue-600 text-sm mt-2 inline-block hover:underline">
              View all →
            </Link>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="bg-white rounded-lg shadow">
            <div className="p-6 border-b">
              <h2 className="text-xl font-semibold">Recent Quotes</h2>
            </div>
            <div className="p-6">
              {stats.recentQuotes.length === 0 ? (
                <p className="text-gray-500">No quotes yet</p>
              ) : (
                <ul className="space-y-4">
                  {stats.recentQuotes.map((quote) => (
                    <li key={quote.id} className="flex justify-between items-center">
                      <div>
                        <p className="font-medium">{quote.quote_number}</p>
                        <p className="text-sm text-gray-500">{quote.customer_name}</p>
                      </div>
                      <div className="text-right">
                        <p className="font-medium">{formatCurrency(quote.total)}</p>
                        <span className={`text-xs px-2 py-1 rounded-full ${
                          quote.status === 'accepted' ? 'bg-green-100 text-green-800' :
                          quote.status === 'sent' ? 'bg-blue-100 text-blue-800' :
                          'bg-gray-100 text-gray-800'
                        }`}>
                          {quote.status}
                        </span>
                      </div>
                    </li>
                  ))}
                </ul>
              )}
              <Link
                href="/quotes/new"
                className="mt-4 block w-full text-center py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
              >
                Create New Quote
              </Link>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow">
            <div className="p-6 border-b">
              <h2 className="text-xl font-semibold">Recent Invoices</h2>
            </div>
            <div className="p-6">
              {stats.recentInvoices.length === 0 ? (
                <p className="text-gray-500">No invoices yet</p>
              ) : (
                <ul className="space-y-4">
                  {stats.recentInvoices.map((invoice) => (
                    <li key={invoice.id} className="flex justify-between items-center">
                      <div>
                        <p className="font-medium">{invoice.invoice_number}</p>
                        <p className="text-sm text-gray-500">{invoice.customer_name}</p>
                      </div>
                      <div className="text-right">
                        <p className="font-medium">{formatCurrency(invoice.total)}</p>
                        <span className={`text-xs px-2 py-1 rounded-full ${
                          invoice.status === 'paid' ? 'bg-green-100 text-green-800' :
                          invoice.status === 'sent' ? 'bg-blue-100 text-blue-800' :
                          invoice.status === 'overdue' ? 'bg-red-100 text-red-800' :
                          'bg-gray-100 text-gray-800'
                        }`}>
                          {invoice.status}
                        </span>
                      </div>
                    </li>
                  ))}
                </ul>
              )}
              <Link
                href="/invoices/new"
                className="mt-4 block w-full text-center py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
              >
                Create New Invoice
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
