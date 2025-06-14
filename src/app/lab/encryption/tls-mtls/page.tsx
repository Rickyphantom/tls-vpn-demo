"use client";
import { useState } from "react";

export default function MtlsLab() {
  const [result, setResult] = useState("");

  const handleMtlsDemo = async () => {
    try {
      // CA 키쌍 생성
      const caKeyPair = await window.crypto.subtle.generateKey(
        { name: "RSASSA-PKCS1-v1_5", modulusLength: 2048, publicExponent: new Uint8Array([1, 0, 1]), hash: "SHA-256" },
        true,
        ["sign", "verify"]
      );
      // 서버 키쌍 생성
      const serverKeyPair = await window.crypto.subtle.generateKey(
        { name: "RSASSA-PKCS1-v1_5", modulusLength: 2048, publicExponent: new Uint8Array([1, 0, 1]), hash: "SHA-256" },
        true,
        ["sign", "verify"]
      );
      // 클라이언트 키쌍 생성
      const clientKeyPair = await window.crypto.subtle.generateKey(
        { name: "RSASSA-PKCS1-v1_5", modulusLength: 2048, publicExponent: new Uint8Array([1, 0, 1]), hash: "SHA-256" },
        true,
        ["sign", "verify"]
      );
      // "인증서" 대신 공개키를 CA로 서명
      const enc = new TextEncoder();
      const serverPub = await window.crypto.subtle.exportKey("spki", serverKeyPair.publicKey);
      const clientPub = await window.crypto.subtle.exportKey("spki", clientKeyPair.publicKey);
      const serverSignature = await window.crypto.subtle.sign("RSASSA-PKCS1-v1_5", caKeyPair.privateKey, new Uint8Array(serverPub));
      const clientSignature = await window.crypto.subtle.sign("RSASSA-PKCS1-v1_5", caKeyPair.privateKey, new Uint8Array(clientPub));
      // 검증
      const serverVerified = await window.crypto.subtle.verify("RSASSA-PKCS1-v1_5", caKeyPair.publicKey, serverSignature, new Uint8Array(serverPub));
      const clientVerified = await window.crypto.subtle.verify("RSASSA-PKCS1-v1_5", caKeyPair.publicKey, clientSignature, new Uint8Array(clientPub));
      setResult(
        `서버 공개키(base64):\n${btoa(String.fromCharCode(...new Uint8Array(serverPub)))}\n` +
        `클라이언트 공개키(base64):\n${btoa(String.fromCharCode(...new Uint8Array(clientPub)))}\n` +
        `서버가 CA 서명 검증: ${serverVerified ? "성공" : "실패"}\n` +
        `클라이언트가 CA 서명 검증: ${clientVerified ? "성공" : "실패"}`
      );
    } catch (e) {
      setResult("에러 발생: " + (e instanceof Error ? e.message : String(e)));
    }
  };

  return (
    <div>
      <h2 className="text-lg font-bold mb-2">mTLS 실습</h2>
      <button
        className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        onClick={handleMtlsDemo}
      >
        mTLS 인증서 생성 및 상호 검증 실습
      </button>
      <pre className="mt-4 text-xs whitespace-pre-wrap">{result}</pre>
    </div>
  );
}

