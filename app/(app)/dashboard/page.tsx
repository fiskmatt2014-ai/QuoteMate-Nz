import Link from "next/link";
import { mockQuotes } from "@/lib/mockData";
import { StatusBadge } from "@/components/StatusBadge";

export default function DashboardPage() {
  // Format currency as NZD
  const formatNZD = (amount: number) => {
    return new Intl.NumberFormat("en-NZ", {
      style: "currency",
      currency: "NZD",
    }).format(amount);
  };

  // Format date
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-NZ", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  return (
    <div className="min-h-screen bg-slate-950">
      {/* Header */}
      <header className="border-b border-slate-800 bg-slate-950/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Link href="/" className="flex items-center gap-3">
              <div className="bg-emerald-600 rounded-lg w-10 h-10 flex items-center justify-center font-bold text-white">
                QM
              </div>
              <span className="font-semibold text-lg">QuoteMate NZ</span>
            </Link>
            <div className="text-slate-400 text-sm">demo@quotemate.nz</div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2">Quotes overview</h1>
          <p className="text-slate-400">
            This is a mock dashboard using sample data. Plug in your backend later.
          </p>
        </div>

        <div className="mb-8">
          <Link
            href="/quotes/new"
            className="inline-block bg-emerald-600 hover:bg-emerald-700 text-white px-6 py-3 rounded-full font-medium transition"
          >
            + New quote
          </Link>
        </div>

        {/* Quotes List */}
        <div className="bg-slate-900 rounded-2xl border border-slate-800 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-slate-800">
                  <th className="text-left px-6 py-4 text-sm font-medium text-slate-400">
                    Customer
                  </th>
                  <th className="text-left px-6 py-4 text-sm font-medium text-slate-400">
                    Quote Number
                  </th>
                  <th className="text-left px-6 py-4 text-sm font-medium text-slate-400">
                    Date
                  </th>
                  <th className="text-right px-6 py-4 text-sm font-medium text-slate-400">
                    Total
                  </th>
                  <th className="text-center px-6 py-4 text-sm font-medium text-slate-400">
                    Status
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800">
                {mockQuotes.map((quote) => (
                  <tr
                    key={quote.id}
                    className="hover:bg-slate-800/50 transition cursor-pointer"
                  >
                    <td className="px-6 py-4">
                      <div>
                        <div className="font-medium">{quote.customer.name}</div>
                        {quote.customer.email && (
                          <div className="text-sm text-slate-400">
                            {quote.customer.email}
                          </div>
                        )}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <Link
                        href={`/quotes/${quote.id}`}
                        className="text-emerald-400 hover:text-emerald-300 font-medium"
                      >
                        {quote.quoteNumber}
                      </Link>
                    </td>
                    <td className="px-6 py-4 text-slate-300">
                      {formatDate(quote.createdAt)}
                    </td>
                    <td className="px-6 py-4 text-right font-semibold">
                      {formatNZD(quote.total)}
                    </td>
                    <td className="px-6 py-4 text-center">
                      <StatusBadge status={quote.status} />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Empty state - if there were no quotes */}
        {mockQuotes.length === 0 && (
          <div className="bg-slate-900 rounded-2xl border border-slate-800 p-12 text-center">
            <p className="text-slate-400 mb-4">No quotes yet. Create your first one!</p>
            <Link
              href="/quotes/new"
              className="inline-block bg-emerald-600 hover:bg-emerald-700 text-white px-6 py-3 rounded-full font-medium transition"
            >
              + New quote
            </Link>
          </div>
        )}
      </main>
    </div>
  );
}
