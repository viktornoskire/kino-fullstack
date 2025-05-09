export type movieType = {
  _id: string;
  title: string;
  description: string;
  genre: [string];
  durationMinutes: string;
  posterUrl: string;
  premiereDate: Date;
  tags: [string];
  ageLimit: number;
  ageRatingText: string;
  slug: string;
};
