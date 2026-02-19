import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs/promises';
import path from 'path';

interface CartItem {
  productId: string;
  quantity: number;
}

interface CheckoutEvent {
  id: string;
  cartItems: CartItem[];
  totalAmount: number;
  customerDetails: {
    name: string;
    phone: string;
    address: string;
  };
  userId: string;
  timestamp: string;
  status: string;
}

const checkoutEventsFilePath = path.join(process.cwd(), 'data', 'checkout_events.json');

async function readCheckoutEvents(): Promise<CheckoutEvent[]> {
  try {
    const data = await fs.readFile(checkoutEventsFilePath, 'utf-8');
    if (!data.trim()) { // Check if data is empty or just whitespace
      return [];
    }
    return JSON.parse(data);
  } catch (error: unknown) {
    if ((error as NodeJS.ErrnoException).code === 'ENOENT') {
      return [];
    }
    console.error('Error reading checkout events file:', error);
    let message = 'Failed to read checkout events data.';
    if (error instanceof Error) {
      message = error.message;
    }
    throw new Error(message);
  }
}

async function writeCheckoutEvents(events: CheckoutEvent[]) {
  try {
    await fs.writeFile(checkoutEventsFilePath, JSON.stringify(events, null, 2), 'utf-8');
  } catch (error: unknown) {
    console.error('Error writing checkout events file:', error);
    let message = 'Failed to write checkout events data.';
    if (error instanceof Error) {
      message = error.message;
    }
    throw new Error(message);
  }
}

export async function POST(req: NextRequest) {
  try {
    const { cartItems, totalAmount, customerDetails, userId, status = 'completed' } = await req.json();

    if (!cartItems || !Array.isArray(cartItems) || cartItems.length === 0 || !totalAmount || !customerDetails) {
      return NextResponse.json({ message: 'Cart items, total amount, and customer details are required.' }, { status: 400 });
    }

    const checkoutEvents = await readCheckoutEvents();
    const newCheckoutEvent: CheckoutEvent = { // Type newCheckoutEvent
      id: Date.now().toString(),
      cartItems,
      totalAmount,
      customerDetails,
      userId: userId || 'anonymous',
      timestamp: new Date().toISOString(),
      status,
    };

    checkoutEvents.push(newCheckoutEvent);
    await writeCheckoutEvents(checkoutEvents);

    return NextResponse.json(newCheckoutEvent, { status: 201 });
  } catch (error: unknown) {
    let message = 'An unknown error occurred.';
    if (error instanceof Error) {
      message = error.message;
    }
    return NextResponse.json({ message }, { status: 500 });
  }
}
