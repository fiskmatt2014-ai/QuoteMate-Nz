import { NextRequest, NextResponse } from 'next/server';
import { getSession } from '@/lib/auth/session';
import { getQuotesByUserId, createQuote } from '@/lib/db/quotes';
import { calculateGST, generateQuoteNumber } from '@/lib/utils/format';

export async function GET() {
  try {
    const session = await getSession();
    if (!session.isLoggedIn || !session.userId) {
      return NextResponse.json({ error: 'Not authenticated' }, { status: 401 });
    }

    const quotes = getQuotesByUserId(session.userId);

    return NextResponse.json({ quotes }, { status: 200 });
  } catch (error) {
    console.error('Get quotes error:', error);
    return NextResponse.json(
      { error: 'Failed to get quotes' },
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
    const { customerId, date, validUntil, items, notes } = body;

    if (!customerId || !date || !items || items.length === 0) {
      return NextResponse.json(
        { error: 'Customer, date, and at least one item are required' },
        { status: 400 }
      );
    }

    // Calculate totals
    const subtotal = items.reduce(
      (sum: number, item: { quantity: number; unit_price: number }) => sum + item.quantity * item.unit_price,
      0
    );
    const gstAmount = calculateGST(subtotal);
    const total = subtotal + gstAmount;

    // Generate quote number
    const quoteNumber = generateQuoteNumber();

    const quote = createQuote(
      session.userId,
      customerId,
      quoteNumber,
      date,
      validUntil,
      subtotal,
      gstAmount,
      total,
      items,
      notes
    );

    return NextResponse.json({ quote }, { status: 201 });
  } catch (error) {
    console.error('Create quote error:', error);
    return NextResponse.json(
      { error: 'Failed to create quote' },
      { status: 500 }
    );
  }
}
