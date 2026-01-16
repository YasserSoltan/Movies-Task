import { NextRequest, NextResponse } from 'next/server';
import { Movie } from '@/types/movie';

const movies: Movie[] = [];
let nextId = 1;

// Fetch all movies
export async function GET() {
    return NextResponse.json(movies);
}

// Create a new movie
export async function POST(request: NextRequest) {
    try {
        const body = await request.json();
        const { name, description, image, rating, genres, inTheaters } = body;

        if (!name || !description || !image || rating === undefined || !genres || inTheaters === undefined) {
            return NextResponse.json(
                { error: 'Missing required fields' },
                { status: 400 }
            );
        }

        const ratingNum = Number(rating);
        if (ratingNum < 1 || ratingNum > 5 || !Number.isInteger(ratingNum)) {
            return NextResponse.json(
                { error: 'Rating must be an integer between 1 and 5' },
                { status: 400 }
            );
        }

        const newMovie: Movie = {
            id: nextId++,
            name,
            description,
            image,
            rating: ratingNum,
            genres: Array.isArray(genres) ? genres : [genres],
            inTheaters: Boolean(inTheaters),
        };

        movies.push(newMovie);
        return NextResponse.json(newMovie, { status: 201 });
    } catch (error) {
        return NextResponse.json(
            { error: 'Invalid request body' },
            { status: 400 }
        );
    }
}

// Update a movie
export async function PUT(request: NextRequest) {
    try {
        const body = await request.json();
        const { id, name, description, image, rating, genres, inTheaters } = body;

        if (!id) {
            return NextResponse.json(
                { error: 'Movie ID is required' },
                { status: 400 }
            );
        }

        const movieIndex = movies.findIndex((m) => m.id === Number(id));
        if (movieIndex === -1) {
            return NextResponse.json(
                { error: 'Movie not found' },
                { status: 404 }
            );
        }

        if (name !== undefined) movies[movieIndex].name = name;
        if (description !== undefined) movies[movieIndex].description = description;
        if (image !== undefined) movies[movieIndex].image = image;
        if (rating !== undefined) {
            const ratingNum = Number(rating);
            if (ratingNum < 1 || ratingNum > 5 || !Number.isInteger(ratingNum)) {
                return NextResponse.json(
                    { error: 'Rating must be an integer between 1 and 5' },
                    { status: 400 }
                );
            }
            movies[movieIndex].rating = ratingNum;
        }
        if (genres !== undefined) movies[movieIndex].genres = Array.isArray(genres) ? genres : [genres];
        if (inTheaters !== undefined) movies[movieIndex].inTheaters = Boolean(inTheaters);

        return NextResponse.json(movies[movieIndex]);
    } catch (error) {
        return NextResponse.json(
            { error: 'Invalid request body' },
            { status: 400 }
        );
    }
}

// Delete a movie
export async function DELETE(request: NextRequest) {
    try {
        const { searchParams } = new URL(request.url);
        const id = searchParams.get('id');

        if (!id) {
            return NextResponse.json(
                { error: 'Movie ID is required' },
                { status: 400 }
            );
        }

        const movieIndex = movies.findIndex((m) => m.id === Number(id));
        if (movieIndex === -1) {
            return NextResponse.json(
                { error: 'Movie not found' },
                { status: 404 }
            );
        }

        movies.splice(movieIndex, 1);
        return NextResponse.json({ message: 'Movie deleted successfully' });
    } catch (error) {
        return NextResponse.json(
            { error: 'Invalid request' },
            { status: 400 }
        );
    }
}

