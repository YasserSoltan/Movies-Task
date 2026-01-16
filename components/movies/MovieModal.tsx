import { CreateMovieDto } from "@/types/movie";
import MovieForm from "./MovieForm";

interface MovieModalProps {
  isOpen: boolean;
  isEditing: boolean;
  formData: CreateMovieDto;
  onChange: (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => void;
  onRatingChange: (rating: number) => void;
  onSubmit: (e: React.FormEvent) => void;
  onClose: () => void;
}

export default function MovieModal({
  isOpen,
  isEditing,
  formData,
  onChange,
  onRatingChange,
  onSubmit,
  onClose,
}: MovieModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 p-4">
      <div className="w-full max-w-lg max-h-[90vh] rounded-lg bg-white shadow-xl flex flex-col">
        <div className="px-6 pt-6 pb-4 border-b border-gray-200">
          <h2 className="text-2xl font-bold text-gray-900">
            {isEditing ? "Edit Movie" : "Add New Movie"}
          </h2>
        </div>
        <div className="overflow-y-auto px-6 py-4 flex-1">
          <MovieForm
            formData={formData}
            isEditing={isEditing}
            onChange={onChange}
            onRatingChange={onRatingChange}
            onSubmit={onSubmit}
            onCancel={onClose}
          />
        </div>
      </div>
    </div>
  );
}

