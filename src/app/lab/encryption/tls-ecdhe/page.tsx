"use client";
import { useState } from "react";

async function generateECDHKeyPair() {
  return await window.crypto.subtle.generateKey(
    {
      name: "ECDH",
      namedCurve: "P-256",
    },
    true,
    ["deriveKey", "deriveBits"]
  );
}

// 타입 명시 추가
async function exportPublicKey(key: CryptoKey): Promise<string> {
  const spki = await window.crypto.subtle.exportKey('spki', key);
  return btoa(String.fromCharCode(...new Uint8Array(spki)));
}

async function deriveSecret(privateKey: CryptoKey, publicKey: CryptoKey): Promise<string> {
  const secret = await window.crypto.subtle.deriveBits(
    {
      name: 'ECDH',
      public: publicKey,
    },
    privateKey,
    256
  );
  return Array.from(new Uint8Array(secret)).map(b => b.toString(16).padStart(2, '0')).join('');
}

export default function TLSClientECDHEPage() {
  const [plaintext, setPlaintext] = useState("Pre-Master Secret");
  const [alicePub, setAlicePub] = useState("");
  const [bobPub, setBobPub] = useState("");
  const [aliceSecret, setAliceSecret] = useState("");
  const [bobSecret, setBobSecret] = useState("");
  const [ciphertext, setCiphertext] = useState("");
  const [recovered, setRecovered] = useState("");
  const [sharedOk, setSharedOk] = useState<string | null>(null);
  const [error, setError] = useState("");

  // 키쌍 및 공유비밀 생성
  const generateKeysAndSecret = async () => {
    setError("");
    setCiphertext("");
    setRecovered("");
    try {
      const alice = await generateECDHKeyPair();
      const bob = await generateECDHKeyPair();
      const alicePubB64 = await exportPublicKey(alice.publicKey);
      const bobPubB64 = await exportPublicKey(bob.publicKey);
      setAlicePub(alicePubB64);
      setBobPub(bobPubB64);
      const aliceSecretHex = await deriveSecret(alice.privateKey, bob.publicKey);
      const bobSecretHex = await deriveSecret(bob.privateKey, alice.publicKey);
      setAliceSecret(aliceSecretHex);
      setBobSecret(bobSecretHex);
      setSharedOk(aliceSecretHex === bobSecretHex ? "성공" : "실패");
    } catch (e) {
      setError("키 생성/공유비밀 오류: " + (e instanceof Error ? e.message : String(e)));
    }
  };

  // Alice가 Bob의 공개키로 공유비밀로 암호화 (여기선 XOR 예시)
  const encrypt = async () => {
    if (!aliceSecret) return setError("먼저 키를 생성하세요.");
    try {
      // XOR 예시 (실제 TLS는 대칭키 암호 사용)
      const ptBytes = new TextEncoder().encode(plaintext);
      const keyBytes = new Uint8Array(ptBytes.length).map((_, i) => parseInt(aliceSecret.substr((i%32)*2, 2), 16));
      const ctBytes = ptBytes.map((b, i) => b ^ keyBytes[i]);
      setCiphertext(btoa(String.fromCharCode(...ctBytes)));
    } catch (e) {
      setError("암호화 오류: " + (e instanceof Error ? e.message : String(e)));
    }
  };

  // Bob이 공유비밀로 복호화 (XOR)
  const decrypt = async () => {
    if (!bobSecret) return setError("먼저 키를 생성하세요.");
    try {
      const ctBytes = Uint8Array.from(atob(ciphertext), c => c.charCodeAt(0));
      const keyBytes = new Uint8Array(ctBytes.length).map((_, i) => parseInt(bobSecret.substr((i%32)*2, 2), 16));
      const ptBytes = ctBytes.map((b, i) => b ^ keyBytes[i]);
      setRecovered(new TextDecoder().decode(ptBytes));
    } catch (e) {
      setError("복호화 오류: " + (e instanceof Error ? e.message : String(e)));
    }
  };

  return (
    <div className="p-6 max-w-screen-md mx-auto">
      <h1 className="text-2xl font-bold mb-4">🔐 TLS-like ECDHE Playground</h1>
      <button
        type="button"
        className="mb-4 bg-blue-500 px-4 py-2 text-white"
        onClick={generateKeysAndSecret}
      >
        🔁 Alice/Bob 키쌍 & 공유비밀 생성
      </button>
      {error && <div className="text-red-500 mb-2">{error}</div>}
      <div className="bg-gray-100 border p-4 mb-4 text-sm rounded">
        <div>
          📌 <strong>Alice 공개키</strong>:<br />
          <textarea className="w-full bg-gray-50 p-2 mb-2" rows={2} value={alicePub} readOnly />
        </div>
        <div>
          📌 <strong>Bob 공개키</strong>:<br />
          <textarea className="w-full bg-gray-50 p-2 mb-2" rows={2} value={bobPub} readOnly />
        </div>
        <div>
          🔑 <strong>Alice 공유비밀</strong>: {aliceSecret}
        </div>
        <div>
          🔑 <strong>Bob 공유비밀</strong>: {bobSecret}
        </div>
        <div>
          ✅ <strong>공유비밀 일치</strong>: {sharedOk ?? '-'}
        </div>
      </div>
      <textarea
        className="w-full bg-white p-2 mb-4 border"
        placeholder="Plaintext"
        value={plaintext}
        onChange={e => setPlaintext(e.target.value)}
      />
      <button
        className="mb-4 bg-green-500 px-4 py-2 text-white"
        onClick={encrypt}
      >
        🔐 공유비밀로 암호화 (Alice→Bob)
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
        🔓 공유비밀로 복호화 (Bob)
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

