'use client';

import Link from 'next/link';

export default function AboutPage() {
  return (
    <div style={{ padding: '2rem', lineHeight: '2' }}>
      <h2>📘 TLS 방식별 구조 및 실습 소개</h2>
      <p className="px-4 py-2">
        아래 버튼을 클릭하면 각각의 TLS 방식 구조를 시뮬레이션하고 이해할 수
        있습니다.
      </p>

      <hr style={{ margin: '1rem 0' }} />

      <div>
        <Link href="/lab/tls-rsa">
          <div className="text-lg font-semibold hover:underline px-4 py-2 block cursor-pointer">
            TLS with RSA 🔐
          </div>
        </Link>
        <p className="px-4 py-2">
          클라이언트가 서버의 RSA 공개키로 pre-master secret을 암호화하는 방식.
        </p>
      </div>

      <div>
        <Link href="/lab/tls-dh">
          <div className="text-lg font-semibold hover:underline px-4 py-2 block cursor-pointer">
            TLS with Diffie-Hellman 🔁
          </div>
        </Link>
        <p className="px-4 py-2">
          고정 DH 키를 이용해 클라이언트와 서버가 같은 대칭키를 생성하는 방식.
        </p>
      </div>

      <div>
        <Link href="/lab/tls-ecdhe">
          <div className="text-lg font-semibold hover:underline px-4 py-2 block cursor-pointer">
            TLS with ECDHE ⚡
          </div>
        </Link>
        <p className="px-4 py-2">
          Ephemeral ECDH 키로 Perfect Forward Secrecy를 제공하는 보안 강화 방식.
        </p>
      </div>

      <div>
        <Link href="/lab/tls-mtls">
          <div className="text-lg font-semibold hover:underline px-4 py-2 block cursor-pointer">
            Mutual TLS (mTLS) 🔐🔐
          </div>
        </Link>
        <p className="px-4 py-2">
          서버뿐 아니라 클라이언트도 인증서를 제출하여 양방향 인증을 수행하는
          방식.
        </p>
      </div>
    </div>
  );
}
