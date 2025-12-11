import db from '../db/database';

export interface QuoteItem {
  id?: number;
  quote_id?: number;
  description: string;
  quantity: number;
  unit_price: number;
  total: number;
  position: number;
}

export interface Quote {
  id: number;
  user_id: number;
  customer_id: number;
  quote_number: string;
  date: string;
  valid_until?: string;
  status: 'draft' | 'sent' | 'accepted' | 'rejected';
  subtotal: number;
  gst_amount: number;
  total: number;
  notes?: string;
  created_at: string;
  updated_at: string;
}

export interface QuoteWithItems extends Quote {
  items: QuoteItem[];
  customer_name?: string;
}

export function getQuotesByUserId(userId: number): QuoteWithItems[] {
  const stmt = db.prepare(`
    SELECT q.*, c.name as customer_name
    FROM quotes q
    JOIN customers c ON q.customer_id = c.id
    WHERE q.user_id = ?
    ORDER BY q.created_at DESC
  `);
  
  const quotes = stmt.all(userId) as QuoteWithItems[];
  
  // Get items for each quote
  const itemStmt = db.prepare(`
    SELECT * FROM quote_items
    WHERE quote_id = ?
    ORDER BY position
  `);
  
  return quotes.map(quote => ({
    ...quote,
    items: itemStmt.all(quote.id) as QuoteItem[],
  }));
}

export function getQuoteById(id: number, userId: number): QuoteWithItems | undefined {
  const stmt = db.prepare(`
    SELECT q.*, c.name as customer_name
    FROM quotes q
    JOIN customers c ON q.customer_id = c.id
    WHERE q.id = ? AND q.user_id = ?
  `);
  
  const quote = stmt.get(id, userId) as QuoteWithItems | undefined;
  
  if (!quote) return undefined;
  
  const itemStmt = db.prepare(`
    SELECT * FROM quote_items
    WHERE quote_id = ?
    ORDER BY position
  `);
  
  quote.items = itemStmt.all(quote.id) as QuoteItem[];
  
  return quote;
}

export function createQuote(
  userId: number,
  customerId: number,
  quoteNumber: string,
  date: string,
  validUntil: string | undefined,
  subtotal: number,
  gstAmount: number,
  total: number,
  items: Omit<QuoteItem, 'id' | 'quote_id'>[],
  notes?: string
): Quote {
  const quoteStmt = db.prepare(`
    INSERT INTO quotes (
      user_id, customer_id, quote_number, date, valid_until,
      status, subtotal, gst_amount, total, notes
    )
    VALUES (?, ?, ?, ?, ?, 'draft', ?, ?, ?, ?)
  `);
  
  const result = quoteStmt.run(
    userId, customerId, quoteNumber, date, validUntil,
    subtotal, gstAmount, total, notes
  );
  
  const quoteId = result.lastInsertRowid as number;
  
  // Insert items
  const itemStmt = db.prepare(`
    INSERT INTO quote_items (quote_id, description, quantity, unit_price, total, position)
    VALUES (?, ?, ?, ?, ?, ?)
  `);
  
  items.forEach(item => {
    itemStmt.run(quoteId, item.description, item.quantity, item.unit_price, item.total, item.position);
  });
  
  return {
    id: quoteId,
    user_id: userId,
    customer_id: customerId,
    quote_number: quoteNumber,
    date,
    valid_until: validUntil,
    status: 'draft',
    subtotal,
    gst_amount: gstAmount,
    total,
    notes,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  };
}

export function updateQuoteStatus(id: number, userId: number, status: Quote['status']): void {
  const stmt = db.prepare(`
    UPDATE quotes
    SET status = ?, updated_at = CURRENT_TIMESTAMP
    WHERE id = ? AND user_id = ?
  `);
  
  stmt.run(status, id, userId);
}

export function deleteQuote(id: number, userId: number): void {
  const stmt = db.prepare(`
    DELETE FROM quotes
    WHERE id = ? AND user_id = ?
  `);
  
  stmt.run(id, userId);
}
