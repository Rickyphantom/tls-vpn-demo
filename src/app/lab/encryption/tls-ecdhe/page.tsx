"use client";
import { useState } from "react";

async function generateECDHKeyPair(): Promise<CryptoKeyPair> {
  return await window.crypto.subtle.generateKey(
    {
      name: "ECDH",
      namedCurve: "P-256",
    },
    true,
    ["deriveKey", "deriveBits"]
  );
}

async function exportPublicKey(key: CryptoKey): Promise<string> {
  const spki = await window.crypto.subtle.exportKey("spki", key);
  return btoa(String.fromCharCode(...new Uint8Array(spki)));
}

async function deriveSecret(privateKey: CryptoKey, publicKey: CryptoKey): Promise<string> {
  const secret = await window.crypto.subtle.deriveBits(
    {
      name: "ECDH",
      public: publicKey,
    },
    privateKey,
    256
  );
  return Array.from(new Uint8Array(secret)).map(b => b.toString(16).padStart(2, '0')).join('');
}

export default function EcdheLab() {
  const [result, setResult] = useState("");

  const handleEcdheDemo = async () => {
    try {
      // Alice, Bob 키쌍 생성
      const alice = await generateECDHKeyPair();
      const bob = await generateECDHKeyPair();
      // 공개키 교환
      const alicePub = await exportPublicKey(alice.publicKey);
      const bobPub = await exportPublicKey(bob.publicKey);
      // 공유 비밀 계산
      const aliceSecret = await deriveSecret(alice.privateKey, bob.publicKey);
      const bobSecret = await deriveSecret(bob.privateKey, alice.publicKey);
      setResult(
        `Alice 공개키(base64):\n${alicePub}\n\nBob 공개키(base64):\n${bobPub}\n\n` +
        `Alice 공유 비밀: ${aliceSecret}\nBob 공유 비밀: ${bobSecret}\n` +
        (aliceSecret === bobSecret ? "공유 비밀 일치: 성공" : "공유 비밀 불일치: 실패")
      );
    } catch (e) {
      setResult("에러 발생: " + (e instanceof Error ? e.message : String(e)));
    }
  };

  return (
    <div>
      <h2 className="text-lg font-bold mb-2">ECDHE 실습</h2>
      <button
        className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        onClick={handleEcdheDemo}
      >
        ECDHE 키 교환 및 공유 비밀 실습
      </button>
      <pre className="mt-4 text-xs whitespace-pre-wrap">{result}</pre>
    </div>
  );
}

