// lab/encryption/tls-rsa
'use client';

import { useEffect, useState } from 'react';
import axios from 'axios';
import * as forge from 'node-forge';

export default function TLSRSAClientPage() {
  const [plaintext, setPlaintext] = useState('Pre-Master Secret');
  const [cert, setCert] = useState('');
  const [publicKeyPem, setPublicKeyPem] = useState('');
  const [privateKeyPem, setPrivateKeyPem] = useState('');
  const [ciphertext, setCiphertext] = useState('');
  const [recovered, setRecovered] = useState('');
  const [certInfo, setCertInfo] = useState<{
    subjectCN: string;
    issuerCN: string;
    validFrom: string;
    validTo: string;
    publicKeyBits: number;
  } | null>(null);

  const fetchCert = async () => {
    const res = await fetch('/api/tls-rsa/generate-cert');
    const data = await res.json();
    setCert(data.certPem);
    setPublicKeyPem(data.publicKeyPem);
    setPrivateKeyPem(data.privateKeyPem);

    const parsed = parseCertificate(data.certPem);
    setCertInfo(parsed);
  };

  const encrypt = async () => {
    const res = await fetch('/api/tls-rsa/encrypt', {
      method: 'POST',
      body: JSON.stringify({ publicKeyPem, plaintext }),
      headers: { 'Content-Type': 'application/json' },
    });
    const data = await res.json();
    setCiphertext(data.encrypted);
  };

  const decrypt = async () => {
    const res = await axios.post('/api/tls-rsa/decrypt', {
      privateKeyPem,
      encryptedBase64: ciphertext,
    });
    setRecovered(res.data.recoveredText);
  };

  function parseCertificate(certPem: string) {
    const cert = forge.pki.certificateFromPem(certPem);

    const subjectCN = cert.subject.getField('CN')?.value || '(없음)';
    const issuerCN = cert.issuer.getField('CN')?.value || '(없음)';

    const validFrom = cert.validity.notBefore.toISOString();
    const validTo = cert.validity.notAfter.toISOString();
    const rsaKey = cert.publicKey as forge.pki.rsa.PublicKey;
    const publicKeyBits = rsaKey.n.bitLength();

    return {
      subjectCN,
      issuerCN,
      validFrom,
      validTo,
      publicKeyBits,
    };
  }

  return (
    <div className="p-6 max-w-screen-md mx-auto">
      <h1 className="text-2xl font-bold mb-4">🔐 TLS-like RSA Playground</h1>

      <button
        type="button"
        className="mb-4 bg-blue-500 px-4 py-2 text-white"
        onClick={fetchCert}
      >
        🔁 키 & 인증서 발급
      </button>

      <textarea
        className="w-full bg-gray-100 p-2 mb-4"
        rows={6}
        value={cert}
        readOnly
      />
      {/* ✅ 여기에 표시 */}
      {certInfo && (
        <div className="bg-gray-100 border p-4 mb-4 text-sm rounded">
          <div>
            📌 <strong>CN</strong>: {certInfo.subjectCN}
          </div>
          <div>
            🔑 <strong>발급자</strong>: {certInfo.issuerCN}
          </div>
          <div>
            🕒 <strong>유효기간</strong>: {certInfo.validFrom} ~{' '}
            {certInfo.validTo}
          </div>
          <div>
            🔐 <strong>공개키 비트수</strong>: {certInfo.publicKeyBits} bits
          </div>
        </div>
      )}
      <textarea
        className="w-full bg-white p-2 mb-4 border"
        placeholder="Plaintext"
        value={plaintext}
        onChange={(e) => setPlaintext(e.target.value)}
      />

      <button
        className="mb-4 bg-green-500 px-4 py-2 text-white"
        onClick={encrypt}
      >
        🔐 공개키 암호화
      </button>

      <textarea
        className="w-full bg-gray-100 p-2 mb-4"
        rows={4}
        value={ciphertext}
        readOnly
      />

      <button
        className="mb-4 bg-purple-500 px-4 py-2 text-white"
        onClick={decrypt}
      >
        🔓 서버 복호화 요청
      </button>

      <textarea
        className="w-full bg-gray-50 p-2 mb-4 border"
        rows={2}
        value={recovered}
        readOnly
      />
    </div>
  );
}
