import { AVAILABLE_GENRES } from "@/constants/movies";
import { CreateMovieDto } from "@/types/movie";
import StarRating from "./StarRating";

interface MovieFormProps {
  formData: CreateMovieDto;
  isEditing: boolean;
  onChange: (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => void;
  onRatingChange: (rating: number) => void;
  onSubmit: (e: React.FormEvent) => void;
  onCancel: () => void;
}

export default function MovieForm({
  formData,
  isEditing,
  onChange,
  onRatingChange,
  onSubmit,
  onCancel,
}: MovieFormProps) {
  return (
    <form onSubmit={onSubmit} className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700">Name</label>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={onChange}
          required
          className="mt-1 w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-200"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">
          Description
        </label>
        <textarea
          name="description"
          value={formData.description}
          onChange={onChange}
          required
          rows={4}
          className="mt-1 w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-200"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">
          Image URL
        </label>
        <input
          type="url"
          name="image"
          value={formData.image}
          onChange={onChange}
          required
          className="mt-1 w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-200"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Rating
        </label>
        <StarRating
          rating={formData.rating}
          onRatingChange={onRatingChange}
          size="md"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">
          Genres (Hold Ctrl/Cmd to select multiple)
        </label>
        <select
          name="genres"
          multiple
          value={formData.genres}
          onChange={onChange}
          required
          size={5}
          className="mt-1 w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-200"
        >
          {AVAILABLE_GENRES.map((genre) => (
            <option key={genre} value={genre}>
              {genre}
            </option>
          ))}
        </select>
        <p className="mt-1 text-xs text-gray-500">
          Selected:{" "}
          {formData.genres.length > 0 ? formData.genres.join(", ") : "None"}
        </p>
      </div>

      <div className="flex items-center">
        <input
          type="checkbox"
          name="inTheaters"
          id="inTheaters"
          checked={formData.inTheaters}
          onChange={onChange}
          className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-2 focus:ring-blue-500"
        />
        <label
          htmlFor="inTheaters"
          className="ml-2 text-sm font-medium text-gray-700"
        >
          In Theaters
        </label>
      </div>

      <div className="flex gap-4 pt-4">
        <button
          type="submit"
          className="flex-1 rounded-lg bg-blue-600 px-6 py-3 font-medium text-white transition-colors hover:bg-blue-700"
        >
          {isEditing ? "Update Movie" : "Add Movie"}
        </button>
        <button
          type="button"
          onClick={onCancel}
          className="flex-1 rounded-lg bg-gray-300 px-6 py-3 font-medium text-gray-700 transition-colors hover:bg-gray-400"
        >
          Cancel
        </button>
      </div>
    </form>
  );
}
