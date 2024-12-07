"use client";
import React, { useState } from "react";
import { Trophy, Calendar, Globe, Key } from "lucide-react";
import { useActivePublicSessions } from "@/utils/AxiosApisCall";

import {
  getTimeDifferenceFromUnix,
  isCurrentTimeOutsideRange,
} from "@/utils/UnixTime";
import { Button } from "../ui/button";
import HamsterWheel from "../Loader/hamsterLoading";
import { useRouter } from "next/navigation";

const PublicSessionsPage: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [invitationCode, setInvitationCode] = useState("");
  const [codeError, setCodeError] = useState("");
  const router = useRouter();
  const { sessions, loading, error } = useActivePublicSessions();

  const handleInvitationCodeSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Basic validation
    if (invitationCode.trim().length === 0) {
      setCodeError("Please enter an invitation code");
      return;
    }

    // Mock validation logic
    if (invitationCode.toUpperCase() === "SNAKE2024") {
      // Successful code entry
      alert("Invitation code accepted!");
      setCodeError("");
    } else {
      setCodeError("Invalid invitation code");
    }
  };
  if (loading) {
    return (
      <div className="h-screen w-screen flex justify-center items-center bg-[#F3E5AB]">
        <HamsterWheel />
      </div>
    );
  }
  if (error) {
  }
  return (
    <div
      className="min-h-screen bg-[#F3E5AB] font-['Courier_New'] text-[#4A4238] p-8"
      style={{
        backgroundImage:
          "linear-gradient(to bottom right, rgba(255,255,255,0.2), rgba(0,0,0,0.05))",
        boxShadow: "inset 0 0 200px rgba(0,0,0,0.05)",
      }}
    >
      <div className="container mx-auto space-y-8">
        {/* Invitation Code Section */}
        <div
          className="bg-[#FFFBF0] shadow-md border-4 border-[#4A4238] rounded-none p-6 
          relative overflow-hidden transform transition-all hover:scale-[1.02]"
        >
          {/* Corner decorative elements */}
          <div className="absolute top-0 left-0 w-4 h-4 border-l-4 border-t-4 border-[#4A4238]"></div>
          <div className="absolute top-0 right-0 w-4 h-4 border-r-4 border-t-4 border-[#4A4238]"></div>
          <div className="absolute bottom-0 left-0 w-4 h-4 border-l-4 border-b-4 border-[#4A4238]"></div>
          <div className="absolute bottom-0 right-0 w-4 h-4 border-r-4 border-b-4 border-[#4A4238]"></div>

          <h1 className="text-3xl font-bold mb-4 flex items-center uppercase tracking-wide">
            <Key className="mr-3 text-[#4A4238] opacity-70" />
            Private Invitation
          </h1>

          <form onSubmit={handleInvitationCodeSubmit} className="space-y-4">
            <div className="flex items-center space-x-4">
              <input
                type="text"
                placeholder="Enter invitation code"
                value={invitationCode}
                onChange={(e) => {
                  setInvitationCode(e.target.value);
                  setCodeError("");
                }}
                className="flex-grow px-4 py-2 border-2 border-[#4A4238] rounded-none 
                bg-white uppercase tracking-wider font-bold text-center
                focus:outline-none focus:ring-2 focus:ring-[#4A4238]"
              />
              <button
                type="submit"
                className="px-6 py-2 border-2 border-[#4A4238] 
                bg-[#4A4238] text-[#FFFBF0] 
                uppercase tracking-wider font-bold
                hover:bg-transparent hover:text-[#4A4238]
                transition-all"
              >
                Unlock
              </button>
            </div>

            {codeError && (
              <p className="text-red-600 text-center italic">{codeError}</p>
            )}

            <p className="text-center text-sm italic opacity-70">
              Got a special invite? Enter the code to access exclusive sessions.
            </p>
          </form>
        </div>

        {/* Public Sessions Section */}
        <div className="mb-8 bg-[#FFFBF0] shadow-md border-4 border-[#4A4238] rounded-none p-6">
          <h1 className="text-3xl font-bold mb-4 flex items-center uppercase tracking-wide">
            <Globe className="mr-3 text-[#4A4238] opacity-70" />
            Public Game Sessions
          </h1>
          <input
            type="text"
            placeholder="Search sessions..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full px-4 py-2 border-2 border-[#4A4238] rounded-none bg-white focus:outline-none"
          />
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {sessions.map((session) => (
            <div
              key={session._id}
              className="bg-[#FFFBF0] rounded-none border-4 border-[#4A4238] p-6 
              transition-all duration-300 hover:shadow-lg relative overflow-hidden"
            >
              <div className="absolute inset-0 border-2 border-[#4A4238] pointer-events-none"></div>
              <h2 className="text-xl font-bold mb-2 uppercase tracking-wide">
                {session.title}
              </h2>
              <p className="text-[#4A4238] mb-4 opacity-70 italic">
                description : {session.description}
              </p>
              <p className="text-[#4A4238] mb-4 opacity-70 italic">
                org-address : {session.orgId}
              </p>
              <div className="space-y-2 text-sm text-[#4A4238]">
                <div className="flex items-center">
                  <Calendar className="mr-2 w-4 h-4 opacity-70" />
                  starts :{getTimeDifferenceFromUnix(session.startTime)}
                </div>
                <div className="flex items-center">
                  <Calendar className="mr-2 w-4 h-4 opacity-70" />
                  end :{getTimeDifferenceFromUnix(session.endTime)}
                </div>

                <div className="flex items-center">
                  <Trophy className="mr-2 w-4 h-4 opacity-70" />
                  reward : {session.reward}
                </div>
              </div>
              disabled=
              {!isCurrentTimeOutsideRange(session.startTime, session.endTime)}
              <Button
                onClick={() => {
                  router.push(`/snake/${session._id}`);
                }}
                className="mt-4 w-full border-2 border-[#4A4238] py-2 
                uppercase tracking-wider font-bold 
                bg-[#4A4238] text-[#FFFBF0] 
                hover:bg-transparent hover:text-[#4A4238] 
                transition-all"
              >
                Join Session
              </Button>
            </div>
          ))}
        </div>
      </div>

      {/* Vintage Paper Texture Overlay */}
      <div
        className="fixed inset-0 pointer-events-none z-10"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='100' height='100' viewBox='0 0 100 100'%3E%3Cg fill-rule='evenodd'%3E%3Cg fill='%234A4238' fill-opacity='0.05'%3E%3Cpath opacity='.5' d='M96 95h4v1h-4v4h-1v-4h-9v4h-1v-4h-9v4h-1v-4h-9v4h-1v-4h-9v4h-1v-4h-9v4h-1v-4h-9v4h-1v-4h-9v4h-1v-4h-9v4h-1v-4H0v-1h15v-9H0v-1h15v-9H0v-1h15v-9H0v-1h15v-9H0v-1h15v-9H0v-1h15v-9H0v-1h15v-9H0v-1h15v-9H0v-1h15V0h1v15h9V0h1v15h9V0h1v15h9V0h1v15h9V0h1v15h9V0h1v15h9V0h1v15h9V0h1v15h9V0h1v15h4v1h-4v9h4v1h-4v9h4v1h-4v9h4v1h-4v9h4v1h-4v9h4v1h-4v9h4v1h-4v9h4v1h-4v9zm-1 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-9-10h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm9-10v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-9-10h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm9-10v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-9-10h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm9-10v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-9-10h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm9-10v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9z'/%3E%3Cpath d='M6 5V0H5v5H0v1h5v94h1V6h94V5H6z'/%3E%3C/g%3E%3C/svg%3E\")",
          mixBlendMode: "overlay",
        }}
      ></div>
    </div>
  );
};

export default PublicSessionsPage;
