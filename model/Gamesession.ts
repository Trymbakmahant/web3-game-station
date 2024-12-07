import mongoose, { Schema, Model, Document } from "mongoose";

// Interface extending mongoose Document
export interface IGameSession extends Document {
  currentParticipantCount: number;
  orgId: string;
  title: string;
  description?: string;
  startTime: Date;
  endTime: Date;

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
      type: Number,
      required: true,
    },
    endTime: {
      type: Number,
      required: true,
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
