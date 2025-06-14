// app/api/tls-rsa/generate-cert
import { NextResponse } from 'next/server';
import { generateCertificate } from '@/lib/forge-utils';

export async function GET() {
  const { publicKeyPem, privateKeyPem, certPem } = generateCertificate(1024);

  return NextResponse.json({
    publicKeyPem,
    privateKeyPem,
    certPem,
  });
}
