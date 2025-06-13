'use client';

import { useState } from 'react';
import Image from 'next/image';

const steps = [
  {
    title: '1. ClientHello',
    subtitle: '클라이언트가 지원 암호스위트와 랜덤값을 서버에 보냅니다.',
    detail: (
      <>
        <div>
          <b className="text-orange-400">암호 스위트:</b> ECDHE, RSA, ...<br />
          <b className="text-green-300">ClientRandom:</b> 0xA1B2C3...
        </div>
        <div className="mt-2 text-xs text-gray-400">
          클라이언트는 지원하는 암호스위트와 랜덤값을 서버에 보냅니다.
        </div>
      </>
    ),
  },
  {
    title: '2. ServerHello + Certificate + CertificateRequest',
    subtitle: '서버가 인증서와 클라이언트 인증서 요청 메시지를 보냅니다.',
    detail: (
      <>
        <div>
          <b className="text-green-300">ServerRandom:</b> 0xD4E5F6...<br />
          <b className="text-orange-400">서버 인증서:</b> (공개키 포함)<br />
          <b className="text-blue-300">CertificateRequest:</b> 클라이언트 인증서 요청
        </div>
        <div className="mt-2 text-xs text-gray-400">
          서버는 자신의 인증서와 함께 클라이언트에게 인증서를 요청합니다.<br />
          mTLS에서는 서버와 클라이언트 모두 인증서를 사용해 신원을 검증합니다.
        </div>
      </>
    ),
  },
  {
    title: '3. Client Certificate + ClientKeyExchange',
    subtitle: '클라이언트가 자신의 인증서와 키 교환 메시지를 서버에 보냅니다.',
    detail: (
      <>
        <div>
          <b className="text-orange-400">클라이언트 인증서:</b> (공개키 포함)<br />
          <b className="text-blue-300">ClientKeyExchange:</b> pre-master secret 등
        </div>
        <div className="mt-2 text-xs text-gray-400">
          클라이언트는 자신의 인증서와 키 교환 메시지를 서버에 보냅니다.<br />
          서버는 클라이언트 인증서의 유효성을 검증합니다.
        </div>
      </>
    ),
  },
  {
    title: '4. 인증서 검증 및 세션키 생성',
    subtitle: '서버와 클라이언트가 서로의 인증서를 검증하고 세션키를 생성합니다.',
    detail: (
      <>
        <div>
          <b className="text-pink-300">서버:</b> 클라이언트 인증서 검증<br />
          <b className="text-pink-300">클라이언트:</b> 서버 인증서 검증<br />
          <b className="text-yellow-300">공유 비밀값:</b> pre-master secret
        </div>
        <div className="mt-2 text-xs text-gray-400">
          양쪽 모두 상대방 인증서를 검증하고, 세션키를 생성합니다.
        </div>
      </>
    ),
  },
  {
    title: '5. Finished & 대칭키 통신',
    subtitle: 'Finished 메시지 교환 후 대칭키로 암호화 통신을 시작합니다.',
    detail: (
      <>
        <div>
          <b className="text-orange-400">Master Secret</b> 파생 및 세션키 생성<br />
          <b className="text-orange-400">대칭키</b>로 모든 통신 암호화
        </div>
        <div className="mt-2 text-xs text-gray-400">
          이제부터는 대칭키로 안전하게 데이터를 주고받습니다.<br />
          mTLS에서는 양쪽 모두 신원이 검증된 상태입니다.
        </div>
      </>
    ),
  },
];

const stepImages = [
  '/tls-mtls1.png',
  '/tls-mtls2.png',
  '/tls-mtls3.png',
  '/tls-mtls4.png',
  '/tls-mtls5.png',
];

export default function TLSMTLS() {
  const [step, setStep] = useState(0);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center py-10 px-2"
      style={{
        background: 'repeating-linear-gradient(135deg, #232526 0px, #232526 40px, #414345 40px, #414345 80px)'
      }}
    >
      <div className="w-full max-w-3xl rounded-3xl shadow-2xl border border-gray-700 overflow-hidden"
        style={{
          background: 'rgba(30,32,34,0.95)',
          boxShadow: '0 8px 40px #000a, 0 1.5px 0 #fff1 inset'
        }}
      >
        {/* 헤더 */}
        <div className="py-7 px-8 text-center border-b border-gray-800"
          style={{
            background: 'linear-gradient(90deg, #232526 60%, #fbbf24 100%)',
          }}
        >
          <h2 className="text-3xl font-extrabold text-white drop-shadow mb-2 tracking-tight">
            mTLS 기반 TLS 교환 과정
          </h2>
          <p className="text-yellow-200 text-base font-medium">
            각 단계별로 mTLS가 어떻게 동작하는지 확인해보세요!
          </p>
        </div>
        {/* 진행 바 */}
        <div className="w-full bg-gray-900 h-2 flex items-center border-b border-gray-800">
          {steps.map((_, i) => (
            <div
              key={i}
              className={`h-2 transition-all duration-300 ${
                i < step
                  ? 'bg-green-400'
                  : i === step
                  ? 'bg-orange-400'
                  : 'bg-gray-700'
              }`}
              style={{
                width: `${100 / steps.length}%`,
                borderTopLeftRadius: i === 0 ? 8 : 0,
                borderBottomLeftRadius: i === 0 ? 8 : 0,
                borderTopRightRadius: i === steps.length - 1 ? 8 : 0,
                borderBottomRightRadius: i === steps.length - 1 ? 8 : 0,
              }}
            />
          ))}
        </div>
        {/* 단계 카드 */}
        <div className="flex flex-col items-center px-8 py-10 bg-gradient-to-br from-[#232526]/90 to-[#fbbf24]/10">
          <div className="flex items-center gap-5 mb-6">
            <div className="w-14 h-14 rounded-full flex items-center justify-center shadow-lg"
              style={{
                background: step === steps.length - 1
                  ? 'linear-gradient(135deg, #22c55e 60%, #fbbf24 100%)'
                  : 'linear-gradient(135deg, #232526 60%, #fbbf24 100%)',
                fontSize: '2rem',
                color: step === steps.length - 1 ? '#fff' : '#fbbf24',
                border: '2.5px solid #fbbf24',
              }}
            >
              {step + 1}
            </div>
            <div>
              <div className="text-xl font-bold text-orange-300">{steps[step].title}</div>
              <div className="text-base text-gray-300">{steps[step].subtitle}</div>
            </div>
          </div>
          {/* 단계별 이미지 표시 */}
          <div className="w-full flex justify-center mb-6">
            <Image
              src={stepImages[step]}
              alt={`mTLS Step ${step + 1}`}
              width={700}
              height={350}
              className="rounded-lg border border-gray-700 bg-white"
              style={{ maxWidth: '100%', height: 'auto' }}
            />
          </div>
          <div className="w-full text-gray-100 text-base mb-4">{steps[step].detail}</div>
          <div className="flex gap-3 mt-4">
            <button
              onClick={() => setStep((prev) => Math.max(prev - 1, 0))}
              disabled={step === 0}
              className="px-5 py-2 rounded-lg bg-gray-700 hover:bg-gray-600 text-white font-semibold transition disabled:opacity-40 shadow"
            >
              ◀ 이전
            </button>
            <button
              onClick={() => setStep((prev) => Math.min(prev + 1, steps.length - 1))}
              disabled={step >= steps.length - 1}
              className="px-5 py-2 rounded-lg bg-gradient-to-r from-orange-400 to-yellow-400 text-gray-900 font-semibold shadow hover:brightness-110 transition"
            >
              다음 단계 →
            </button>
          </div>
          <div className="flex gap-2 mt-8">
            {steps.map((_, i) => (
              <div
                key={i}
                className={`w-4 h-4 rounded-full border-2 transition-all duration-200 ${
                  i < step
                    ? 'bg-green-400 border-green-400'
                    : i === step
                    ? 'bg-orange-400 border-orange-400 scale-110'
                    : 'bg-gray-700 border-gray-600'
                }`}
              />
            ))}
          </div>
        </div>
        {step === steps.length - 1 && (
          <div className="py-8 text-green-400 font-bold text-center text-lg bg-gradient-to-r from-green-900/40 to-green-700/10 border-t border-green-700">
            🎉 mTLS 기반 TLS 교환이 완료되었습니다!
          </div>
        )}
      </div>
    </div>
  );
}
