import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs/promises';
import path from 'path';

interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  // Add other properties if known, e.g., image, originalPrice, discountedPrice
}

const productsFilePath = path.join(process.cwd(), 'data', 'products.json');

// Helper function to read products from the JSON file
async function readProducts(): Promise<Product[]> {
  try {
    const data = await fs.readFile(productsFilePath, 'utf-8');
    if (!data.trim()) { // Check if data is empty or just whitespace
      return [];
    }
    return JSON.parse(data);
  } catch (error: unknown) {
    if ((error as NodeJS.ErrnoException).code === 'ENOENT') {
      // File does not exist, return an empty array
      return [];
    }
    console.error('Error reading products file:', error);
    let message = 'Failed to read products data.';
    if (error instanceof Error) {
      message = error.message;
    }
    throw new Error(message);
  }
}

// Helper function to write products to the JSON file
async function writeProducts(products: Product[]) {
  try {
    await fs.writeFile(productsFilePath, JSON.stringify(products, null, 2), 'utf-8');
  } catch (error: unknown) {
    console.error('Error writing products file:', error);
    let message = 'Failed to write products data.';
    if (error instanceof Error) {
      message = error.message;
    }
    throw new Error(message);
  }
}

export async function GET() {
  try {
    const products = await readProducts();
    return NextResponse.json(products);
  } catch (error: unknown) {
    let message = 'An unknown error occurred.';
    if (error instanceof Error) {
      message = error.message;
    }
    return NextResponse.json({ message }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const newProduct: Product = await req.json(); // Assuming the incoming product matches the interface
    const products = await readProducts();

    // Generate a unique ID for the new product
    newProduct.id = Date.now().toString(); // Simple timestamp-based ID

    products.push(newProduct);
    await writeProducts(products);

    return NextResponse.json(newProduct, { status: 201 });
  } catch (error: unknown) {
    let message = 'An unknown error occurred.';
    if (error instanceof Error) {
      message = error.message;
    }
    return NextResponse.json({ message }, { status: 500 });
  }
}
