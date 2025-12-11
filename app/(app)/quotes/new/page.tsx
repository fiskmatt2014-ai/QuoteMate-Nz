"use client";

import { useState } from "react";
import Link from "next/link";
import { LineItem } from "@/lib/types";
import {
  generateQuoteDescriptionMock,
  suggestLineItemsMock,
} from "@/lib/ai";

export default function NewQuotePage() {
  // Customer fields
  const [customerName, setCustomerName] = useState("");
  const [customerEmail, setCustomerEmail] = useState("");
  const [customerPhone, setCustomerPhone] = useState("");
  const [siteAddress, setSiteAddress] = useState("");

  // Job details
  const [jobType, setJobType] = useState("");
  const [notes, setNotes] = useState("");

  // Line items
  const [lineItems, setLineItems] = useState<LineItem[]>([
    {
      id: crypto.randomUUID(),
      description: "",
      quantity: 1,
      unitPrice: 0,
      type: "labour",
    },
  ]);

  // AI loading states
  const [isGeneratingDescription, setIsGeneratingDescription] = useState(false);
  const [isSuggestingItems, setIsSuggestingItems] = useState(false);

  // Calculate totals
  const subtotal = lineItems.reduce(
    (sum, item) => sum + item.quantity * item.unitPrice,
    0
  );
  const gst = subtotal * 0.15;
  const total = subtotal + gst;

  // Format currency
  const formatNZD = (amount: number) => {
    return new Intl.NumberFormat("en-NZ", {
      style: "currency",
      currency: "NZD",
    }).format(amount);
  };

  // Add a new line item
  const addLineItem = () => {
    setLineItems([
      ...lineItems,
      {
        id: crypto.randomUUID(),
        description: "",
        quantity: 1,
        unitPrice: 0,
        type: "labour",
      },
    ]);
  };

  // Remove a line item
  const removeLineItem = (id: string) => {
    if (lineItems.length > 1) {
      setLineItems(lineItems.filter((item) => item.id !== id));
    }
  };

  // Update a line item
  const updateLineItem = (id: string, field: keyof LineItem, value: any) => {
    setLineItems(
      lineItems.map((item) => (item.id === id ? { ...item, [field]: value } : item))
    );
  };

  // Handle AI: suggest line items
  const handleSuggestLineItems = async () => {
    if (!jobType.trim()) return;

    setIsSuggestingItems(true);
    try {
      const suggestions = await suggestLineItemsMock(jobType);
      if (suggestions.length > 0) {
        // Replace empty items or append to existing
        const hasEmptyItems = lineItems.some(
          (item) => !item.description && item.unitPrice === 0
        );
        if (hasEmptyItems && lineItems.length === 1) {
          setLineItems(suggestions);
        } else {
          setLineItems([...lineItems, ...suggestions]);
        }
      } else {
        alert("No suggestions found for this job type. Try a different description.");
      }
    } catch (error) {
      console.error("Error suggesting items:", error);
      alert("Error suggesting line items. Please try again.");
    } finally {
      setIsSuggestingItems(false);
    }
  };

  // Handle AI: tidy description
  const handleTidyDescription = async () => {
    if (!jobType.trim()) return;

    setIsGeneratingDescription(true);
    try {
      const description = await generateQuoteDescriptionMock(
        jobType,
        lineItems,
        notes
      );
      setNotes(description);
    } catch (error) {
      console.error("Error generating description:", error);
      alert("Error generating description. Please try again.");
    } finally {
      setIsGeneratingDescription(false);
    }
  };

  // Handle send quote (mock)
  const handleSendQuote = () => {
    const quoteData = {
      customer: {
        name: customerName,
        email: customerEmail,
        phone: customerPhone,
        address: siteAddress,
      },
      jobType,
      lineItems,
      notes,
      subtotal,
      gst,
      total,
    };
    console.log("Quote data:", quoteData);
    alert(
      "Quote data logged to console. Later: this will send email, generate PDF, etc."
    );
  };

  return (
    <div className="min-h-screen bg-slate-950">
      {/* Header */}
      <header className="border-b border-slate-800 bg-slate-950/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Link href="/dashboard" className="flex items-center gap-3">
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
          <Link
            href="/dashboard"
            className="text-slate-400 hover:text-white transition mb-4 inline-block"
          >
            ← Back to dashboard
          </Link>
          <h1 className="text-4xl font-bold">Create new quote</h1>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Form Section */}
          <div className="lg:col-span-2 space-y-6">
            {/* Customer Details */}
            <div className="bg-slate-900 rounded-2xl border border-slate-800 p-6">
              <h2 className="text-xl font-semibold mb-4">Customer details</h2>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-2">
                    Customer Name <span className="text-red-400">*</span>
                  </label>
                  <input
                    type="text"
                    value={customerName}
                    onChange={(e) => setCustomerName(e.target.value)}
                    className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-2 focus:outline-none focus:border-emerald-500"
                    placeholder="John Smith"
                    required
                  />
                </div>
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">
                      Email (optional)
                    </label>
                    <input
                      type="email"
                      value={customerEmail}
                      onChange={(e) => setCustomerEmail(e.target.value)}
                      className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-2 focus:outline-none focus:border-emerald-500"
                      placeholder="john@example.co.nz"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">
                      Phone (optional)
                    </label>
                    <input
                      type="tel"
                      value={customerPhone}
                      onChange={(e) => setCustomerPhone(e.target.value)}
                      className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-2 focus:outline-none focus:border-emerald-500"
                      placeholder="021 123 4567"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">
                    Site Address (optional)
                  </label>
                  <input
                    type="text"
                    value={siteAddress}
                    onChange={(e) => setSiteAddress(e.target.value)}
                    className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-2 focus:outline-none focus:border-emerald-500"
                    placeholder="45 Kauri Road, Auckland 1010"
                  />
                </div>
              </div>
            </div>

            {/* Job Details */}
            <div className="bg-slate-900 rounded-2xl border border-slate-800 p-6">
              <h2 className="text-xl font-semibold mb-4">Job details</h2>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-2">
                    Job Type / Title <span className="text-red-400">*</span>
                  </label>
                  <input
                    type="text"
                    value={jobType}
                    onChange={(e) => setJobType(e.target.value)}
                    className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-2 focus:outline-none focus:border-emerald-500"
                    placeholder="e.g. Replace toilet, Install heat pump, Build 12m fence"
                    required
                  />
                </div>
              </div>
            </div>

            {/* Line Items */}
            <div className="bg-slate-900 rounded-2xl border border-slate-800 p-6">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-semibold">Line items</h2>
                <button
                  onClick={handleSuggestLineItems}
                  disabled={!jobType.trim() || isSuggestingItems}
                  className="text-sm bg-slate-800 hover:bg-slate-700 disabled:bg-slate-800 disabled:text-slate-500 disabled:cursor-not-allowed text-emerald-400 px-4 py-2 rounded-lg transition"
                >
                  {isSuggestingItems ? "Suggesting..." : "🤖 AI: suggest items"}
                </button>
              </div>

              <div className="space-y-4">
                {lineItems.map((item, index) => (
                  <div
                    key={item.id}
                    className="bg-slate-800 rounded-lg p-4 border border-slate-700"
                  >
                    <div className="flex justify-between items-start mb-3">
                      <span className="text-sm text-slate-400">Item {index + 1}</span>
                      {lineItems.length > 1 && (
                        <button
                          onClick={() => removeLineItem(item.id)}
                          className="text-red-400 hover:text-red-300 text-sm"
                        >
                          Remove
                        </button>
                      )}
                    </div>
                    <div className="space-y-3">
                      <div>
                        <label className="block text-sm font-medium mb-1">
                          Description
                        </label>
                        <input
                          type="text"
                          value={item.description}
                          onChange={(e) =>
                            updateLineItem(item.id, "description", e.target.value)
                          }
                          className="w-full bg-slate-900 border border-slate-600 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-emerald-500"
                          placeholder="e.g. Labour, materials, etc."
                        />
                      </div>
                      <div className="grid grid-cols-3 gap-3">
                        <div>
                          <label className="block text-sm font-medium mb-1">
                            Quantity
                          </label>
                          <input
                            type="number"
                            min="0"
                            step="0.1"
                            value={item.quantity}
                            onChange={(e) =>
                              updateLineItem(
                                item.id,
                                "quantity",
                                parseFloat(e.target.value) || 0
                              )
                            }
                            className="w-full bg-slate-900 border border-slate-600 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-emerald-500"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium mb-1">
                            Unit Price ($)
                          </label>
                          <input
                            type="number"
                            min="0"
                            step="0.01"
                            value={item.unitPrice}
                            onChange={(e) =>
                              updateLineItem(
                                item.id,
                                "unitPrice",
                                parseFloat(e.target.value) || 0
                              )
                            }
                            className="w-full bg-slate-900 border border-slate-600 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-emerald-500"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium mb-1">
                            Type
                          </label>
                          <select
                            value={item.type}
                            onChange={(e) =>
                              updateLineItem(
                                item.id,
                                "type",
                                e.target.value as "labour" | "material"
                              )
                            }
                            className="w-full bg-slate-900 border border-slate-600 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-emerald-500"
                          >
                            <option value="labour">Labour</option>
                            <option value="material">Material</option>
                          </select>
                        </div>
                      </div>
                      <div className="text-right text-slate-400 text-sm">
                        Subtotal: {formatNZD(item.quantity * item.unitPrice)}
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <button
                onClick={addLineItem}
                className="mt-4 w-full bg-slate-800 hover:bg-slate-700 text-slate-300 py-2 rounded-lg transition border border-slate-700"
              >
                + Add item
              </button>
            </div>

            {/* Notes / Description */}
            <div className="bg-slate-900 rounded-2xl border border-slate-800 p-6">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-semibold">Notes / Description</h2>
                <button
                  onClick={handleTidyDescription}
                  disabled={!jobType.trim() || isGeneratingDescription}
                  className="text-sm bg-slate-800 hover:bg-slate-700 disabled:bg-slate-800 disabled:text-slate-500 disabled:cursor-not-allowed text-emerald-400 px-4 py-2 rounded-lg transition"
                >
                  {isGeneratingDescription ? "Tidying..." : "🤖 AI: tidy this up"}
                </button>
              </div>
              <textarea
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                rows={6}
                className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-3 focus:outline-none focus:border-emerald-500"
                placeholder="Add any notes, terms, or additional details about this quote..."
              />
            </div>
          </div>

          {/* Summary Panel */}
          <div className="lg:col-span-1">
            <div className="bg-slate-900 rounded-2xl border border-slate-800 p-6 sticky top-24">
              <h2 className="text-xl font-semibold mb-6">Summary</h2>

              <div className="space-y-3 mb-6">
                <div className="flex justify-between text-slate-300">
                  <span>Subtotal</span>
                  <span>{formatNZD(subtotal)}</span>
                </div>
                <div className="flex justify-between text-slate-300">
                  <span>GST (15%)</span>
                  <span>{formatNZD(gst)}</span>
                </div>
                <div className="border-t border-slate-700 pt-3 flex justify-between text-lg font-semibold">
                  <span>Total</span>
                  <span className="text-emerald-400">{formatNZD(total)}</span>
                </div>
              </div>

              <button
                onClick={handleSendQuote}
                disabled={!customerName.trim() || !jobType.trim()}
                className="w-full bg-emerald-600 hover:bg-emerald-700 disabled:bg-slate-700 disabled:text-slate-500 disabled:cursor-not-allowed text-white py-3 rounded-full font-medium transition mb-4"
              >
                Send quote (mock)
              </button>

              <div className="bg-slate-800 rounded-lg p-4 border border-slate-700">
                <p className="text-xs text-slate-400 mb-2 font-medium">
                  Coming later:
                </p>
                <ul className="text-xs text-slate-500 space-y-1">
                  <li>• PDF generation</li>
                  <li>• Email sending</li>
                  <li>• Stripe payment links</li>
                  <li>• Quote tracking</li>
                  <li>• Convert to invoice</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
