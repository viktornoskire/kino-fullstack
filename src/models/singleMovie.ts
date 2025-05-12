import mongoose, { Schema, models } from "mongoose";

const movieSchema = new Schema({
  title: String,
  posterUrl: String,
  slug: { type: String, unique: true },
  tags: [String],
});

export const Movie = models.Movie || mongoose.model("Movie", movieSchema);