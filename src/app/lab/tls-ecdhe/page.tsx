'use client';

import { useState } from 'react';

const steps = [
  {
    title: '1. ClientHello',
    subtitle: '클라이언트가 ECDHE 지원을 알리고 랜덤값을 보냅니다.',
    detail: (
      <>
        <div>
          <b className="text-orange-400">암호 스위트:</b> ECDHE, AES, ...<br />
          <b className="text-green-300">ClientRandom:</b> 0xA1B2C3...
        </div>
        <div className="mt-2 text-xs text-gray-400">
          클라이언트는 ECDHE를 지원하는 암호 스위트와 랜덤값을 서버에 보냅니다.
        </div>
      </>
    ),
  },
  {
    title: '2. ServerHello + Certificate + ECDHE 공개키',
    subtitle: '서버가 인증서와 임시 ECDHE 공개키, 랜덤값을 보냅니다.',
    detail: (
      <>
        <div>
          <b className="text-green-300">ServerRandom:</b> 0xD4E5F6...<br />
          <b className="text-blue-300">서버 ECDHE 공개키:</b> 0x04AABB...<br />
          <b className="text-orange-400">서버 인증서:</b> (공개키 포함)
        </div>
        <div className="mt-2 text-xs text-gray-400">
          서버는 임시로 생성한 ECDHE 공개키와 인증서를 함께 보냅니다.<br />
          인증서로 서버의 신원을 검증할 수 있습니다.
        </div>
      </>
    ),
  },
  {
    title: '3. ClientKeyExchange',
    subtitle: '클라이언트가 임시 ECDHE 키쌍을 만들고 공개키를 서버에 보냅니다.',
    detail: (
      <>
        <div>
          <b className="text-blue-300">클라이언트 ECDHE 공개키:</b> 0x04CCDD...
        </div>
        <div className="mt-2 text-xs text-gray-400">
          클라이언트도 임시 ECDHE 키쌍을 만들고, 공개키만 서버에 보냅니다.<br />
          비밀키는 절대 노출되지 않습니다.
        </div>
      </>
    ),
  },
  {
    title: '4. Pre-Master Secret 계산',
    subtitle: '서버와 클라이언트가 서로의 공개키와 자신의 비밀키로 공유 비밀값을 계산합니다.',
    detail: (
      <>
        <div>
          <b className="text-pink-300">서버:</b> (클라이언트 공개키 × 서버 비밀키)<br />
          <b className="text-pink-300">클라이언트:</b> (서버 공개키 × 클라이언트 비밀키)<br />
          <b className="text-yellow-300">공유 비밀값:</b> 0x8F2A...
        </div>
        <div className="mt-2 text-xs text-gray-400">
          수학적으로 두 계산 결과는 항상 같습니다.<br />
          이 값으로 Master Secret과 세션키를 파생합니다.
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
          임시 키쌍 덕분에 과거 세션이 노출되어도 안전합니다.
        </div>
      </>
    ),
  },

];

export default function TLSECDHE() {
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
            ECDHE 기반 TLS 교환 과정
          </h2>
          <p className="text-yellow-200 text-base font-medium">
            각 단계별로 ECDHE가 어떻게 동작하는지 확인해보세요!
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
            🎉 ECDHE 기반 TLS 교환이 완료되었습니다!
          </div>
        )}
      </div>
    </div>
  );
}
