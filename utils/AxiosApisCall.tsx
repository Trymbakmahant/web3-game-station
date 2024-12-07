/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState, useEffect } from "react";
import axios from "axios";

// Define the type for your session (adjust it as needed)
interface GameSession {
  _id: string;
  title: string;
  description: string;
  startTime: number;
  endTime: number;
  isPrivate: boolean;
  reward: number;
}

// interface UseActivePublicSessionsResult {
//   sessions: GameSession[];
//   loading: boolean;
//   error: string | null;
// }

export function useActivePublicSessions() {
  const [sessions, setSessions] = useState<GameSession[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // This function will fetch the sessions when the component is mounted
    const fetchSessions = async () => {
      try {
        setLoading(true); // Set loading state to true before the request
        setError(null); // Reset any previous error
        const currentTime = Math.floor(Date.now() / 1000);

        const response = await axios.get("/api/publicGame", {
          params: {
            currentTime,
            isPrivate: false, // Only fetch public sessions
          },
        });

        setSessions(response.data.sessions); // Set the sessions data to state
      } catch (error: any) {
        if (error.response) {
          console.error("Server Response:", error.response.data);
          setError("Server error: " + error.response.data.message); // Handle server error
        } else {
          console.error("Error Message:", error.message);
          setError("An error occurred: " + error.message); // Handle general errors
        }
      } finally {
        setLoading(false); // Set loading state to false once the request completes
      }
    };

    fetchSessions(); // Call the fetch function
  }, []); // The empty array ensures this runs once when the component mounts

  return { sessions, loading, error };
}
