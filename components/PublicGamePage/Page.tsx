"use client";
import React, { useState } from "react";
import { Trophy, Calendar, Users, Globe } from "lucide-react";

// Mock data - in real app, this would come from backend
const mockSessions = [
  {
    id: "1",
    title: "Weekend Snake Challenge",
    org: "Tech Gamers League",
    startTime: new Date("2024-03-15T18:00:00"),
    duration: 30,
    maxPlayers: 50,
    reward: { type: "points", value: 500 },
  },
  {
    id: "2",
    title: "Startup Snake Showdown",
    org: "Innovators Hub",
    startTime: new Date("2024-03-20T20:00:00"),
    duration: 45,
    maxPlayers: 30,
    reward: { type: "prize", value: 1000 },
  },
];

const PublicSessionsPage: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredSessions = mockSessions.filter(
    (session) =>
      session.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      session.org.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8 bg-white shadow-md rounded-lg p-6">
        <h1 className="text-3xl font-bold mb-4 flex items-center">
          <Globe className="mr-3 text-blue-600" />
          Public Game Sessions
        </h1>
        <input
          type="text"
          placeholder="Search sessions..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredSessions.map((session) => (
          <div
            key={session.id}
            className="bg-white rounded-lg shadow-md p-6 hover:shadow-xl transition-shadow"
          >
            <h2 className="text-xl font-bold mb-2">{session.title}</h2>
            <p className="text-gray-600 mb-4">{session.org}</p>

            <div className="space-y-2 text-sm text-gray-700">
              <div className="flex items-center">
                <Calendar className="mr-2 w-4 h-4 text-blue-500" />
                {session.startTime.toLocaleString()}
              </div>
              <div className="flex items-center">
                <Users className="mr-2 w-4 h-4 text-green-500" />
                Max Players: {session.maxPlayers}
              </div>
              <div className="flex items-center">
                <Trophy className="mr-2 w-4 h-4 text-yellow-500" />
                {session.reward.type === "points"
                  ? `${session.reward.value} Points`
                  : `$${session.reward.value} Prize`}
              </div>
            </div>

            <button className="mt-4 w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700">
              Join Session
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PublicSessionsPage;
