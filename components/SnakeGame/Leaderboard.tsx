/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { useHighScores } from "@/utils/AxiosApisCall";

// import HamsterWheel from "../Loader/hamsterLoading";

import { Trophy, ArrowUpDown } from "lucide-react";
const Leaderboard = ({ id }: { id: string }) => {
  const { users } = useHighScores(id);

  // Truncate Ethereum address
  const truncateAddress = (address: string) => {
    return `${address.slice(0, 6)}...${address.slice(-4)}`;
  };

  // If no users, show a message
  if (!users || users.length === 0) {
    return (
      <div className="w-full max-w-md mx-auto bg-[#F5F0E1] shadow-lg rounded-lg p-4 text-center">
        No users to display
      </div>
    );
  }

  return (
    <div className="w-full max-w-md mx-auto bg-[#F5F0E1] shadow-lg rounded-lg overflow-hidden border border-[#D4C4A8]">
      <div className="bg-[#E3D5C0] p-4 flex items-center">
        <Trophy
          className="text-[#5C4B51] flex justify-between mr-3"
          size={24}
        />
        <h2 className="text-xl font-bold text-[#5C4B51]">Leaderboard</h2>
        <appkit-button className="text-black" />
      </div>

      <table className="w-full">
        <thead>
          <tr className="bg-[#EDE0D4] text-[#5C4B51]">
            <th className="p-3 text-left">Rank</th>
            <th className="p-3 text-left cursor-pointer hover:bg-[#E3D5C0] flex items-center">
              Address
              <ArrowUpDown className="ml-2 text-[#8B7D6B]" size={16} />
            </th>
            <th className="p-3 text-right cursor-pointer hover:bg-[#E3D5C0]">
              <div className="flex items-center justify-end">
                Score
                <ArrowUpDown className="ml-2 text-[#8B7D6B]" size={16} />
              </div>
            </th>
          </tr>
        </thead>
        <tbody>
          {users.map((user, index) => (
            <tr
              key={user._id || index}
              className={`
                ${index === 0 ? "bg-[#F0E6D2]" : "bg-[#F5F0E1]"}
                border-b last:border-b-0 hover:bg-[#E3D5C0] transition-colors
              `}
            >
              <td className="p-3 font-bold text-[#5C4B51]">{index + 1}</td>
              <td className="p-3 text-[#6B5B4C]">
                {truncateAddress(user.base)}
              </td>
              <td className="p-3 text-right font-semibold text-[#5C4B51]">
                {user.score.toLocaleString()}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Leaderboard;
