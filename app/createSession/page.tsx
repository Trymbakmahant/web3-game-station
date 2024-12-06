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
    <div className="flex justify-center items-center w-screen h-screen">
      <div className="fixed top-7 left-7">
        <BackButton />
      </div>
      <div className="max-w-xl mx-auto p-6 bg-white shadow-lg rounded-lg">
        <h2 className="text-2xl font-bold mb-6 flex items-center">
          <PlusCircle className="mr-2 text-blue-600" />
          Create Game Session
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Session Title
            </label>
            <Input
              type="text"
              value={formData.title}
              onChange={(e) =>
                setFormData({ ...formData, title: e.target.value })
              }
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Description
            </label>
            <Textarea
              value={formData.description}
              onChange={(e) =>
                setFormData({ ...formData, description: e.target.value })
              }
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200"
              rows={3}
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                <Calendar className="inline mr-2 w-4 h-4" />
                Start Time
              </label>
              <Input
                type="datetime-local"
                value={formData.startTime}
                onChange={(e) =>
                  setFormData({ ...formData, startTime: e.target.value })
                }
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
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
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200"
                min={10}
                max={120}
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Max Players
              </label>
              <Input
                type="number"
                value={formData.maxPlayers}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    maxPlayers: parseInt(e.target.value),
                  })
                }
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200"
                min={2}
                max={100}
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                {formData.isPrivate ? (
                  <Lock className="inline mr-2 w-4 h-4 text-red-500" />
                ) : (
                  <Unlock className="inline mr-2 w-4 h-4 text-green-500" />
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
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Selecte Your Session type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>Session Types</SelectLabel>
                    <SelectItem value="public">Public</SelectItem>
                    <SelectItem value="private">Private</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              <Trophy className="inline mr-2 w-4 h-4" />
              Reward
            </label>
            <div className="grid grid-cols-2 gap-4">
              <Select
                value={formData.rewardType}
                onValueChange={(value) =>
                  setFormData({
                    ...formData,
                    rewardType: value as "points" | "prize",
                  })
                }
              >
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Selecte Your Session type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>Prize Type</SelectLabel>
                    <SelectItem value="points">Points</SelectItem>
                    <SelectItem value="prize">Prize</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>

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
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200"
                min={0}
              />
            </div>
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition-colors"
          >
            Create Session
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreateGameSessionForm;
