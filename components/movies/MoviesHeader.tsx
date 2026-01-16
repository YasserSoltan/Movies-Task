import { Movie } from "@/types/movie";

interface MoviesHeaderProps {
  onAddClick: () => void;
  movies: Movie[];
}

export default function MoviesHeader({
  onAddClick,
  movies,
}: MoviesHeaderProps) {
  return (
    <div className="mb-8 flex items-center justify-between">
      <div className="flex items-center justify-between gap-5">
        <h1 className="text-4xl font-bold text-white">Movies Management</h1>
        <p className="text-white text-xl">
          {movies.length} movies /
          Average rating:{" "}
          {movies.length > 0
            ? (
                movies.reduce((sum, movie) => sum + movie.rating, 0) /
                movies.length
              ).toFixed(1)
            : "N/A"}
        </p>
      </div>
      <button
        onClick={onAddClick}
        className="rounded-lg bg-green-800 px-6 py-3 text-white transition-colors hover:bg-green-700 cursor-pointer"
      >
        + Add Movie
      </button>
    </div>
  );
}
