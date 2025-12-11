import db from '../db/database';

export interface InvoiceItem {
  id?: number;
  invoice_id?: number;
  description: string;
  quantity: number;
  unit_price: number;
  total: number;
  position: number;
}

export interface Invoice {
  id: number;
  user_id: number;
  customer_id: number;
  invoice_number: string;
  date: string;
  due_date?: string;
  status: 'draft' | 'sent' | 'paid' | 'overdue';
  subtotal: number;
  gst_amount: number;
  total: number;
  notes?: string;
  created_at: string;
  updated_at: string;
}

export interface InvoiceWithItems extends Invoice {
  items: InvoiceItem[];
  customer_name?: string;
}

export function getInvoicesByUserId(userId: number): InvoiceWithItems[] {
  const stmt = db.prepare(`
    SELECT i.*, c.name as customer_name
    FROM invoices i
    JOIN customers c ON i.customer_id = c.id
    WHERE i.user_id = ?
    ORDER BY i.created_at DESC
  `);
  
  const invoices = stmt.all(userId) as InvoiceWithItems[];
  
  // Get items for each invoice
  const itemStmt = db.prepare(`
    SELECT * FROM invoice_items
    WHERE invoice_id = ?
    ORDER BY position
  `);
  
  return invoices.map(invoice => ({
    ...invoice,
    items: itemStmt.all(invoice.id) as InvoiceItem[],
  }));
}

export function getInvoiceById(id: number, userId: number): InvoiceWithItems | undefined {
  const stmt = db.prepare(`
    SELECT i.*, c.name as customer_name
    FROM invoices i
    JOIN customers c ON i.customer_id = c.id
    WHERE i.id = ? AND i.user_id = ?
  `);
  
  const invoice = stmt.get(id, userId) as InvoiceWithItems | undefined;
  
  if (!invoice) return undefined;
  
  const itemStmt = db.prepare(`
    SELECT * FROM invoice_items
    WHERE invoice_id = ?
    ORDER BY position
  `);
  
  invoice.items = itemStmt.all(invoice.id) as InvoiceItem[];
  
  return invoice;
}

export function createInvoice(
  userId: number,
  customerId: number,
  invoiceNumber: string,
  date: string,
  dueDate: string | undefined,
  subtotal: number,
  gstAmount: number,
  total: number,
  items: Omit<InvoiceItem, 'id' | 'invoice_id'>[],
  notes?: string
): Invoice {
  const invoiceStmt = db.prepare(`
    INSERT INTO invoices (
      user_id, customer_id, invoice_number, date, due_date,
      status, subtotal, gst_amount, total, notes
    )
    VALUES (?, ?, ?, ?, ?, 'draft', ?, ?, ?, ?)
  `);
  
  const result = invoiceStmt.run(
    userId, customerId, invoiceNumber, date, dueDate,
    subtotal, gstAmount, total, notes
  );
  
  const invoiceId = result.lastInsertRowid as number;
  
  // Insert items
  const itemStmt = db.prepare(`
    INSERT INTO invoice_items (invoice_id, description, quantity, unit_price, total, position)
    VALUES (?, ?, ?, ?, ?, ?)
  `);
  
  items.forEach(item => {
    itemStmt.run(invoiceId, item.description, item.quantity, item.unit_price, item.total, item.position);
  });
  
  return {
    id: invoiceId,
    user_id: userId,
    customer_id: customerId,
    invoice_number: invoiceNumber,
    date,
    due_date: dueDate,
    status: 'draft',
    subtotal,
    gst_amount: gstAmount,
    total,
    notes,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  };
}

export function updateInvoiceStatus(id: number, userId: number, status: Invoice['status']): void {
  const stmt = db.prepare(`
    UPDATE invoices
    SET status = ?, updated_at = CURRENT_TIMESTAMP
    WHERE id = ? AND user_id = ?
  `);
  
  stmt.run(status, id, userId);
}

export function deleteInvoice(id: number, userId: number): void {
  const stmt = db.prepare(`
    DELETE FROM invoices
    WHERE id = ? AND user_id = ?
  `);
  
  stmt.run(id, userId);
}
