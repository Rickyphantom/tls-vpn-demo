'use client';

import Image from 'next/image';
import { useState } from 'react';

export default function TLSRSA() {
  const [step, setStep] = useState(0);

  const steps = [
    '클라이언트가 서버에게 Hello 요청을 보냅니다.',
    '서버는 Hello와 함께 인증서(RSA 공개키 포함)를 클라이언트에게 보냅니다.',
    '클라이언트는 pre-master secret을 서버의 공개키로 암호화해 전송합니다.',
    '서버는 자신의 개인키로 복호화하여 대칭키를 생성합니다.',
    '서버와 클라이언트는 같은 대칭키로 세션을 시작합니다.',
  ];

  const stepImages = [
    '/tls-rsa-1.jpg',
    '/tls-rsa-2.jpg',
    '/tls-rsa-3.jpg',
    '/tls-rsa-4.jpg',
    '/tls-rsa-5.jpg',
  ];

  return (
    <div className="p-4">
      <h2 className="text-xl font-semibold mb-10">
        🔐 TLS with RSA Handshake 시뮬레이션
      </h2>

      <div className="mb-6">
        <Image
          src={stepImages[step]}
          alt={`TLS RSA Step ${step + 1}`}
          width={900}
          height={600}
          className="rounded border border-black mr-auto"
        />
      </div>

      <p className="text-xl mb-10">{steps[step]}</p>

      <div className="flex gap-4 justify-left">
        <button
          onClick={() => setStep((prev) => Math.max(prev - 1, 0))}
          disabled={step === 0}
          className="bg-black text-white px-4 py-2 rounded disabled:opacity-50"
        >
          ← 이전 단계
        </button>

        <button
          onClick={() =>
            setStep((prev) => Math.min(prev + 1, steps.length - 1))
          }
          disabled={step >= steps.length - 1}
          className="bg-black text-white px-4 py-2 rounded disabled:opacity-50"
        >
          다음 단계 →
        </button>
      </div>
    </div>
  );
}
