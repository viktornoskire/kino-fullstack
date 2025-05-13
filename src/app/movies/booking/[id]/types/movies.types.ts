import mongoose from 'mongoose';
export interface MovieType {
  _id: string | mongoose.Types.ObjectId;
  title: string;
  description: string;
  genre: string[];
  durationMinutes: number;
  posterUrl: string;
  premiereDate: Date;
  tags: string[];
  ageLimit: number;
  ageRatingText: string;
  slug: string;
}

export interface ScreeningType {
  _id: string | mongoose.Types.ObjectId;
  movieId: string | mongoose.Types.ObjectId;
  screeningTime: string;
  auditorium: string;
}