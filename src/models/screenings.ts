
import mongoose from "mongoose";

const screeningSchema = new mongoose.Schema({
  movieId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "movie",
    required: true,
  },
  screeningTime: String,
  auditorium: String,
});

export const Screening = mongoose.models.screening || mongoose.model("screening", screeningSchema);