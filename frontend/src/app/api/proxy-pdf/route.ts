import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const url = searchParams.get('url');

  if (!url) {
    return NextResponse.json({ error: 'Missing url parameter' }, { status: 400 });
  }

  // Normalize stale port references stored in the database
  const normalizedUrl = url.replace('localhost:8001', 'localhost:8000');

  try {
    const response = await fetch(normalizedUrl);

    if (!response.ok) {
      console.error(`PDF proxy: backend returned ${response.status} for ${normalizedUrl}`);
      return NextResponse.json(
        { error: `Backend returned ${response.status}` },
        { status: response.status }
      );
    }

    const buffer = await response.arrayBuffer();

    return new NextResponse(buffer, {
      headers: {
        'Content-Type': 'application/pdf',
        'Content-Disposition': 'inline',
        'Access-Control-Allow-Origin': '*',
      },
    });
  } catch (error) {
    console.error('PDF proxy error:', error);
    return NextResponse.json({ error: 'Failed to proxy PDF' }, { status: 500 });
  }
}
