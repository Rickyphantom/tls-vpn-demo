'use client';

import { Card, Row, Col, Typography } from 'antd';
import Link from 'next/link';

const { Title } = Typography;

const menuItems = [
  { label: 'RSA 실습', href: '/lab/encryption/tls-rsa', icon: '🔐' },
  { label: 'DH 실습', href: '/lab/encryption/tls-dh', icon: '🔐' },
  { label: 'ECDHE 실습', href: '/lab/encryption/tls-ecdhe', icon: '🧬' },
  { label: 'mTLS 실습', href: '/lab/encryption/tls-mtls', icon: '🛂' },
];

export default function EncryptionMenuPage() {
  return (
    <div style={{ minHeight: '100vh', background: '#f0f2f5', padding: '20px' }}>
      <div style={{ maxWidth: 960, margin: '0 auto' }}>
        <Title level={3} style={{ color: '#1d1d1f', marginBottom: 20 }}>
          🔐 암호화 실습 메뉴
        </Title>

        <Row gutter={[16, 16]}>
          {menuItems.map((item, index) => (
            <Col xs={12} sm={8} md={6} key={index}>
              <Link href={item.href}>
                <Card
                  hoverable
                  style={{ borderRadius: 10 }}
                  bodyStyle={{ padding: 14 }}
                >
                  <div
                    style={{
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      gap: 8,
                    }}
                  >
                    <span style={{ fontSize: 22 }}>{item.icon}</span>
                    <span
                      style={{
                        fontSize: 14,
                        fontWeight: 500,
                        textAlign: 'center',
                        color: '#333',
                      }}
                    >
                      {item.label}
                    </span>
                  </div>
                </Card>
              </Link>
            </Col>
          ))}

          {/* 추후 추가 예정 항목 */}
          <Col xs={12} sm={8} md={6}>
            <Card
              style={{
                borderRadius: 10,
                backgroundColor: '#f5f5f5',
                cursor: 'not-allowed',
              }}
              bodyStyle={{ padding: 14 }}
              bordered={false}
            >
              <div
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  gap: 8,
                  opacity: 0.5,
                }}
              >
                <span style={{ fontSize: 22 }}>⏳</span>
                <span
                  style={{ fontSize: 14, fontWeight: 500, textAlign: 'center' }}
                >
                  추후 추가 예정
                </span>
              </div>
            </Card>
          </Col>
        </Row>
      </div>
    </div>
  );
}
