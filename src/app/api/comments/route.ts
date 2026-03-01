import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs/promises';
import path from 'path';

interface Comment {
  id: string;
  productId: string;
  userName: string;
  text: string;
  rating: number;
  timestamp: string;
}

const commentsFilePath = path.join(process.cwd(), 'data', 'comments.json');

async function readComments(): Promise<Comment[]> {
  try {
    const data = await fs.readFile(commentsFilePath, 'utf-8');
    if (!data.trim()) {
      return [];
    }
    return JSON.parse(data);
  } catch (error: unknown) {
    if ((error as { code?: string }).code === 'ENOENT') {
      return [];
    }
    return [];
  }
}

async function writeComments(comments: Comment[]) {
  try {
    // Note: Vercel filesystem is read-only at runtime. 
    // This will work locally but will fail on Vercel.
    // Adding a check to avoid crashing the server.
    await fs.writeFile(commentsFilePath, JSON.stringify(comments, null, 2), 'utf-8');
  } catch (error) {
    console.error('File system write error (likely Vercel environment):', error);
  }
}

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const productId = searchParams.get('productId');

  if (!productId) {
    return NextResponse.json({ message: 'Product ID is required.' }, { status: 400 });
  }

  const comments = await readComments();
  const productComments = comments.filter(c => c.productId === productId);

  return NextResponse.json(productComments);
}

export async function POST(req: NextRequest) {
  try {
    const { productId, userName, text, rating } = await req.json();

    if (!productId || !userName || !text || rating === undefined) {
      return NextResponse.json({ message: 'Missing required fields.' }, { status: 400 });
    }

    const comments = await readComments();
    const newComment: Comment = {
      id: Date.now().toString(),
      productId,
      userName,
      text,
      rating: Number(rating),
      timestamp: new Date().toISOString(),
    };

    comments.push(newComment);
    await writeComments(comments);

    return NextResponse.json(newComment, { status: 201 });
  } catch (error: unknown) {
    return NextResponse.json({ message: (error as Error).message }, { status: 500 });
  }
}
