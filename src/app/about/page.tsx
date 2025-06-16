'use client';

import { Card, Typography, Space } from 'antd';
import Link from 'next/link';

const { Title, Paragraph } = Typography;

const tlsItems = [
  {
    title: 'TLS with RSA 🔐',
    href: '/lab/tls-rsa',
    description:
      '클라이언트가 서버의 RSA 공개키로 pre-master secret을 암호화하는 방식.',
  },
  {
    title: 'TLS with Diffie-Hellman 🔁',
    href: '/lab/tls-dh',
    description:
      '고정 DH 키를 이용해 클라이언트와 서버가 같은 대칭키를 생성하는 방식.',
  },
  {
    title: 'TLS with ECDHE ⚡',
    href: '/lab/tls-ecdhe',
    description:
      'Ephemeral ECDH 키로 Perfect Forward Secrecy를 제공하는 보안 강화 방식.',
  },
  {
    title: 'Mutual TLS (mTLS) 🔐🔐',
    href: '/lab/tls-mtls',
    description:
      '서버뿐 아니라 클라이언트도 인증서를 제출하여 양방향 인증을 수행하는 방식.',
  },
];

export default function AboutPage() {
  return (
    <div
      style={{
        padding: '40px',
        backgroundColor: '#f0f2f5',
        minHeight: '100vh',
      }}
    >
      <Typography style={{ maxWidth: 800, margin: '0 auto' }}>
        <Title level={2}>📘 TLS 방식별 구조 및 실습 소개</Title>
        <Paragraph>
          아래 카드를 클릭하면 각각의 TLS 방식 구조를 시뮬레이션하고 이해할 수
          있습니다.
        </Paragraph>

        <Space direction="vertical" size="middle" style={{ width: '100%' }}>
          {tlsItems.map((item, idx) => (
            <Link href={item.href} key={idx}>
              <Card
                hoverable
                style={{ borderRadius: 12 }}
                bodyStyle={{ padding: '20px' }}
              >
                <Title level={4} style={{ marginBottom: 8 }}>
                  {item.title}
                </Title>
                <Paragraph style={{ marginBottom: 0 }}>
                  {item.description}
                </Paragraph>
              </Card>
            </Link>
          ))}

          {/* 추후 추가 예정 카드 */}
          <Card
            style={{
              borderRadius: 12,
              backgroundColor: '#fafafa',
              opacity: 0.6,
              cursor: 'not-allowed',
            }}
            bodyStyle={{ padding: '20px' }}
            bordered={false}
          >
            <Title level={4} style={{ marginBottom: 8 }}>
              ⏳ 추후 추가 예정
            </Title>
            <Paragraph style={{ marginBottom: 0 }}>
              새로운 TLS 시뮬레이션이 곧 추가될 예정입니다.
            </Paragraph>
          </Card>
        </Space>
      </Typography>
    </div>
  );
}
