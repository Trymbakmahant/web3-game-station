"use client";
import React, { useState } from "react";
import BackButton from "@/components/ui/backbutton";
import { PlusCircle, Trophy, Calendar, Lock, Unlock } from "lucide-react";
import { Input } from "@/components/ui/input";
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

const CreateGameSessionForm: React.FC = () => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    startTime: "",
    duration: 30,
    isPrivate: false,
    maxPlayers: 10,
    rewardType: "points",
    rewardValue: 0,
  });

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

          <button
            type="submit"
            className="w-full bg-[#8B4513] text-[#FFF7E6] py- rounded-md hover:bg-[#5D4037] transition-colors"
          >
            Create Session
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreateGameSessionForm;
