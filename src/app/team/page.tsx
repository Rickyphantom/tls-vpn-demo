'use client';

import { Card, Typography, Avatar, Row, Col } from 'antd';

const { Title, Text, Paragraph } = Typography;

interface TeamMember {
  name: string;
  id: string;
  role: string;
  task: string;
  img: string;
}

export default function TeamPage() {
  const leader: TeamMember = {
    name: '유선빈',
    id: '92113724',
    role: '팀장',
    task: '프로젝트 틀 및 사이트 디자인',
    img: 'man.png',
  };

  const members: TeamMember[] = [
    {
      name: '권도윤',
      id: '92113451',
      role: '조원',
      task: 'TLS-RSA 페이지 담당',
      img: 'man.png',
    },
    {
      name: '박성준',
      id: '91913440',
      role: '조원',
      task: 'TLS-handshake 페이지 담당',
      img: 'man.png',
    },
    {
      name: '백이랑',
      id: '92113633',
      role: '조원',
      task: 'TLS-DH 페이지 담당',
      img: 'man.png',
    },
    {
      name: '임어진',
      id: '92105791',
      role: '조원',
      task: 'TLS-ECDHE & TLS-mTLS 페이지 / PPT 제작',
      img: 'man.png',
    },
  ];

  return (
    <div
      style={{
        backgroundColor: '#f5f7fa',
        minHeight: '100vh',
        padding: '64px 24px',
      }}
    >
      <Title
        level={2}
        style={{ textAlign: 'center', color: '#1d1d1f', marginBottom: 40 }}
      >
        팀원 소개
      </Title>

      {/* 팀장 */}
      <Row justify="center" style={{ marginBottom: 64 }}>
        <Col>
          <ProfileCard member={leader} isLeader />
        </Col>
      </Row>

      {/* 조원 */}
      <Row gutter={[24, 24]} justify="center">
        {members.map((member, idx) => (
          <Col xs={24} sm={12} md={8} lg={6} key={idx}>
            <ProfileCard member={member} />
          </Col>
        ))}
      </Row>
    </div>
  );
}

function ProfileCard({
  member,
  isLeader = false,
}: {
  member: TeamMember;
  isLeader?: boolean;
}) {
  return (
    <Card
      hoverable
      style={{
        backgroundColor: '#ffffff',
        color: '#1d1d1f',
        borderRadius: 16,
        textAlign: 'center',
        boxShadow: '0 4px 12px rgba(0,0,0,0.08)',
        transform: isLeader ? 'scale(1.05)' : 'none',
      }}
      bodyStyle={{ padding: 24 }}
    >
      <Avatar
        size={96}
        src={`/team/${member.img}`}
        style={{ marginBottom: 16, border: '2px solid #ccc' }}
      />
      <Title level={4} style={{ color: '#1d1d1f', margin: 0 }}>
        {member.name}
      </Title>
      <Text style={{ display: 'block', color: '#888', marginBottom: 4 }}>
        {member.id}
      </Text>
      <Text strong style={{ color: '#6633cc' }}>
        {member.role}
      </Text>
      <Paragraph style={{ color: '#555', marginTop: 12, fontSize: 13 }}>
        {member.task}
      </Paragraph>
    </Card>
  );
}
