import mongoose, { Schema, Model, Document } from "mongoose";

// Interface for the User document
export interface IUser extends Document {
  nickname: string;
}

// Mongoose Schema
const UserSchema: Schema = new Schema(
  {
    nickname: {
      type: String,
      required: true,
      trim: true,
      unique: true,
      minlength: [2, "Nickname must be at least 2 characters long"],
      maxlength: [50, "Nickname cannot exceed 50 characters"],
      // Regex to allow letters, numbers, and some special characters
      match: [
        /^[a-zA-Z0-9_-]+$/,
        "Nickname can only contain letters, numbers, underscores, and hyphens",
      ],
    },
    base: {
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
