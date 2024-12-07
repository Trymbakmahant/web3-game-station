import mongoose, { Schema, Model, Document } from "mongoose";

// Interface for the Organization document
export interface IOrganization extends Document {
  name: string;
  discordHandle?: string;
  telegramHandle?: string;
  base: string;
  description?: string;
  isActive?: boolean;
}

// Mongoose Schema
const OrganizationSchema: Schema = new Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      unique: true,
      minlength: [2, "Organization name must be at least 2 characters long"],
      maxlength: [100, "Organization name cannot exceed 100 characters"],
    },
    discordHandle: {
      type: String,
      trim: true,
      validate: {
        validator: function (v: string) {
          // Discord handle validation (username#discriminator format)
          return !v || /^.{3,32}#\d{4}$/.test(v);
        },
        message: "Invalid Discord handle format. Should be Username#1234",
      },
    },
    base: {
      type: String,
      require: true,
    },
    telegramHandle: {
      type: String,
      trim: true,
      validate: {
        validator: function (v: string) {
          // Telegram handle validation (starts with @, only alphanumeric and underscores)
          return !v || /^@[a-zA-Z0-9_]{5,32}$/.test(v);
        },
        message:
          "Invalid Telegram handle format. Should start with @ and be 5-32 alphanumeric characters",
      },
    },
    description: {
      type: String,
      trim: true,
      maxlength: [500, "Description cannot exceed 500 characters"],
    },
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);

// Compound unique index to allow null/empty values while keeping name unique
OrganizationSchema.index({ name: 1 }, { unique: true });

// Prevent duplicate compilation of model
export const Organization =
  (mongoose.models.Organization as Model<IOrganization>) ||
  mongoose.model<IOrganization>("Organization", OrganizationSchema);
