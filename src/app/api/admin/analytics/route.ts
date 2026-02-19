import { NextResponse } from 'next/server';
import fs from 'fs/promises';
import path from 'path';

const cartEventsFilePath = path.join(process.cwd(), 'data', 'cart_events.json');
const checkoutEventsFilePath = path.join(process.cwd(), 'data', 'checkout_events.json');

async function readCartEvents() {
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
    return []; // Return empty array on error to prevent blocking analytics
  }
}

async function readCheckoutEvents() {
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
    return []; // Return empty array on error to prevent blocking analytics
  }
}

export async function GET() {
  try {
    const cartEvents = await readCartEvents();
    const checkoutEvents = await readCheckoutEvents();

    return NextResponse.json({
      cartEvents,
      checkoutEvents,
    });
  } catch (error: unknown) {
    let message = 'An unknown error occurred.';
    if (error instanceof Error) {
      message = error.message;
    }
    return NextResponse.json({ message }, { status: 500 });
  }
}
