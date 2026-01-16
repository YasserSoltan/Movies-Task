import { useState, useEffect, useCallback } from "react";
import { Movie, CreateMovieDto } from "@/types/movie";

export function useMovies() {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchMovies = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await fetch("/api/movies");
      if (!response.ok) {
        throw new Error("Failed to fetch movies");
      }
      const data = await response.json();
      setMovies(data);
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : "An unknown error occurred";
      setError(errorMessage);
      console.error("Error fetching movies:", err);
    } finally {
      setLoading(false);
    }
  }, []);

  const createMovie = useCallback(
    async (formData: CreateMovieDto) => {
      try {
        const response = await fetch("/api/movies", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData),
        });

        if (!response.ok) {
          throw new Error("Failed to create movie");
        }

        await fetchMovies();
        return true;
      } catch (err) {
        console.error("Error creating movie:", err);
        return false;
      }
    },
    [fetchMovies]
  );

  const updateMovie = useCallback(
    async (id: number, formData: CreateMovieDto) => {
      try {
        const response = await fetch("/api/movies", {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ ...formData, id }),
        });

        if (!response.ok) {
          throw new Error("Failed to update movie");
        }

        await fetchMovies();
        return true;
      } catch (err) {
        console.error("Error updating movie:", err);
        return false;
      }
    },
    [fetchMovies]
  );

  const deleteMovie = useCallback(
    async (id: number) => {
      try {
        const response = await fetch(`/api/movies?id=${id}`, {
          method: "DELETE",
        });

        if (!response.ok) {
          throw new Error("Failed to delete movie");
        }

        await fetchMovies();
        return true;
      } catch (err) {
        console.error("Error deleting movie:", err);
        return false;
      }
    },
    [fetchMovies]
  );

  useEffect(() => {
    fetchMovies();
  }, [fetchMovies]);

  return {
    movies,
    loading,
    error,
    fetchMovies,
    createMovie,
    updateMovie,
    deleteMovie,
  };
}

