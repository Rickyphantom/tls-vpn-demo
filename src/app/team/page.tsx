'use client'

import Image from 'next/image';

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
    task: 'Github 프로젝트 생성 및 틀 제작',
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
      id: '00000000',
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
    <div className="min-h-screen bg-[#0e0f1a] text-white px-6 py-14 flex flex-col items-center">
      <h1 className="text-3xl font-bold text-center mb-12">팀원 소개</h1>

      {/* 팀장 */}
      <div className="flex flex-col items-center mb-10">
        <ProfileCard member={leader} />
        <div className="w-1 h-6 bg-white mt-2" />
      </div>

      {/* 조원 */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
        {members.map((member, index) => (
          <ProfileCard key={index} member={member} />
        ))}
      </div>
    </div>
  );
}

function ProfileCard({ member }: { member: TeamMember }) {
  return (
    <div className="bg-[#1a1b2e] rounded-2xl p-6 shadow-lg flex flex-col items-center text-center hover:scale-105 transition w-48">
      <div className="relative w-24 h-24 mb-4 rounded-full overflow-hidden">
        <Image
          src={`/team/${member.img || 'man.png'}`}
          alt={`${member.name}의 프로필`}
          fill
          className="object-cover rounded-full border border-gray-300"
        />
      </div>
      <h2 className="text-lg font-semibold">{member.name}</h2>
      <p className="text-sm text-gray-400">{member.id}</p>
      <p className="text-sm text-[#c7bfff] font-medium mt-2">{member.role}</p>
      <p className="text-xs text-gray-400 mt-1">{member.task}</p>
    </div>
  );
}
