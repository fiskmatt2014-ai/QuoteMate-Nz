import { NextRequest, NextResponse } from 'next/server';
import { getSession } from '@/lib/auth/session';
import { getInvoicesByUserId, createInvoice } from '@/lib/db/invoices';
import { calculateGST, generateInvoiceNumber } from '@/lib/utils/format';

export async function GET() {
  try {
    const session = await getSession();
    if (!session.isLoggedIn || !session.userId) {
      return NextResponse.json({ error: 'Not authenticated' }, { status: 401 });
    }

    const invoices = getInvoicesByUserId(session.userId);

    return NextResponse.json({ invoices }, { status: 200 });
  } catch (error) {
    console.error('Get invoices error:', error);
    return NextResponse.json(
      { error: 'Failed to get invoices' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const session = await getSession();
    if (!session.isLoggedIn || !session.userId) {
      return NextResponse.json({ error: 'Not authenticated' }, { status: 401 });
    }

    const body = await request.json();
    const { customerId, date, dueDate, items, notes } = body;

    if (!customerId || !date || !items || items.length === 0) {
      return NextResponse.json(
        { error: 'Customer, date, and at least one item are required' },
        { status: 400 }
      );
    }

    // Calculate totals
    const subtotal = items.reduce(
      (sum: number, item: any) => sum + item.quantity * item.unit_price,
      0
    );
    const gstAmount = calculateGST(subtotal);
    const total = subtotal + gstAmount;

    // Generate invoice number
    const invoiceNumber = generateInvoiceNumber();

    const invoice = createInvoice(
      session.userId,
      customerId,
      invoiceNumber,
      date,
      dueDate,
      subtotal,
      gstAmount,
      total,
      items,
      notes
    );

    return NextResponse.json({ invoice }, { status: 201 });
  } catch (error) {
    console.error('Create invoice error:', error);
    return NextResponse.json(
      { error: 'Failed to create invoice' },
      { status: 500 }
    );
  }
}
