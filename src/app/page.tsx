// src/app/page.tsx
import Link from 'next/link';

export default function HomePage() {
  return (
    <div>
      <h2>📘 TLS 기반 VPN 실습 웹사이트에 오신 걸 환영합니다!</h2>
      <p>
        이 사이트는 VPN의 작동 원리와 TLS 암호화 과정을 쉽고 직관적으로 이해할
        수 있도록 설계되었습니다.
      </p>
      <ul style={{ marginTop: '2rem', lineHeight: '2' }}>
        <li>
          👉 <Link href="/about">VPN & TLS 이론 설명</Link>
        </li>
        <li>
          🧪 <Link href="/lab/tls-handshake">TLS Handshake 시뮬레이션</Link>
        </li>
        <li>
          🔐 <Link href="/lab/encryption">암호화 실습</Link>
        </li>
      </ul>
    </div>
  );
}
