"use client";

interface StarRatingProps {
  rating: number;
  onRatingChange?: (rating: number) => void;
  readonly?: boolean;
  size?: "sm" | "md" | "lg";
}

export default function StarRating({
  rating,
  onRatingChange,
  readonly = false,
  size = "md",
}: StarRatingProps) {
  const sizeClasses = {
    sm: "text-lg",
    md: "text-2xl",
    lg: "text-3xl",
  };

  const handleClick = (value: number) => {
    if (!readonly && onRatingChange) {
      onRatingChange(value);
    }
  };

  const handleMouseEnter = (value: number) => {
    if (!readonly) {
      // Optional: Add hover effect
    }
  };

  return (
    <div className="flex items-center gap-1">
      {[1, 2, 3, 4, 5].map((star) => (
        <button
          key={star}
          type="button"
          onClick={() => handleClick(star)}
          onMouseEnter={() => handleMouseEnter(star)}
          disabled={readonly}
          className={`${sizeClasses[size]} ${
            readonly ? "cursor-default" : "cursor-pointer hover:scale-110"
          } transition-transform ${
            star <= rating
              ? "text-yellow-400"
              : "text-gray-300 dark:text-gray-600"
          }`}
        >
          ★
        </button>
      ))}
      {!readonly && (
        <span className="ml-2 text-sm text-gray-600">{rating}/5</span>
      )}
    </div>
  );
}

