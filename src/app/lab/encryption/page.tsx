'use client';
import Link from 'next/link';

const menuItems = [
  { label: 'RSA 실습', href: '/lab/encryption/tls-rsa', icon: '🔐' },
  { label: 'DH 실습', href: '/lab/encryption/tls-dh', icon: '🔐' },
  { label: 'ECDHE 실습', href: '/lab/encryption/tls-ecdhe', icon: '🧬' },
  { label: 'mTLS 실습', href: '/lab/encryption/tls-mtls', icon: '🛂' },
];

export default function EncryptionMenuPage() {
  return (
    <div className="min-h-screen bg-[#f5f7fa] p-8">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-2xl font-bold text-[#1d1d1f] mb-6">
          🔐 암호화 실습 메뉴
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {menuItems.map((item, index) => (
            <Link
              key={index}
              href={item.href}
              className="bg-white shadow-md rounded-xl p-5 hover:shadow-lg transition-all border border-[#e5e7eb]"
            >
              <div className="flex items-center space-x-3">
                <span className="text-2xl">{item.icon}</span>
                <span className="text-base font-medium text-[#333]">{item.label}</span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
