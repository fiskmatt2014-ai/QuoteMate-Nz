import db from '../db/database';

export interface Customer {
  id: number;
  user_id: number;
  name: string;
  email?: string;
  phone?: string;
  address?: string;
  created_at: string;
}

export function getCustomersByUserId(userId: number): Customer[] {
  const stmt = db.prepare(`
    SELECT * FROM customers
    WHERE user_id = ?
    ORDER BY created_at DESC
  `);
  return stmt.all(userId) as Customer[];
}

export function getCustomerById(id: number, userId: number): Customer | undefined {
  const stmt = db.prepare(`
    SELECT * FROM customers
    WHERE id = ? AND user_id = ?
  `);
  return stmt.get(id, userId) as Customer | undefined;
}

export function createCustomer(
  userId: number,
  name: string,
  email?: string,
  phone?: string,
  address?: string
): Customer {
  const stmt = db.prepare(`
    INSERT INTO customers (user_id, name, email, phone, address)
    VALUES (?, ?, ?, ?, ?)
  `);
  
  const result = stmt.run(userId, name, email, phone, address);
  
  return {
    id: result.lastInsertRowid as number,
    user_id: userId,
    name,
    email,
    phone,
    address,
    created_at: new Date().toISOString(),
  };
}

export function updateCustomer(
  id: number,
  userId: number,
  name: string,
  email?: string,
  phone?: string,
  address?: string
): void {
  const stmt = db.prepare(`
    UPDATE customers
    SET name = ?, email = ?, phone = ?, address = ?
    WHERE id = ? AND user_id = ?
  `);
  
  stmt.run(name, email, phone, address, id, userId);
}

export function deleteCustomer(id: number, userId: number): void {
  const stmt = db.prepare(`
    DELETE FROM customers
    WHERE id = ? AND user_id = ?
  `);
  
  stmt.run(id, userId);
}

export function searchCustomers(userId: number, query: string): Customer[] {
  const stmt = db.prepare(`
    SELECT * FROM customers
    WHERE user_id = ? AND (
      name LIKE ? OR
      email LIKE ? OR
      phone LIKE ?
    )
    ORDER BY created_at DESC
  `);
  
  const searchTerm = `%${query}%`;
  return stmt.all(userId, searchTerm, searchTerm, searchTerm) as Customer[];
}
