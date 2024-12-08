import mongoose, { Schema, Model, Document } from "mongoose";

// Interface for the User document
export interface IUser extends Document {
  nickname: string;
  gameId: string;
  score: number;
}

// Mongoose Schema
const UserSchema: Schema = new Schema(
  {
    base: {
      type: String,
      require: true,
    },
    score: {
      type: Number,
      require: true,
    },
    gameId: {
      type: String,
      require: true,
    },
  },
  {
    timestamps: true,
  }
);

// Prevent duplicate compilation of model
export const User =
  (mongoose.models.User as Model<IUser>) ||
  mongoose.model<IUser>("User", UserSchema);
