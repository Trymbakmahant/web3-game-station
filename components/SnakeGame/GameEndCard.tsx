"use client";
import { useAppKitAccount } from "@reown/appkit/react";
import React, { useEffect, useState } from "react";
import { Save, Play } from "lucide-react";
import { useRouter } from "next/navigation";
import { useWriteContract, useWaitForTransactionReceipt } from "wagmi";
import { abi } from "@/app/contract/abi";
import { toast } from "react-toastify";
interface IGameEnd {
  score: number;
  _gameId: number;
}

const SnakeGameEndCard = ({ score, _gameId }: IGameEnd) => {
  const [selectedOption, setSelectedOption] = useState("");
  const { address } = useAppKitAccount();
  const { data: hash, writeContract } = useWriteContract();
  const { isSuccess: isConfirmed } = useWaitForTransactionReceipt({
    hash,
  });
  const router = useRouter();
  const handleBlockchainSave = () => {
    setSelectedOption("blockchain");
    writeContract({
      address: "0xcdd75Dc5ab8B436178FC5Af2d7477bFCb4915404", // Replace with your contract address
      abi,
      functionName: "saveGameData",
      args: [_gameId, address, BigInt(score)],
    });
  };

  const handleContinue = () => {
    setSelectedOption("continue");
    router.push("/publicroom");
  };
  const notify = () => {
    toast.success("Your data has saved in blockchain", {
      position: "top-left",
    });
  };

  useEffect(() => {
    if (isConfirmed) {
      notify();
      router.push("/publicroom");
    }
  }, [isConfirmed]);
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-[hsl(48,75%,81%)] border-4 border-[#8B7355] rounded-xl shadow-2xl p-8 w-96 text-center">
        <h2 className="text-4xl font-bold text-[#5D4037] mb-6 font-['Press_Start_2P']">
          Game Over
        </h2>
        <div className="bg-white border-2 border-[#8B7355] rounded-lg p-4 mb-6">
          <p className="text-2xl font-['Press_Start_2P'] text-[#5D4037]">
            Score: {score}
          </p>
        </div>
        <div className="space-y-4">
          <button
            onClick={handleBlockchainSave}
            className={`w-full py-3 rounded-lg flex items-center justify-center space-x-2 
              ${
                selectedOption === "blockchain"
                  ? "bg-[#4CAF50] text-white"
                  : "bg-white border-2 border-[#8B7355] text-[#5D4037] hover:bg-[#E0E0E0]"
              }`}
          >
            <Save className="mr-2" />
            Save to Blockchain
          </button>
          <button
            onClick={handleContinue}
            className={`w-full py-3 rounded-lg flex items-center justify-center space-x-2 
              ${
                selectedOption === "continue"
                  ? "bg-[#2196F3] text-white"
                  : "bg-white border-2 border-[#8B7355] text-[#5D4037] hover:bg-[#E0E0E0]"
              }`}
          >
            <Play className="mr-2" />
            {"Don't"} Save & Continue
          </button>
        </div>
      </div>
    </div>
  );
};

export default SnakeGameEndCard;
