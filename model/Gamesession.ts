import mongoose, { Schema, Model, Document } from "mongoose";

// Interface extending mongoose Document
export interface IGameSession extends Document {
  currentParticipantCount: number;
  orgId: string;
  title: string;
  description?: string;
  startTime: Date;
  endTime: Date;
  maxPlayers: number;
  isPrivate: boolean;
  reward: number;
  participants?: string[]; // Array of user IDs
  status?: "upcoming" | "ongoing" | "completed" | "cancelled";
  createdBy?: string; // User ID of session creator
  createdAt?: Date;
  updatedAt?: Date;
}

// Mongoose Schema
const GameSessionSchema: Schema = new Schema(
  {
    orgId: {
      type: String,
      required: true,
      trim: true,
    },
    title: {
      type: String,
      required: true,
      trim: true,
      maxlength: 100,
    },
    description: {
      type: String,
      trim: true,
      maxlength: 500,
    },
    startTime: {
      type: Date,
      required: true,
      validate: {
        validator: function (v: Date) {
          return v > new Date(); // Ensure start time is in the future
        },
        message: "Start time must be in the future",
      },
    },
    endTime: {
      type: Date,
      required: true,
      validate: {
        validator: function (this: IGameSession, v: Date) {
          return v > this.startTime; // Ensure end time is after start time
        },
        message: "End time must be after start time",
      },
    },
    maxPlayers: {
      type: Number,
      required: true,
      min: [1, "Must have at least 1 player"],
      max: [100, "Cannot exceed 100 players"],
    },
    isPrivate: {
      type: Boolean,
      default: false,
    },
    reward: {
      type: Number,
      default: 0,
      min: [0, "Reward cannot be negative"],
    },
    participants: [
      {
        type: String,
        ref: "User", // Assuming you have a User model
      },
    ],
    status: {
      type: String,
      enum: ["upcoming", "ongoing", "completed", "cancelled"],
      default: "upcoming",
    },
    createdBy: {
      type: String,
      ref: "User",
    },
  },
  {
    timestamps: true, // Adds createdAt and updatedAt fields
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

// Virtual to get current participant count
GameSessionSchema.virtual("currentParticipantCount").get(function (
  this: IGameSession
) {
  return this.participants ? this.participants.length : 0;
});

// Method to check if session is full
GameSessionSchema.methods.isFull = function (this: IGameSession) {
  return this.currentParticipantCount >= this.maxPlayers;
};

// Static method to find active sessions
GameSessionSchema.statics.findActiveSessions = function () {
  return this.find({
    status: { $in: ["upcoming", "ongoing"] },
    startTime: { $gte: new Date() },
  });
};

// Prevent duplicate compilation of model
export const GameSession =
  (mongoose.models.GameSession as Model<IGameSession>) ||
  mongoose.model<IGameSession>("GameSession", GameSessionSchema);
