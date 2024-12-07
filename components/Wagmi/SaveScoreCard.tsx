"use client";
import * as React from "react";
import {
  useWriteContract,
  useWaitForTransactionReceipt,
  type BaseError,
} from "wagmi";
import { abi } from "@/app/contract/abi"; // Replace with your actual ABI

export function AddGame() {
  const { data: hash, error, isPending, writeContract } = useWriteContract();

  async function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);

    const orgName = formData.get("orgName") as string;
    const gameName = formData.get("gameName") as string;
    const score = parseInt(formData.get("score") as string, 10);

    if (isNaN(score)) {
      alert("Please enter a valid score.");
      return;
    }

    writeContract({
      address: "0xcdd75Dc5ab8B436178FC5Af2d7477bFCb4915404", // Replace with your contract address
      abi,
      functionName: "addGame",
      args: [orgName, gameName, BigInt(score)],
    });
  }

  const { isLoading: isConfirming, isSuccess: isConfirmed } =
    useWaitForTransactionReceipt({
      hash,
    });

  return (
    <form onSubmit={submit} className="space-y-4">
      <div>
        <label htmlFor="orgName" className="block text-sm font-medium">
          Organization Name
        </label>
        <input
          id="orgName"
          name="orgName"
          placeholder="Enter organization name"
          required
          className="block w-full border rounded p-2"
        />
      </div>
      <div>
        <label htmlFor="gameName" className="block text-sm font-medium">
          Game Name
        </label>
        <input
          id="gameName"
          name="gameName"
          placeholder="Enter game name"
          required
          className="block w-full border rounded p-2"
        />
      </div>
      <div>
        <label htmlFor="score" className="block text-sm font-medium">
          Score
        </label>
        <input
          id="score"
          name="score"
          type="number"
          placeholder="Enter score"
          required
          className="block w-full border rounded p-2"
        />
      </div>
      <button
        disabled={isPending}
        type="submit"
        className="px-4 py-2 bg-blue-500 text-white rounded"
      >
        {isPending ? "Submitting..." : "Add Game"}
      </button>
      {hash && <div>Transaction Hash: {hash}</div>}
      {isConfirming && <div>Waiting for confirmation...</div>}
      {isConfirmed && <div>Game added successfully!</div>}
      {error && (
        <div className="text-red-500">
          Error: {(error as BaseError).shortMessage || error.message}
        </div>
      )}
    </form>
  );
}
