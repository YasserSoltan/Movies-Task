import { Movie } from "@/types/movie";
import MovieCard from "./MovieCard";

interface MovieListProps {
  movies: Movie[];
  onEdit: (movie: Movie) => void;
  onDelete: (id: number) => void;
}

export default function MovieList({
  movies,
  onEdit,
  onDelete,
}: MovieListProps) {
  return (
    <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 auto-rows-max">
      {movies.map((movie) => (
        <div key={movie.id} className="h-full">
          <MovieCard movie={movie} onEdit={onEdit} onDelete={onDelete} />
        </div>
      ))}
    </div>
  );
}
