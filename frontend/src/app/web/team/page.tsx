"use client";

import Image from "next/image";

const team = [
  {
    name: "Juweyriyo Dahir Abdirahman",
    role: "Semantic Search Lead",
    image: "/images/team/juu.jpg",
    bgColor: "bg-background text-foreground",
  },
  {
    name: "Abdirizak Ali Abdirahman",
    image: "/images/team/Abdirisaq.jpg",
    bgColor: "bg-background text-foreground",
  },
  {
    name: "Hafso Farax Ibar",
    image: "/images/team/hafso.jpg",
    bgColor: "bg-background text-foreground",
  },
  {
    name: "Abdirahman Hassan Mohamud",
    image: "/images/team/Abdirahman.jpg",
    bgColor: "bg-background text-foreground",
  },
];

export default function TeamPage() {
  return (
    <main className="min-h-screen px-4 py-16 md:px-20 lg:px-32 bg-background text-foreground transition-colors">
      {/* Header */}
      <div className="text-center mb-12">
        <span className="text-sm font-medium uppercase text-primary">Our Great Team</span>
        <h1 className="text-4xl md:text-5xl font-bold mt-2 mb-4">Supported by Real People</h1>
        <p className="text-lg max-w-2xl mx-auto">
          Meet the creative and technical minds who built this semantic search system to empower university students.
        </p>
      </div>

      {/* Team Members */}
      <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
        {team.map((member, index) => (
          <div
            key={index}
            className={`rounded-xl overflow-hidden shadow-md hover:shadow-lg transition ${member.bgColor} text-center`}
          >
            <div className="w-full h-60 relative">
              <Image
                src={member.image}
                alt={member.name}
                layout="fill"
                objectFit="cover"
                className="rounded-b-none"
              />
            </div>
            <div className="py-4 px-2 bg-background text-foreground">
              <h3 className="text-lg font-semibold">{member.name}</h3>
              <p className="text-sm text-muted-foreground">{member.role}</p>
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}
