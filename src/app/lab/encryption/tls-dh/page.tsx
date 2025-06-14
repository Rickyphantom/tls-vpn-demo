"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

// DH 파라미터 (실제 환경에서는 더 큰 소수 사용)
const DH_PRIME = 23;
const DH_BASE = 5;

export default function DHHandsOnLab() {
  // 상태 관리
  const [alicePrivate, setAlicePrivate] = useState<number>(0);
  const [alicePublic, setAlicePublic] = useState<number>(0);
  const [bobPrivate, setBobPrivate] = useState<number>(0);
  const [bobPublic, setBobPublic] = useState<number>(0);
  const [sharedSecret, setSharedSecret] = useState<number>(0);
  const [message, setMessage] = useState("SECRET_MSG");
  const [encryptedMsg, setEncryptedMsg] = useState("");
  const [decryptedMsg, setDecryptedMsg] = useState("");
  const [step, setStep] = useState(0); // 현재 단계 상태 추가

  // 1. 키 생성 단계
  const generateKeys = (isAlice: boolean) => {
    const privateKey = Math.floor(Math.random() * (DH_PRIME - 2)) + 2;
    const publicKey = Math.pow(DH_BASE, privateKey) % DH_PRIME;
    
    if(isAlice) {
      setAlicePrivate(privateKey);
      setAlicePublic(publicKey);
    } else {
      setBobPrivate(privateKey);
      setBobPublic(publicKey);
    }
  };

  // 2. 공유 비밀 계산 단계
  const calculateSecret = () => {
    const aliceSecret = Math.pow(bobPublic, alicePrivate) % DH_PRIME;
    const bobSecret = Math.pow(alicePublic, bobPrivate) % DH_PRIME;
    
    if(aliceSecret === bobSecret) {
      setSharedSecret(aliceSecret);
    }
  };

  // 3. 암호화/복호화 단계
  const simpleXORCipher = (text: string, key: number) => {
    return text.split('').map((char, index) => {
      return {
        char: String.fromCharCode(char.charCodeAt(0) ^ (key + index) % 256),
        key: index // 고유 key 추가
      };
    }).map(({ char }) => char).join('');
  };

  // 단계별 실행 핸들러
  const runFullProcess = () => {
    // 1. Alice 키 생성
    generateKeys(true);
    // 2. Bob 키 생성
    generateKeys(false);
    // 3. 공유 비밀 계산
    setTimeout(calculateSecret, 500);
    // 4. 암호화
    setTimeout(() => {
      setEncryptedMsg(btoa(simpleXORCipher(message, sharedSecret)));
    }, 1000);
    // 5. 복호화 
    setTimeout(() => {
      setDecryptedMsg(simpleXORCipher(atob(encryptedMsg), sharedSecret));
    }, 1500);
  };

  const clientColor = '#6c63ff';
  const keyColor = '#f8d90f';

  return (
    <div className="max-w-4xl mx-auto p-8 bg-gray-50 min-h-screen">
      <h1 className="text-3xl font-bold mb-8 text-blue-600">🛠️ TLS DH 실습 워크숍</h1>
      
      {/* 실습 컨트롤 패널 */}
      <div className="mb-8 space-y-4">
        <button
          onClick={runFullProcess}
          className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
        >
          전체 과정 실행
        </button>
      </div>

      {/* 단계별 표시 영역 */}
      <div className="grid grid-cols-2 gap-8">
        {/* Alice 영역 */}
        <div className="bg-white p-6 rounded-xl shadow-lg">
          <h2 className="text-xl font-semibold mb-4 text-blue-500">👩💻 Alice</h2>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1">개인키 (a)</label>
              <input
                type="number"
                value={alicePrivate}
                readOnly
                className="w-full p-2 border rounded bg-gray-50"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">공개키 (A = g^a mod p)</label>
              <input
                type="number"
                value={alicePublic}
                readOnly
                className="w-full p-2 border rounded bg-gray-50"
              />
            </div>
          </div>
        </div>

        {/* Bob 영역 */}
        <div className="bg-white p-6 rounded-xl shadow-lg">
          <h2 className="text-xl font-semibold mb-4 text-green-500">👨💻 Bob</h2>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1">개인키 (b)</label>
              <input
                type="number"
                value={bobPrivate}
                readOnly
                className="w-full p-2 border rounded bg-gray-50"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">공개키 (B = g^b mod p)</label>
              <input
                type="number"
                value={bobPublic}
                readOnly
                className="w-full p-2 border rounded bg-gray-50"
              />
            </div>
          </div>
        </div>
      </div>

      {/* 공유 비밀 및 암호화 영역 */}
      <div className="mt-8 bg-white p-6 rounded-xl shadow-lg">
        <div className="grid grid-cols-2 gap-8">
          <div>
            <h3 className="text-lg font-semibold mb-4">🔑 공유 비밀</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1">S = B^a mod p</label>
                <input
                  type="number"
                  value={sharedSecret}
                  readOnly
                  className="w-full p-2 border rounded bg-gray-50"
                />
              </div>
            </div>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4">📨 메시지 암호화</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1">원본 메시지</label>
                <input
                  type="text"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  className="w-full p-2 border rounded"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">암호문 (Base64)</label>
                <textarea
                  value={encryptedMsg}
                  readOnly
                  className="w-full p-2 border rounded bg-gray-50 h-24"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">복호화 결과</label>
                <input
                  type="text"
                  value={decryptedMsg}
                  readOnly
                  className="w-full p-2 border rounded bg-gray-50"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 단계별 설명 */}
      <div className="mt-8 p-6 bg-blue-50 rounded-xl">
        <h3 className="text-lg font-semibold mb-4">📌 실습 가이드</h3>
        <ol className="list-decimal list-inside space-y-3">
          <li>전체 과정 실행 버튼 클릭</li>
          <li>Alice와 Bob의 키 쌍 자동 생성</li>
          <li>공유 비밀 계산 확인</li>
          <li>메시지 암호화/복호화 과정 관찰</li>
          <li>값 변경 후 재실행 (메시지 수정 등)</li>
        </ol>
      </div>

      {/* 단계 애니메이션 영역 (임시로 여기에 배치) */}
      <div className="mt-8">
        <svg width="400" height="200">
          <motion.rect
            x={10} y={10} width={380} height={180} rx={15}
            fill="none" stroke="#007ace" strokeWidth={2}
          />
          <AnimatePresence>
            {step === 0 && (
              <motion.rect
                key="step-0-rect" // 고유 key 추가
                x={110} y={40} width={60} height={40} rx={10}
                fill="#f8d90f"
                initial={{ opacity: 0, x: -40 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 40 }}
                transition={{ duration: 0.6 }}
              />
            )}
            {step === 0 && (
              <motion.text
                key="step-0-text" // 고유 key 추가
                x={140} y={66} textAnchor="middle" fill="#333" fontSize="15"
                initial={{ opacity: 0, x: -40 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 40 }}
                transition={{ duration: 0.6, delay: 0.1 }}
              >암호화 목록</motion.text>
            )}
            {step === 1 && (
              <motion.rect
                key="step-1-rect" // 고유 key 추가
                x={190} y={40} width={60} height={40} rx={10}
                fill="#b2f7ef"
                initial={{ opacity: 0, x: 40 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -40 }}
                transition={{ duration: 0.6 }}
              />
            )}
            {step === 1 && (
              <motion.text
                key="step-1-text" // 고유 key 추가
                x={220} y={66} textAnchor="middle" fill="#333" fontSize="15"
                initial={{ opacity: 0, x: 40 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -40 }}
                transition={{ duration: 0.6, delay: 0.1 }}
              >인증서</motion.text>
            )}
            {step === 2 && (
              <motion.line
                key="step-2-line" // 고유 key 추가
                x1={100} y1={60} x2={260} y2={60}
                stroke={clientColor} strokeWidth={5}
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 0.8 }}
                markerEnd="url(#arrowheadA)"
              />
            )}
            {step === 2 && (
              <motion.circle
                key="step-2-circle" // 고유 key 추가
                cx={180} cy={60} r={18}
                fill={keyColor}
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.6 }}
              />
            )}
            {step === 2 && (
              <motion.text
                key="step-2-text" // 고유 key 추가
                x={180} y={66} textAnchor="middle" fill="#333" fontSize="18" fontWeight={700}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.1 }}
              >A</motion.text>
            )}
          </AnimatePresence>
        </svg>
      </div>
    </div>
  );
}
