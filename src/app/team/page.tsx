// src/app/team/page.tsx
export default function TeamPage() {
  const teamMembers = [
    { name: '권도윤', id: '92113451' },
    { name: '백이랑', id: '92113633' },
    { name: '임어진', id: '92105791' },
    { name: '유선빈', id: '92113724' },
    { name: '박성준', id: '91913440' }, 
  ];

  return (
    <div className="min-h-screen bg-gray-900 text-white px-6 py-10">
      <h1 className="text-3xl font-bold mb-8 text-center">🧑‍💻 팀원 소개</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
        {teamMembers.map((member, index) => (
          <div
            key={index}
            className="bg-gray-800 rounded-2xl p-6 shadow-md hover:shadow-xl transition"
          >
            <h2 className="text-xl font-semibold">{member.name}</h2>
            <p className="text-sm text-gray-400 mt-1">학번: {member.id}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
