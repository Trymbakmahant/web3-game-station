export interface User {
  id: string;
  username: string;
  email: string;
  profileImage?: string;
}

export interface GameSession {
  id: string;
  orgId: string;
  title: string;
  description: string;
  startTime: Date;
  endTime: Date;

  isPrivate: boolean;
  reward?: {
    type: "points" | "prize";
    value: number;
    description: string;
  };
  players: {
    userId: string;
    highScore: number;
  }[];
}

export interface Organization {
  id: string;
  name: string;
  description: string;
  logo?: string;
  ownerId: string;
}
