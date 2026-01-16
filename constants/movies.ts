export const AVAILABLE_GENRES = [
  "Action",
  "Adventure",
  "Comedy",
  "Drama",
  "Fantasy",
  "Horror",
  "Romance",
  "Sci-Fi",
  "Thriller",
  "Animation",
  "Documentary",
  "Crime",
  "Mystery",
] as const;

export type Genre = (typeof AVAILABLE_GENRES)[number];

