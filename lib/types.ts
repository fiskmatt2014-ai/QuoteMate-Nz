export type QuoteStatus = "draft" | "sent" | "accepted" | "invoiced" | "paid";

export interface Customer {
  id: string;
  name: string;
  email?: string;
  phone?: string;
  address?: string;
}

export interface LineItem {
  id: string;
  description: string;
  quantity: number;
  unitPrice: number;
  type: "labour" | "material";
}

export interface Quote {
  id: string;
  quoteNumber: string;
  customer: Customer;
  createdAt: string;
  status: QuoteStatus;
  lineItems: LineItem[];
  notes?: string;
  subtotal: number;
  gst: number;
  total: number;
}
