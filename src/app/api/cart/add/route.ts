import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs/promises';
import path from 'path';

interface CartEvent {
  id: string;
  productId: string;
  quantity: number;
  type: 'add' | 'remove';
  userId: string;
  timestamp: string;
}

const cartEventsFilePath = path.join(process.cwd(), 'data', 'cart_events.json');

async function readCartEvents(): Promise<CartEvent[]> {
  try {
    const data = await fs.readFile(cartEventsFilePath, 'utf-8');
    if (!data.trim()) { // Check if data is empty or just whitespace
      return [];
    }
    return JSON.parse(data);
  } catch (error: unknown) {
    if ((error as NodeJS.ErrnoException).code === 'ENOENT') {
      return [];
    }
    console.error('Error reading cart events file:', error);
    let message = 'Failed to read cart events data.';
    if (error instanceof Error) {
      message = error.message;
    }
    throw new Error(message);
  }
}

async function writeCartEvents(events: CartEvent[]) {
  try {
    await fs.writeFile(cartEventsFilePath, JSON.stringify(events, null, 2), 'utf-8');
  } catch (error: unknown) {
    console.error('Error writing cart events file:', error);
    let message = 'Failed to write cart events data.';
    if (error instanceof Error) {
      message = error.message;
    }
    throw new Error(message);
  }
}

export async function POST(req: NextRequest) {
  try {
    const { productId, quantity, userId } = await req.json();

    if (!productId || !quantity) {
      return NextResponse.json({ message: 'Product ID and quantity are required.' }, { status: 400 });
    }

    const cartEvents = await readCartEvents();
    const newCartEvent: CartEvent = { // Type newCartEvent
      id: Date.now().toString(),
      productId,
      quantity,
      type: 'add',
      userId: userId || 'anonymous', // Assign 'anonymous' if no userId is provided
      timestamp: new Date().toISOString(),
    };

    cartEvents.push(newCartEvent);
    await writeCartEvents(cartEvents);

    return NextResponse.json(newCartEvent, { status: 201 });
  } catch (error: unknown) {
    let message = 'An unknown error occurred.';
    if (error instanceof Error) {
      message = error.message;
    }
    return NextResponse.json({ message }, { status: 500 });
  }
}
