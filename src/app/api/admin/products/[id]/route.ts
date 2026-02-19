import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs/promises';
import path from 'path';

interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  // Add other properties if known, e.g., imageUrl, category
}

const productsFilePath = path.join(process.cwd(), 'data', 'products.json');

// Helper function to read products from the JSON file
async function readProducts(): Promise<Product[]> {
  try {
    const data = await fs.readFile(productsFilePath, 'utf-8');
    return JSON.parse(data);
  } catch (error: unknown) {
    if ((error as NodeJS.ErrnoException).code === 'ENOENT') {
      return []; // File does not exist, return an empty array
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

export async function GET(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    const products = await readProducts();
    const product = products.find((p: Product) => p.id === params.id);

    if (!product) {
      return NextResponse.json({ message: 'Product not found' }, { status: 404 });
    }

    return NextResponse.json(product);
  } catch (error: unknown) {
    let message = 'An unknown error occurred.';
    if (error instanceof Error) {
      message = error.message;
    }
    return NextResponse.json({ message }, { status: 500 });
  }
}

export async function PUT(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    const updatedProductData: Partial<Product> = await req.json();
    const productsArr = await readProducts(); // Use productsArr for mutable copy

    const index = productsArr.findIndex((p: Product) => p.id === params.id);

    if (index === -1) {
      return NextResponse.json({ message: 'Product not found' }, { status: 404 });
    }

    productsArr[index] = { ...productsArr[index], ...updatedProductData, id: params.id }; // Ensure ID remains consistent
    await writeProducts(productsArr);

    return NextResponse.json(productsArr[index]);
  } catch (error: unknown) {
    let message = 'An unknown error occurred.';
    if (error instanceof Error) {
      message = error.message;
    }
    return NextResponse.json({ message }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    let productsArr = await readProducts(); // Use productsArr for mutable copy
    const initialLength = productsArr.length;
    productsArr = productsArr.filter((p: Product) => p.id !== params.id);

    if (productsArr.length === initialLength) {
      return NextResponse.json({ message: 'Product not found' }, { status: 404 });
    }

    await writeProducts(productsArr);

    return NextResponse.json({ message: 'Product deleted successfully' }, { status: 200 });
  } catch (error: unknown) {
    let message = 'An unknown error occurred.';
    if (error instanceof Error) {
      message = error.message;
    }
    return NextResponse.json({ message }, { status: 500 });
  }
}
