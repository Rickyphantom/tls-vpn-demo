// app/api/tls-rsa/encrypt

import { NextRequest, NextResponse } from 'next/server';
import * as forge from 'node-forge';

export async function POST(req: NextRequest) {
  const { publicKeyPem, plaintext } = await req.json();
  const publicKey = forge.pki.publicKeyFromPem(publicKeyPem);
  const encrypted = publicKey.encrypt(
    forge.util.encodeUtf8(plaintext),
    'RSA-OAEP'
  );
  return NextResponse.json({ encrypted: forge.util.encode64(encrypted) });
}
