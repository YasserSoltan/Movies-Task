"use client";

import { useState } from "react";
import toast from "react-hot-toast";
import { CreateMovieDto, Movie } from "@/types/movie";
import { useMovies } from "@/hooks/useMovies";
import MoviesHeader from "@/components/movies/MoviesHeader";
import MovieList from "@/components/movies/MovieList";
import EmptyState from "@/components/movies/EmptyState";
import LoadingState from "@/components/movies/LoadingState";
import MovieModal from "@/components/movies/MovieModal";
import Swal from "sweetalert2";

const initialFormData: CreateMovieDto = {
  name: "",
  description: "",
  image: "",
  rating: 1,
  genres: [],
  inTheaters: false,
};

export default function MoviesPage() {
  const { movies, loading, createMovie, updateMovie, deleteMovie } =
    useMovies();
  const [showModal, setShowModal] = useState(false);
  const [editingMovie, setEditingMovie] = useState<Movie | null>(null);
  const [formData, setFormData] = useState<CreateMovieDto>(initialFormData);

  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value, type } = e.target;

    if (type === "checkbox") {
      const checked = (e.target as HTMLInputElement).checked;
      setFormData((prev) => ({ ...prev, [name]: checked }));
    } else if (name === "genres") {
      const select = e.target as HTMLSelectElement;
      const selectedGenres = Array.from(
        select.selectedOptions,
        (option) => option.value
      );
      setFormData((prev) => ({ ...prev, genres: selectedGenres }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleRatingChange = (rating: number) => {
    setFormData((prev) => ({ ...prev, rating }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const success = editingMovie
      ? await updateMovie(editingMovie.id, formData)
      : await createMovie(formData);

    if (success) {
      toast.success(
        editingMovie
          ? "Movie updated successfully!"
          : "Movie added successfully!"
      );
      resetForm();
    } else {
      toast.error(
        editingMovie ? "Failed to update movie" : "Failed to add movie"
      );
    }
  };

  const handleDelete = async (id: number) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
    }).then(async (result) => {
      if (result.isConfirmed) {
        const success = await deleteMovie(id);
        if (success) {
          toast.success("Movie deleted successfully!");
        } else {
          toast.error("Failed to delete movie");
        }
      }
    });
  };

  const handleEdit = (movie: Movie) => {
    setEditingMovie(movie);
    setFormData({
      name: movie.name,
      description: movie.description,
      image: movie.image,
      rating: movie.rating,
      genres: movie.genres,
      inTheaters: movie.inTheaters,
    });
    setShowModal(true);
  };

  const resetForm = () => {
    setFormData(initialFormData);
    setEditingMovie(null);
    setShowModal(false);
  };

  const openAddModal = () => {
    resetForm();
    setShowModal(true);
  };

  if (loading) {
    return <LoadingState />;
  }

  return (
    <div className="min-h-screen bg-gray-800 p-8">
      <div className="mx-auto max-w-7xl">
        <MoviesHeader onAddClick={openAddModal} movies={movies} />

        {movies.length === 0 ? (
          <EmptyState />
        ) : (
          <MovieList
            movies={movies}
            onEdit={handleEdit}
            onDelete={handleDelete}
          />
        )}

        <MovieModal
          isOpen={showModal}
          isEditing={!!editingMovie}
          formData={formData}
          onChange={handleInputChange}
          onRatingChange={handleRatingChange}
          onSubmit={handleSubmit}
          onClose={resetForm}
        />
      </div>
    </div>
  );
}
