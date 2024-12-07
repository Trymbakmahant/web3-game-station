"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import BackButton from "@/components/ui/backbutton";
import { PlusCircle, Trophy, Calendar, Lock, Unlock } from "lucide-react";
import { Input } from "@/components/ui/input";
import { useWriteContract, useWaitForTransactionReceipt } from "wagmi";
import { abi } from "@/app/contract/abi";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { useAppKitAccount } from "@reown/appkit/react";

import { toast } from "react-toastify";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

const CreateGameSessionForm: React.FC = () => {
  const { data: hash, error, writeContract } = useWriteContract();
  const { isLoading: isConfirming, isSuccess: isConfirmed } =
    useWaitForTransactionReceipt({
      hash,
    });

  const [isCreated, setIsCreated] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    startTime: "",
    duration: 30,
    isPrivate: false,
    maxPlayers: 10,
    rewardValue: 0,
    gameId: "snake",
  });
  const { isConnected, address } = useAppKitAccount();
  async function HandleCreate() {
    if (!address && address == "undefined") {
      toast.warning("Please connect your wallet", {
        position: "top-left",
      });
      return;
    }
    const _sessionStart = formData.startTime;
    const sessionStart = Math.floor(new Date(_sessionStart).getTime() / 1000);
    const endTimeUnix = sessionStart + formData.duration;
    const score = formData.rewardValue;
    if (isNaN(score)) {
      alert("Please enter a valid score.");
      return;
    }

    writeContract({
      address: "0xcdd75Dc5ab8B436178FC5Af2d7477bFCb4915404", // Replace with your contract address
      abi,
      functionName: "createGameSession",
      args: [address, sessionStart, endTimeUnix, BigInt(score)],
    });

    const Payload = {
      orgId: address,
      title: formData.title,
      description: formData.description,
      startTime: sessionStart,
      endTime: endTimeUnix,
      gameId: formData.gameId,
      isPrivate: formData.isPrivate,
      reward: formData.rewardValue,
    };
    const res = await axios.post("/api/create", Payload);
    console.log(res.status);
  }
  const notify = () => {
    toast.success("Your transaction is confirmed", {
      position: "top-left",
    });
  };

  useEffect(() => {
    if (isConfirmed) {
      notify();
      setIsCreated(true);
    }
  }, [isConfirmed]);
  const router = useRouter();
  if (!isConnected) {
    return (
      <div className="flex justify-center  w-screen h-screen items-center">
        Please Connect wallet !
      </div>
    );
  }

  if (isCreated) {
    if (formData.isPrivate) {
      console.log("private");
      return (
        <div className="flex justify-center items-center bg-white text-black z-10">
          {" "}
          here i put invitaion code
        </div>
      );
    } else {
      console.log("public");
      router.push("/publicroom");
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Implement session creation logic
    console.log("Session Created:", formData);
  };
  return (
    <div className="flex justify-center items-center w-screen h-screen bg-[#FFF7E6]">
      <div className="fixed top-4  left-7">
        <BackButton />
      </div>
      <div className="max-w-xl mx-auto p-6 bg-[#FFFAF0] shadow-lg rounded-lg border-2 border-[#E6D2B5]">
        <h2 className="text-2xl font-bold mb-6 flex items-center text-[#8B4513]">
          <PlusCircle className="mr-2 text-[#CD853F]" />
          Create Game Session
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-[#5D4037]">
              Session Title
            </label>
            <Input
              type="text"
              value={formData.title}
              onChange={(e) =>
                setFormData({ ...formData, title: e.target.value })
              }
              className="mt-1 block w-full rounded-md border-[#D2B48C] bg-[#FFF5E1] shadow-sm focus:border-[#CD853F] focus:ring focus:ring-[#E6D2B5]"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-[#5D4037]">
              Description
            </label>
            <Textarea
              value={formData.description}
              onChange={(e) =>
                setFormData({ ...formData, description: e.target.value })
              }
              className="mt-1 block w-full rounded-md border-[#D2B48C] bg-[#FFF5E1] shadow-sm focus:border-[#CD853F] focus:ring focus:ring-[#E6D2B5]"
              rows={3}
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-[#5D4037]">
                <Calendar className="inline mr-2 w-4 h-4 text-[#CD853F]" />
                Start Time
              </label>
              <Input
                type="datetime-local"
                value={formData.startTime}
                onChange={(e) =>
                  setFormData({ ...formData, startTime: e.target.value })
                }
                className="mt-1 block w-full rounded-md border-[#D2B48C] bg-[#FFF5E1] shadow-sm focus:border-[#CD853F] focus:ring focus:ring-[#E6D2B5]"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-[#5D4037]">
                Duration (Minutes)
              </label>
              <Input
                type="number"
                value={formData.duration}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    duration: parseInt(e.target.value),
                  })
                }
                className="mt-1 block w-full rounded-md border-[#D2B48C] bg-[#FFF5E1] shadow-sm focus:border-[#CD853F] focus:ring focus:ring-[#E6D2B5]"
                min={10}
                max={120}
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-[#5D4037]">
                {formData.isPrivate ? (
                  <Lock className="inline mr-2 w-4 h-4 text-[#8B4513]" />
                ) : (
                  <Unlock className="inline mr-2 w-4 h-4 text-[#228B22]" />
                )}
                Session Type
              </label>
              <Select
                value={formData.isPrivate ? "private" : "public"}
                onValueChange={(value) => {
                  setFormData({
                    ...formData,
                    isPrivate: value === "private",
                  });
                }}
              >
                <SelectTrigger className="w-[180px] bg-[#FFF5E1] border-[#D2B48C]">
                  <SelectValue placeholder="Select Your Session type" />
                </SelectTrigger>
                <SelectContent className="bg-[#FFFAF0] border-[#D2B48C]">
                  <SelectGroup>
                    <SelectLabel>Session Types</SelectLabel>
                    <SelectItem value="public">Public</SelectItem>
                    <SelectItem value="private">Private</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
            <div>
              <label className="block text-sm font-medium text-[#5D4037]">
                <Trophy className="inline mr-2 w-4 h-4 text-[#CD853F]" />
                Reward
              </label>
              <div className="">
                <Input
                  type="number"
                  value={formData.rewardValue}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      rewardValue: parseInt(e.target.value),
                    })
                  }
                  placeholder="Reward Amount"
                  className="mt-1 block w-full rounded-md border-[#D2B48C] bg-[#FFF5E1] shadow-sm focus:border-[#CD853F] focus:ring focus:ring-[#E6D2B5]"
                  min={0}
                />
              </div>
            </div>
          </div>
          <Select
            value={formData.gameId == "snake" ? "snake" : "flappybird"}
            onValueChange={(value) => {
              setFormData({
                ...formData,
                gameId: value,
              });
            }}
          >
            <SelectTrigger className="w-full  text-black border-[#D2B48C]">
              <SelectValue placeholder="Select Your Gaming type" />
            </SelectTrigger>
            <SelectContent className="bg-[#FFFAF0] border-[#D2B48C]">
              <SelectGroup>
                <SelectLabel>Session Game</SelectLabel>
                <SelectItem value="snake">Snake 🐍</SelectItem>
                <SelectItem value="flappybird">Flappy Bird 🐥</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
          <Button
            onClick={() => {
              HandleCreate();
            }}
            className="w-full bg-[#8B4513] text-[#FFF7E6] py- rounded-md hover:bg-[#5D4037] transition-colors"
          >
            Create Session
            {isConfirming && "Processing"}
          </Button>
          {error && <div className="text-red-400"> {error.message} </div>}
        </form>
      </div>
    </div>
  );
};

export default CreateGameSessionForm;
