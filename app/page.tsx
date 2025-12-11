import Link from "next/link";

export default function LandingPage() {
  const currentYear = new Date().getFullYear();

  return (
    <div className="min-h-screen">
      {/* Header */}
      <header className="border-b border-slate-800 bg-slate-950/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center gap-3">
              <div className="bg-emerald-600 rounded-lg w-10 h-10 flex items-center justify-center font-bold text-white">
                QM
              </div>
              <span className="font-semibold text-lg">QuoteMate NZ</span>
            </div>
            <nav className="hidden md:flex items-center gap-8">
              <a href="#features" className="text-slate-300 hover:text-white transition">
                Features
              </a>
              <a href="#pricing" className="text-slate-300 hover:text-white transition">
                Pricing
              </a>
              <Link
                href="/dashboard"
                className="text-emerald-400 hover:text-emerald-300 transition font-medium"
              >
                Log in
              </Link>
            </nav>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="text-5xl sm:text-6xl font-bold mb-6 leading-tight">
                Quotes & invoices in{" "}
                <span className="text-emerald-400">under 60 seconds</span>
              </h1>
              <p className="text-xl text-slate-300 mb-8">
                Built for NZ tradies – builders, sparkies, plumbers, painters, and small crews.
                Stop wasting time on paperwork.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link
                  href="/dashboard"
                  className="bg-emerald-600 hover:bg-emerald-700 text-white px-8 py-4 rounded-full font-semibold text-lg transition inline-block text-center"
                >
                  Start free trial
                </Link>
              </div>
              <p className="text-slate-400 text-sm mt-4">
                No credit card. NZD pricing. Built for small crews.
              </p>
            </div>

            {/* Dashboard Preview Card */}
            <div className="bg-slate-900 rounded-2xl p-6 border border-slate-800">
              <div className="text-sm text-slate-400 mb-4">Dashboard preview</div>
              <div className="space-y-3">
                <div className="bg-slate-800 rounded-lg p-4 border border-slate-700">
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <div className="font-medium">John Smith</div>
                      <div className="text-sm text-slate-400">QM-2024-001</div>
                    </div>
                    <div className="text-right">
                      <div className="font-semibold text-emerald-400">$615.25</div>
                      <div className="text-xs bg-amber-500/20 text-amber-400 px-2 py-1 rounded-full mt-1">
                        Sent
                      </div>
                    </div>
                  </div>
                </div>
                <div className="bg-slate-800 rounded-lg p-4 border border-slate-700">
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <div className="font-medium">ABC Building Ltd</div>
                      <div className="text-sm text-slate-400">QM-2024-002</div>
                    </div>
                    <div className="text-right">
                      <div className="font-semibold text-emerald-400">$7,371.50</div>
                      <div className="text-xs bg-slate-700 text-slate-300 px-2 py-1 rounded-full mt-1">
                        Draft
                      </div>
                    </div>
                  </div>
                </div>
                <div className="bg-slate-800 rounded-lg p-4 border border-slate-700">
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <div className="font-medium">Sarah Johnson</div>
                      <div className="text-sm text-slate-400">QM-2024-003</div>
                    </div>
                    <div className="text-right">
                      <div className="font-semibold text-emerald-400">$3,944.50</div>
                      <div className="text-xs bg-emerald-500/20 text-emerald-400 px-2 py-1 rounded-full mt-1">
                        Accepted
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 px-4 sm:px-6 lg:px-8 bg-slate-900/50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">Everything you need</h2>
            <p className="text-slate-300 text-lg">Simple tools for busy tradies</p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-slate-800 rounded-2xl p-6 border border-slate-700">
              <div className="text-emerald-400 text-3xl mb-4">⚡</div>
              <h3 className="text-xl font-semibold mb-2">Quotes in 60 seconds</h3>
              <p className="text-slate-300">
                Fill in customer details, add line items, and send. No complex setup.
              </p>
            </div>
            <div className="bg-slate-800 rounded-2xl p-6 border border-slate-700">
              <div className="text-emerald-400 text-3xl mb-4">🤖</div>
              <h3 className="text-xl font-semibold mb-2">AI-assisted descriptions</h3>
              <p className="text-slate-300">
                Get help writing professional descriptions and suggesting line items.
              </p>
            </div>
            <div className="bg-slate-800 rounded-2xl p-6 border border-slate-700">
              <div className="text-emerald-400 text-3xl mb-4">🧾</div>
              <h3 className="text-xl font-semibold mb-2">Quote → invoice in 1 click</h3>
              <p className="text-slate-300">
                Convert accepted quotes into invoices instantly. No retyping.
              </p>
            </div>
            <div className="bg-slate-800 rounded-2xl p-6 border border-slate-700">
              <div className="text-emerald-400 text-3xl mb-4">💰</div>
              <h3 className="text-xl font-semibold mb-2">NZ GST ready</h3>
              <p className="text-slate-300">
                Automatic 15% GST calculation. IRD-compliant invoicing.
              </p>
            </div>
            <div className="bg-slate-800 rounded-2xl p-6 border border-slate-700">
              <div className="text-emerald-400 text-3xl mb-4">💾</div>
              <h3 className="text-xl font-semibold mb-2">Saved rates & materials</h3>
              <p className="text-slate-300">
                Store your common rates and materials for even faster quoting.
              </p>
            </div>
            <div className="bg-slate-800 rounded-2xl p-6 border border-slate-700">
              <div className="text-emerald-400 text-3xl mb-4">📱</div>
              <h3 className="text-xl font-semibold mb-2">Mobile-friendly</h3>
              <p className="text-slate-300">
                Create quotes from your phone or tablet on-site with customers.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">Simple pricing</h2>
            <p className="text-slate-300 text-lg">No contracts. Cancel anytime.</p>
          </div>
          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {/* Lite Plan */}
            <div className="bg-slate-900 rounded-2xl p-8 border border-slate-800">
              <h3 className="text-2xl font-bold mb-2">Lite</h3>
              <div className="mb-6">
                <span className="text-4xl font-bold">$29</span>
                <span className="text-slate-400">/month</span>
              </div>
              <p className="text-slate-300 mb-6">Perfect for solo tradies just starting out</p>
              <ul className="space-y-3 mb-8">
                <li className="flex items-start gap-2">
                  <span className="text-emerald-400">✓</span>
                  <span className="text-slate-300">Up to 10 quotes/month</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-emerald-400">✓</span>
                  <span className="text-slate-300">Basic templates</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-emerald-400">✓</span>
                  <span className="text-slate-300">Email support</span>
                </li>
              </ul>
              <Link
                href="/dashboard"
                className="block w-full bg-slate-800 hover:bg-slate-700 text-white py-3 rounded-full font-medium text-center transition"
              >
                Start trial
              </Link>
            </div>

            {/* Pro Plan */}
            <div className="bg-slate-900 rounded-2xl p-8 border-2 border-emerald-600 relative">
              <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-emerald-600 text-white px-4 py-1 rounded-full text-sm font-medium">
                Best for busy tradies
              </div>
              <h3 className="text-2xl font-bold mb-2">Pro</h3>
              <div className="mb-6">
                <span className="text-4xl font-bold">$49</span>
                <span className="text-slate-400">/month</span>
              </div>
              <p className="text-slate-300 mb-6">For tradies doing regular quoting</p>
              <ul className="space-y-3 mb-8">
                <li className="flex items-start gap-2">
                  <span className="text-emerald-400">✓</span>
                  <span className="text-slate-300">Unlimited quotes</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-emerald-400">✓</span>
                  <span className="text-slate-300">AI-assisted descriptions</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-emerald-400">✓</span>
                  <span className="text-slate-300">Custom branding</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-emerald-400">✓</span>
                  <span className="text-slate-300">Priority support</span>
                </li>
              </ul>
              <Link
                href="/dashboard"
                className="block w-full bg-emerald-600 hover:bg-emerald-700 text-white py-3 rounded-full font-medium text-center transition"
              >
                Start trial
              </Link>
            </div>

            {/* Business Plan */}
            <div className="bg-slate-900 rounded-2xl p-8 border border-slate-800">
              <h3 className="text-2xl font-bold mb-2">Business</h3>
              <div className="mb-6">
                <span className="text-4xl font-bold">$79</span>
                <span className="text-slate-400">/month</span>
              </div>
              <p className="text-slate-300 mb-6">For small crews and teams</p>
              <ul className="space-y-3 mb-8">
                <li className="flex items-start gap-2">
                  <span className="text-emerald-400">✓</span>
                  <span className="text-slate-300">Everything in Pro</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-emerald-400">✓</span>
                  <span className="text-slate-300">Up to 3 team members</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-emerald-400">✓</span>
                  <span className="text-slate-300">Advanced reporting</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-emerald-400">✓</span>
                  <span className="text-slate-300">API access</span>
                </li>
              </ul>
              <Link
                href="/dashboard"
                className="block w-full bg-slate-800 hover:bg-slate-700 text-white py-3 rounded-full font-medium text-center transition"
              >
                Start trial
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-slate-800 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center text-slate-400">
          <p className="mb-2">© {currentYear} QuoteMate NZ. All rights reserved.</p>
          <p className="text-emerald-400">Made in Aotearoa for Kiwi tradies 🥝</p>
        </div>
      </footer>
    </div>
  );
}
