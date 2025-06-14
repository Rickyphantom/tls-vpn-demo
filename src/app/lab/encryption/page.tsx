import Link from 'next/link';

export default function EncryptionMenuPage() {
  return (
    <div>
      <h2 className="text-xl font-bold mb-4">🔐 암호화 실습 메뉴</h2>
      <ul style={{ lineHeight: '2' }}>
        <li>
          🔐 <Link href="/lab/encryption/tls-rsa">RSA 실습</Link>
        </li>
        <li>
           🔐 <Link href="/lab/encryption/tls-dh">DH 실습</Link>
        </li>
        <li>
          🧬 <Link href="/lab/encryption/tls-ecdhe">ECDHE 실습</Link>
        </li>
        <li>
          🤝{' '}
          <Link href="/lab/encryption/tls-handshake">TLS Handshake 보기</Link>
        </li>
        <li>
          🛂 <Link href="/lab/encryption/tls-mtls">mTLS 실습</Link>
        </li>
      </ul>
    </div>
  );
}
