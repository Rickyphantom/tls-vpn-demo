// app/api/tls-rsa/encrypt/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { rsaEncrypt } from '@/lib/forge-utils';

export async function POST(req: NextRequest) {
  const { publicKeyPem, plaintext } = await req.json();
  const encrypted = rsaEncrypt(publicKeyPem, plaintext);
  return NextResponse.json({ encrypted });
}
