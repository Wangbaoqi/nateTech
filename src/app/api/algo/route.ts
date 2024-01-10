import { NextRequest, NextResponse } from 'next/server';
export async function GET(request: NextRequest, context: any) {
  const greeting = 'Hello World!!';

  const json = {
    greeting
  };

  return NextResponse.json(json);
}
