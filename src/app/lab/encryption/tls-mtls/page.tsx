"use client";
import { useState } from "react";

async function generateKeyPair() {
  return await window.crypto.subtle.generateKey(
    { name: "RSASSA-PKCS1-v1_5", modulusLength: 2048, publicExponent: new Uint8Array([1, 0, 1]), hash: "SHA-256" },
    true,
    ["sign", "verify"]
  );
}

async function exportPublicKey(key: CryptoKey): Promise<string> {
  const spki = await window.crypto.subtle.exportKey("spki", key);
  return btoa(String.fromCharCode(...new Uint8Array(spki)));
}

export default function TLSClientMTLSPage() {
  const [caPub, setCaPub] = useState("");
  const [serverPub, setServerPub] = useState("");
  const [clientPub, setClientPub] = useState("");
  const [serverVerified, setServerVerified] = useState<string | null>(null);
  const [clientVerified, setClientVerified] = useState<string | null>(null);
  const [error, setError] = useState("");

  const generateAll = async () => {
    setError("");
    setServerVerified(null);
    setClientVerified(null);
    setCaPub("");
    setServerPub("");
    setClientPub("");
    try {
      const caKeyPair = await generateKeyPair();
      const serverKeyPair = await generateKeyPair();
      const clientKeyPair = await generateKeyPair();
      const caPubB64 = await exportPublicKey(caKeyPair.publicKey);
      const serverPubRaw = await window.crypto.subtle.exportKey("spki", serverKeyPair.publicKey);
      const clientPubRaw = await window.crypto.subtle.exportKey("spki", clientKeyPair.publicKey);
      const serverPubB64 = btoa(String.fromCharCode(...new Uint8Array(serverPubRaw)));
      const clientPubB64 = btoa(String.fromCharCode(...new Uint8Array(clientPubRaw)));
      setCaPub(caPubB64);
      setServerPub(serverPubB64);
      setClientPub(clientPubB64);
      const serverSignature = await window.crypto.subtle.sign("RSASSA-PKCS1-v1_5", caKeyPair.privateKey, new Uint8Array(serverPubRaw));
      const clientSignature = await window.crypto.subtle.sign("RSASSA-PKCS1-v1_5", caKeyPair.privateKey, new Uint8Array(clientPubRaw));
      const serverVerified = await window.crypto.subtle.verify("RSASSA-PKCS1-v1_5", caKeyPair.publicKey, serverSignature, new Uint8Array(serverPubRaw));
      const clientVerified = await window.crypto.subtle.verify("RSASSA-PKCS1-v1_5", caKeyPair.publicKey, clientSignature, new Uint8Array(clientPubRaw));
      setServerVerified(serverVerified ? "성공" : "실패");
      setClientVerified(clientVerified ? "성공" : "실패");
    } catch (e) {
      setError("키/서명 오류: " + (e instanceof Error ? e.message : String(e)));
    }
  };

  function shortKey(key: string) {
    return key ? key.slice(0, 40) + "..." : "";
  }

  return (
    <div className="p-6 max-w-screen-md mx-auto">
      <h1 className="text-2xl font-bold mb-4">🔐 TLS-like mTLS Playground</h1>
      <button
        type="button"
        className="mb-4 bg-blue-500 px-4 py-2 text-white"
        onClick={generateAll}
      >
        🔁 CA/서버/클라이언트 키 & 공개키 서명/검증
      </button>
      {error && <div className="text-red-500 mb-2">{error}</div>}
      <div className="bg-gray-100 border p-4 mb-4 text-sm rounded">
        <div className="mb-2">
          🏢 <strong>CA 공개키</strong>: <span className="break-all">{shortKey(caPub)}</span>
        </div>
        <div className="mb-2">
          🖥️ <strong>서버 공개키</strong>: <span className="break-all">{shortKey(serverPub)}</span>
        </div>
        <div className="mb-2">
          💻 <strong>클라이언트 공개키</strong>: <span className="break-all">{shortKey(clientPub)}</span>
        </div>
        <div className="mb-2">
          <span className="mr-2">🔑 <strong>서버 CA 서명 검증</strong>:</span>
          <span className={serverVerified === "성공" ? "text-green-600" : "text-red-600"}>{serverVerified ?? "-"}</span>
        </div>
        <div>
          <span className="mr-2">🔑 <strong>클라이언트 CA 서명 검증</strong>:</span>
          <span className={clientVerified === "성공" ? "text-green-600" : "text-red-600"}>{clientVerified ?? "-"}</span>
        </div>
      </div>
      <div className="text-gray-500 text-xs mb-2">※ mTLS는 실제로는 인증서 기반 상호 인증만 하고, 메시지 암호화는 별도 대칭키로 진행합니다.<br/>여기선 인증서/공개키 서명/검증만 시각화합니다.</div>
    </div>
  );
}

