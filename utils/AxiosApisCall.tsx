/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState, useEffect } from "react";
import axios from "axios";

// Define the type for your session (adjust it as needed)
interface GameSession {
  _id: string;
  orgId: string;
  title: string;
  description: string;
  startTime: number;
  endTime: number;
  gameId: string;
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

        const response = await axios.get("/api/publicGame", {
          params: {
            isPrivate: false,
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
        setLoading(false);
      }
    };

    fetchSessions();
  }, []);

  return { sessions, loading, error };
}

export function useSnakeData(id: string) {
  // State management for data, loading, and error
  const [data, setData] = useState<any | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    // Reset states when ID changes
    setLoading(true);
    setError(null);

    // Async function to fetch data
    async function fetchData() {
      try {
        // Replace with your actual API endpoint
        const response = await axios.get(`/api/create`, {
          params: {
            id: id,
          },
        });
        setData(response.data);
        console.log(data);
        setLoading(false);
      } catch (err) {
        setError(
          err instanceof Error ? err : new Error("An unknown error occurred")
        );
        console.log(err);
        setLoading(false);
      }
    }

    // Only fetch if id is provided
    if (id) {
      fetchData();
    }
  }, [id]); // Dependency array ensures fetch happens when ID changes

  // Return an object with data, loading state, and error
  return { data, loading, error };
}
