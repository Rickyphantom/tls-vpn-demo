// src/app/layout.tsx
import './globals.css';
import { ReactNode } from 'react';
import Link from 'next/link'; // ⬅️ Next.js 내부 링크용

export const metadata = {
  title: 'TLS 기반 VPN 학습 웹사이트',
  description:
    'VPN과 TLS 구조를 시각적으로 학습하고 실습할 수 있는 웹 플랫폼입니다.',
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="ko">
      <body style={{ fontFamily: 'sans-serif', margin: 0, padding: 0 }}>
        <header
          style={{
            backgroundColor: '#111',
            color: '#fff',
            padding: '1rem',
          }}
        >
          <Link
            href="/"
            style={{
              textDecoration: 'none',
              color: 'white',
              fontSize: '1.5rem',
              fontWeight: 'bold',
            }}
          >
            🔐 TLS VPN 학습 사이트
          </Link>
        </header>
        <main style={{ padding: '2rem' }}>{children}</main>
        <footer
          style={{
            backgroundColor: '#eee',
            textAlign: 'center',
            padding: '1rem',
          }}
        ></footer>
      </body>
    </html>
  );
}
