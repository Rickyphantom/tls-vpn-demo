// app/api/tls-rsa/decrypt
import { NextRequest, NextResponse } from 'next/server';
import { rsaDecrypt } from '@/lib/forge-utils';

export async function POST(req: NextRequest) {
  const { privateKeyPem, encryptedBase64 } = await req.json();

  try {
    const recoveredText = rsaDecrypt(privateKeyPem, encryptedBase64);
    return NextResponse.json({ recoveredText });
  } catch (err) {
    return NextResponse.json({ error: 'Decryption failed' }, { status: 400 });
  }
}
