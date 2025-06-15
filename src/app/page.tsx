'use client';

import Link from 'next/link';

export default function HomePage() {
  const features = [
    {
      emoji: '📖',
      title: 'VPN & TLS 이론 설명',
      href: '/about',
      description: 'VPN과 TLS의 기본 개념과 작동 원리를 학습하세요.',
    },
    {
      emoji: '🧪',
      title: 'TLS Handshake 시뮬레이션',
      href: '/lab/tls-handshake',
      description: 'TLS 연결 과정(Hello → Key Exchange)을 시각적으로 체험해보세요.',
    },
    {
      emoji: '🔐',
      title: '암호화 실습',
      href: '/lab/encryption',
      description: 'AES/RSA 암호화를 직접 실습하고 결과를 확인하세요.',
    },
    {
      emoji: '👥',
      title: '팀원 소개',
      href: '/team',
      description: '프로젝트를 함께한 팀원들의 역할을 확인하세요.',
    },
  ];

  return (
    <div className="min-h-screen bg-[#0e0f1a] text-white px-6 py-14">
      <div className="max-w-4xl mx-auto text-center mb-12">
        <h2 className="text-3xl font-bold mb-4">📘 TLS 기반 VPN 실습 웹사이트</h2>
        <p className="text-base text-gray-300">
          이 사이트는 TLS 암호화와 VPN 구조를 시각적으로 학습할 수 있도록 만든 교육용 플랫폼입니다.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 max-w-5xl mx-auto">
        {features.map((item, idx) => (
          <div
            key={idx}
            className="bg-[#1a1b2e] p-6 rounded-2xl shadow-md hover:shadow-lg hover:scale-[1.02] transition flex flex-col justify-between"
          >
            <div>
              <h3 className="text-xl font-semibold mb-2">
                {item.emoji} {item.title}
              </h3>
              <p className="text-sm text-gray-400 mb-4">{item.description}</p>
            </div>
            <Link
              href={item.href}
              className="mt-auto inline-block text-sm font-medium text-blue-400 hover:underline"
            >
              바로가기 →
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}
