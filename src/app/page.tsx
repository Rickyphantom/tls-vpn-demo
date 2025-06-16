'use client';

import { Card, Typography, Button, Row, Col } from 'antd';
import Link from 'next/link';

const { Title, Paragraph, Text } = Typography;

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
    description:
      'TLS 연결 과정(Hello → Key Exchange)을 시각적으로 체험해보세요.',
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

export default function HomePage() {
  return (
    <div
      style={{
        minHeight: '100vh',
        backgroundColor: '#f5f7fa',
        padding: '64px 24px',
      }}
    >
      <div
        style={{
          maxWidth: 800,
          margin: '0 auto',
          textAlign: 'center',
          color: '#1d1d1f',
        }}
      >
        <Title level={2} style={{ color: '#1d1d1f' }}>
          📘 TLS 기반 VPN 실습 웹사이트
        </Title>
        <Paragraph style={{ color: '#555' }}>
          TLS 암호화와 VPN 구조를 시각적으로 학습할 수 있도록 만든 교육용
          플랫폼입니다.
        </Paragraph>
      </div>

      <Row
        gutter={[24, 24]}
        justify="center"
        style={{ maxWidth: 1000, margin: '48px auto 0' }}
      >
        {features.map((item, idx) => (
          <Col key={idx} xs={24} sm={12} md={12} lg={12}>
            <Card
              hoverable
              style={{
                backgroundColor: '#ffffff',
                color: '#1d1d1f',
                borderRadius: 12,
                height: '100%',
              }}
              bodyStyle={{ padding: 24 }}
            >
              <Title level={4} style={{ color: '#1d1d1f', marginBottom: 12 }}>
                {item.emoji} {item.title}
              </Title>
              <Text
                style={{ color: '#666', display: 'block', marginBottom: 20 }}
              >
                {item.description}
              </Text>
              <Link href={item.href} passHref>
                <Button type="primary">바로가기 →</Button>
              </Link>
            </Card>
          </Col>
        ))}
      </Row>
    </div>
  );
}
