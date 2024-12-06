"use client";

import { CircleArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";

import React from "react";

const BackButton = () => {
  const router = useRouter();
  return (
    <CircleArrowLeft
      size={40}
      onClick={() => {
        router.push("/");
      }}
    />
  );
};

export default BackButton;
