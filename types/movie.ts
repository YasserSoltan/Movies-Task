export interface Movie {
    id: number;
    name: string;
    description: string;
    image: string;
    rating: number;
    genres: string[];
    inTheaters: boolean;
}

export interface CreateMovieDto {
    name: string;
    description: string;
    image: string;
    rating: number;
    genres: string[];
    inTheaters: boolean;
}

export interface UpdateMovieDto extends Partial<CreateMovieDto> {
    id: number;
}

