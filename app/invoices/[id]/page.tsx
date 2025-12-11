'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Navigation from '@/components/Navigation';
import { formatCurrency, formatDate } from '@/lib/utils/format';

export default function InvoiceViewPage({ params }: { params: Promise<{ id: string }> }) {
  const router = useRouter();
  const [invoice, setInvoice] = useState<{
    id: number;
    invoice_number: string;
    customer_name: string;
    date: string;
    due_date?: string;
    status: string;
    subtotal: number;
    gst_amount: number;
    total: number;
    notes?: string;
    items: Array<{ id: number; description: string; quantity: number; unit_price: number; total: number }>;
  } | null>(null);
  const [loading, setLoading] = useState(true);

  const fetchInvoice = async (invoiceId: string) => {
    const res = await fetch(`/api/invoices/${invoiceId}`);
    if (res.ok) {
      const data = await res.json();
      setInvoice(data.invoice);
    } else if (res.status === 401) {
      router.push('/login');
    }
    setLoading(false);
  };

  useEffect(() => {
    params.then(p => {
      fetchInvoice(p.id);
    });
  }, [params, router]);

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

  if (!invoice) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navigation />
        <div className="flex items-center justify-center h-screen">
          <div className="text-gray-600">Invoice not found</div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-4">
          <button
            onClick={() => router.back()}
            className="text-blue-600 hover:text-blue-900"
          >
            ← Back to Invoices
          </button>
        </div>

        <div className="bg-white rounded-lg shadow p-8">
          <div className="border-b pb-6 mb-6">
            <div className="flex justify-between items-start">
              <div>
                <h1 className="text-3xl font-bold text-gray-900">Invoice</h1>
                <p className="text-lg text-gray-600 mt-1">{invoice.invoice_number}</p>
              </div>
              <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                invoice.status === 'paid' ? 'bg-green-100 text-green-800' :
                invoice.status === 'sent' ? 'bg-blue-100 text-blue-800' :
                invoice.status === 'overdue' ? 'bg-red-100 text-red-800' :
                'bg-gray-100 text-gray-800'
              }`}>
                {invoice.status.charAt(0).toUpperCase() + invoice.status.slice(1)}
              </span>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-8 mb-8">
            <div>
              <h3 className="text-sm font-medium text-gray-500 mb-2">Customer</h3>
              <p className="text-gray-900 font-medium">{invoice.customer_name}</p>
            </div>
            <div>
              <h3 className="text-sm font-medium text-gray-500 mb-2">Invoice Date</h3>
              <p className="text-gray-900">{formatDate(invoice.date)}</p>
              {invoice.due_date && (
                <>
                  <h3 className="text-sm font-medium text-gray-500 mt-4 mb-2">Due Date</h3>
                  <p className="text-gray-900">{formatDate(invoice.due_date)}</p>
                </>
              )}
            </div>
          </div>

          <div className="mb-8">
            <h3 className="text-lg font-medium text-gray-900 mb-4">Line Items</h3>
            <table className="min-w-full">
              <thead className="border-b-2 border-gray-200">
                <tr>
                  <th className="text-left py-2 text-sm font-medium text-gray-500">Description</th>
                  <th className="text-right py-2 text-sm font-medium text-gray-500">Qty</th>
                  <th className="text-right py-2 text-sm font-medium text-gray-500">Unit Price</th>
                  <th className="text-right py-2 text-sm font-medium text-gray-500">Total</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {invoice.items.map((item) => (
                  <tr key={item.id}>
                    <td className="py-3 text-gray-900">{item.description}</td>
                    <td className="py-3 text-right text-gray-900">{item.quantity}</td>
                    <td className="py-3 text-right text-gray-900">{formatCurrency(item.unit_price)}</td>
                    <td className="py-3 text-right text-gray-900 font-medium">{formatCurrency(item.total)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="border-t pt-6">
            <div className="flex justify-end">
              <div className="w-64 space-y-2">
                <div className="flex justify-between text-gray-700">
                  <span>Subtotal:</span>
                  <span>{formatCurrency(invoice.subtotal)}</span>
                </div>
                <div className="flex justify-between text-gray-700">
                  <span>GST (15%):</span>
                  <span>{formatCurrency(invoice.gst_amount)}</span>
                </div>
                <div className="flex justify-between text-xl font-bold text-gray-900 border-t pt-2">
                  <span>Total:</span>
                  <span>{formatCurrency(invoice.total)}</span>
                </div>
              </div>
            </div>
          </div>

          {invoice.notes && (
            <div className="mt-8 border-t pt-6">
              <h3 className="text-sm font-medium text-gray-500 mb-2">Notes</h3>
              <p className="text-gray-900 whitespace-pre-wrap">{invoice.notes}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
