import bcrypt from 'bcryptjs';
import db from '../db/database';

export interface User {
  id: number;
  email: string;
  business_name: string;
  gst_number?: string;
  phone?: string;
  address?: string;
}

export async function hashPassword(password: string): Promise<string> {
  return bcrypt.hash(password, 10);
}

export async function verifyPassword(password: string, hash: string): Promise<boolean> {
  return bcrypt.compare(password, hash);
}

export function createUser(
  email: string,
  passwordHash: string,
  businessName: string,
  gstNumber?: string,
  phone?: string,
  address?: string
): User {
  const stmt = db.prepare(`
    INSERT INTO users (email, password_hash, business_name, gst_number, phone, address)
    VALUES (?, ?, ?, ?, ?, ?)
  `);

  const result = stmt.run(email, passwordHash, businessName, gstNumber, phone, address);
  
  return {
    id: result.lastInsertRowid as number,
    email,
    business_name: businessName,
    gst_number: gstNumber,
    phone,
    address,
  };
}

export function getUserByEmail(email: string): (User & { password_hash: string }) | undefined {
  const stmt = db.prepare(`
    SELECT id, email, password_hash, business_name, gst_number, phone, address
    FROM users
    WHERE email = ?
  `);

  return stmt.get(email) as (User & { password_hash: string }) | undefined;
}

export function getUserById(id: number): User | undefined {
  const stmt = db.prepare(`
    SELECT id, email, business_name, gst_number, phone, address
    FROM users
    WHERE id = ?
  `);

  return stmt.get(id) as User | undefined;
}
