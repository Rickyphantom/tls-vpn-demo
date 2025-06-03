'use client';

import { useState } from 'react';

export default function TLSRSA() {
  const [step, setStep] = useState(0);

  const steps = [
    '클라이언트가 ServerHello 요청을 보냅니다.',
    '서버는 인증서(RSA 공개키 포함)를 클라이언트에게 보냅니다.',
    '클라이언트는 pre-master secret을 서버의 공개키로 암호화해 전송합니다.',
    '서버는 자신의 개인키로 복호화하여 대칭키를 생성합니다.',
    '서버와 클라이언트는 같은 대칭키로 세션을 시작합니다.',
  ];

  return (
    <div>
      <h2>🔐 TLS with RSA Handshake 시뮬레이션</h2>
      <p>{steps[step]}</p>
      <button
        onClick={() => setStep((prev) => Math.min(prev + 1, steps.length - 1))}
        disabled={step >= steps.length - 1}
      >
        다음 단계 →
      </button>
    </div>
  );
}
