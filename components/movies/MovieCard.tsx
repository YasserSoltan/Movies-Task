import { Movie } from "@/types/movie";
import StarRating from "./StarRating";
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";

interface MovieCardProps {
  movie: Movie;
  onEdit: (movie: Movie) => void;
  onDelete: (id: number) => void;
}

export default function MovieCard({ movie, onEdit, onDelete }: MovieCardProps) {
  return (
    <div className="flex flex-col h-full overflow-hidden rounded-lg bg-zinc-400 shadow-md transition-shadow hover:shadow-lg">
      <img
        src={movie.image || "/placeholder-movie.jpg"}
        alt={movie.name}
        className="h-64 w-full object-cover"
        onError={(e) => {
          (e.target as HTMLImageElement).src =
            "https://via.placeholder.com/400x300?text=No+Image";
        }}
      />
      <div className="flex flex-col flex-1 p-6">
        <div className="mb-2 flex items-start justify-between gap-2">
          <h2 className="text-lg font-semibold text-gray-900 line-clamp-2 flex-1">
            {movie.name}
          </h2>
          {movie.inTheaters && (
            <span className="rounded-full bg-green-100 px-3 py-1 text-xs font-medium text-green-800 flex-shrink-0 whitespace-nowrap">
              In Theaters
            </span>
          )}
        </div>
        <p className="mb-3 line-clamp-2 text-sm text-gray-600 h-10">
          {movie.description}
        </p>
        <div className="mb-4 flex-1">
          <div className="mb-2">
            <StarRating rating={movie.rating} readonly size="sm" />
          </div>
          <div className="flex flex-wrap gap-2 max-h-16 overflow-y-auto">
            {movie.genres.map((genre) => (
              <span
                key={genre}
                className="rounded-full bg-blue-100 px-2 py-1 text-xs text-blue-800 flex-shrink-0 whitespace-nowrap"
              >
                {genre}
              </span>
            ))}
          </div>
        </div>
        <div className="flex gap-2">
          <button
            onClick={() => onEdit(movie)}
            className="flex-1 rounded-lg bg-yellow-500 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-yellow-600 cursor-pointer flex items-center justify-center"
          >
            <FaEdit />
          </button>
          <button
            onClick={() => onDelete(movie.id)}
            className="flex-1 rounded-lg bg-red-500 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-red-600 cursor-pointer flex items-center justify-center"
          >
            <MdDelete />
          </button>
        </div>
      </div>
    </div>
  );
}
