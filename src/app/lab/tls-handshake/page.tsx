'use client';

import { useState, ReactNode } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// 🪄 Tooltip 컴포넌트
function Tooltip({
  children,
  content,
}: {
  children: ReactNode;
  content: ReactNode;
}) {
  const [visible, setVisible] = useState(false);
  return (
    <div
      className="relative inline-block"
      onMouseEnter={() => setVisible(true)}
      onMouseLeave={() => setVisible(false)}
    >
      {children}
      {visible && (
        <div
          className="absolute bottom-full mb-2 left-1/2 -translate-x-1/2 z-50 
                  max-w-md w-max bg-gray-800 text-white text-xs rounded px-3 py-2 
                  shadow-lg transition-opacity duration-300 opacity-100 
                  whitespace-normal text-left break-words"
        >
          <div className="absolute top-full left-1/2 -translate-x-1/2 w-2 h-2 bg-gray-800 rotate-45" />
          {content}
        </div>
      )}
    </div>
  );
}

// 단계 정의
const steps = [
  {
    id: 'clientHello',
    title: '1. ClientHello',
    short: 'ClientHello',
    card: (
      <>
        클라이언트는 TLS 연결을 시작하기 위해 ServerHello에 필요한 정보를
        보냅니다.
        <br />
        <span className="text-orange-300 font-semibold">암호 스위트</span> 목록,
        TLS 버전, <span className="text-orange-300 font-semibold">랜덤값</span>{' '}
        등 초기 설정 정보가 포함됩니다.
      </>
    ),
    tooltip: (
      <>
        🔑 <span className="text-orange-300 font-semibold">암호 스위트</span>:
        사용할 수 있는 암호 알고리즘 조합
        <br />
        🎲 <span className="text-orange-300 font-semibold">ClientRandom</span>:
        클라이언트가 생성한 32바이트 난수
      </>
    ),
  },
  {
    id: 'serverHello',
    title: '2. ServerHello',
    short: 'ServerHello',
    card: (
      <>
        서버는 클라이언트가 제안한 목록 중 지원 가능한 암호 스위트를 선택하여
        응답합니다.
        <br />
        서버의 인증서와{' '}
        <span className="text-orange-300 font-semibold">ServerRandom</span>도
        포함됩니다.
      </>
    ),
    tooltip: (
      <>
        🔐 <span className="text-orange-300 font-semibold">ServerRandom</span>:
        서버가 생성한 난수, 키 파생에 사용됨
        <br />
        🧾 <span className="text-orange-300 font-semibold">인증서</span>: 서버의
        공개키와 서명이 포함된 증명 문서
      </>
    ),
  },
  {
    id: 'certificate',
    title: '3. Certificate',
    short: 'Certificate',
    card: (
      <>
        서버는 클라이언트에게 신뢰 가능한{' '}
        <span className="text-orange-300 font-semibold">공개키 인증서</span>를
        전송합니다.
        <br />이 인증서를 통해 클라이언트는 서버의 공개키를 검증하고 확보합니다.
      </>
    ),
    tooltip: (
      <>
        📜 <span className="text-orange-300 font-semibold">공개키 인증서</span>:
        서버의 공개키 및 발급자 정보 포함
        <br />
        🔍 <span className="text-orange-300 font-semibold">CA 서명</span>:
        인증서의 유효성은 서명 및 CA 체인을 통해 검증됨
      </>
    ),
  },
  {
    id: 'keyExchange',
    title: '4. Key Exchange',
    short: 'Key Exchange',
    card: (
      <>
        클라이언트는{' '}
        <span className="text-orange-300 font-semibold">Premaster Secret</span>
        을 생성하고 서버의 공개키로 암호화하여 전송합니다.
        <br />
        이를 통해 클라이언트와 서버는 동일한{' '}
        <span className="text-orange-300 font-semibold">Master Secret</span>을
        생성합니다.
      </>
    ),
    tooltip: (
      <>
        🔑{' '}
        <span className="text-orange-300 font-semibold">Premaster Secret</span>:
        공유된 세션 키 생성을 위한 임시 비밀값
        <br />
        🧬 <span className="text-orange-300 font-semibold">Master Secret</span>:
        최종 세션 키 도출을 위한 기반 키 자료
      </>
    ),
  },
  {
    id: 'finished',
    title: '5. Finished',
    short: 'Finished',
    card: (
      <>
        클라이언트와 서버는 암호화된{' '}
        <span className="text-orange-300 font-semibold">Finished 메시지</span>를
        주고받아 무결성을 확인합니다.
        <br />
        이후부터는{' '}
        <span className="text-orange-300 font-semibold">대칭키 통신</span>이
        시작됩니다.
      </>
    ),
    tooltip: (
      <>
        ✅{' '}
        <span className="text-orange-300 font-semibold">Finished 메시지</span>:
        Handshake 과정의 무결성 검증 메시지
        <br />
        🔒 <span className="text-orange-300 font-semibold">대칭키 통신</span>:
        이후의 실제 데이터 암호화 방식
      </>
    ),
  },
];

export default function TLSHandshakePage() {
  const [currentStep, setCurrentStep] = useState(0);
  const step = steps[currentStep];

  return (
    <div className="min-h-screen bg-black text-white p-6">
      <div className="bg-gray-950 text-white p-6 rounded-lg shadow mb-8 max-w-5xl mx-auto">
        <h2 className="text-2xl font-semibold text-orange-400 mb-2">
          🧩 TLS Handshake란?
        </h2>
        <p className="text-gray-300 leading-relaxed">
          TLS(Transport Layer Security) Handshake는 클라이언트와 서버가 보안
          연결을 설정하기 위한 초기 통신 절차입니다. 이 과정을 통해 서로를
          인증하고,
          <strong className="text-orange-300">공유된 비밀 키</strong>를 안전하게
          생성하여 이후 통신을 암호화합니다.
        </p>
        <p className="text-gray-400 text-sm mt-3">
          👉 쉽게 말해, TLS Handshake는 두 장치가 서로 “암호화된 대화를 시작”할
          준비를 마치는 과정입니다.
        </p>
      </div>

      <div className="max-w-5xl mx-auto mb-10">
        <img
          src="/tls-ssl-handshake.png"
          alt="TLS Handshake 흐름도 (TCP + TLS)"
          style={{ width: '50%', height: 'auto', display: 'block' }}
          className="rounded-lg shadow-lg border border-gray-700"
        />
        <p className="text-center text-gray-400 mt-2 text-sm">
          ▲ TLS 연결 수립 시 실제 TCP + TLS 교환 흐름
        </p>
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={step.id}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.4 }}
          className="bg-gray-900 p-6 rounded-lg shadow-lg max-w-3xl mx-auto mb-10"
        >
          <span className="text-orange-400 font-semibold">{step.title}</span>
          <div className="text-gray-300 mt-4 space-y-2 leading-relaxed">
            {step.card}
          </div>

          <div className="flex justify-between mt-6">
            <button
              onClick={() => setCurrentStep((i) => Math.max(i - 1, 0))}
              disabled={currentStep === 0}
              className="px-4 py-2 bg-gray-700 hover:bg-gray-600 rounded disabled:opacity-40"
            >
              ◀ 이전
            </button>
            <button
              onClick={() =>
                setCurrentStep((i) => Math.min(i + 1, steps.length - 1))
              }
              disabled={currentStep === steps.length - 1}
              className="px-4 py-2 bg-orange-500 hover:bg-orange-600 rounded"
            >
              ▶ 다음
            </button>
          </div>
        </motion.div>
      </AnimatePresence>

      <div className="flex justify-center gap-2 text-sm flex-wrap mt-6">
        {steps.map((s, i) => (
          <Tooltip key={s.id} content={s.tooltip}>
            <div
              className={`px-3 py-1 rounded-full border cursor-default transition-all ${
                i < currentStep
                  ? 'bg-green-600 border-green-500 text-white'
                  : i === currentStep
                  ? 'bg-orange-500 border-orange-400 text-white'
                  : 'border-gray-600 text-gray-400'
              }`}
            >
              {s.short}
            </div>
          </Tooltip>
        ))}
      </div>

      {currentStep === steps.length - 1 && (
        <div className="text-center mt-10 text-green-400 font-semibold">
          🎉 TLS Handshake가 성공적으로 완료되었습니다!
        </div>
      )}
    </div>
  );
}
