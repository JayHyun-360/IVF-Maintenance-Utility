import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  return NextResponse.json({
    message: "Debug API is working",
    timestamp: new Date().toISOString(),
    method: request.method,
    url: request.url
  });
}
