import { MovieDetailsType, CastMember, Movie } from "./tmbd.types";

const API_KEY = import.meta.env.VITE_TMDB_API_KEY;
const BASE_URL = "https://api.themoviedb.org/3";

export async function fetchNowPlayingMovies(): Promise<Movie[]> {
  try {
    const response = await fetch(
      `${BASE_URL}/movie/now_playing?api_key=${API_KEY}&language=en-US`
    );
    if (!response.ok) throw new Error("Error fetching now playing movies");
    const data = await response.json();
    return data.results;
  } catch (error) {
    throw new Error("Error fetching now playing movies");
  }
}

export async function fetchMovieDetails(id: number): Promise<MovieDetailsType> {
  const res = await fetch(
    `${BASE_URL}/movie/${id}?api_key=${API_KEY}&language=en-US`
  );
  if (!res.ok) throw new Error("Error fetching movie details");
  const data = await res.json();
  return data;
}

export async function fetchMovieCredits(
  movieId: number
): Promise<CastMember[]> {
  const response = await fetch(
    `${BASE_URL}/movie/${movieId}/credits?api_key=${API_KEY}`
  );
  if (!response.ok) throw new Error("Error fetching movie credits");
  const data = await response.json();
  return data.cast;
}

export async function createGuestSession(): Promise<string> {
  const res = await fetch(
    `${BASE_URL}/authentication/guest_session/new?api_key=${API_KEY}`
  );
  if (!res.ok) throw new Error("Guess Session Error");

  const data = await res.json();
  return data.guest_session_id;
}

export async function getOrCreateGuestSession(): Promise<string> {
  const key = "tmdb_guest_session_id";
  const saved = localStorage.getItem(key);

  if (saved) return saved;

  const newSessionId = await createGuestSession();
  localStorage.setItem(key, newSessionId);
  return newSessionId;
}

export async function rateMovie(movieId: number, value: number): Promise<void> {
  const sessionId = await getOrCreateGuestSession();

  const res = await fetch(
    `${BASE_URL}/movie/${movieId}/rating?api_key=${API_KEY}&guest_session_id=${sessionId}`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ value }),
    }
  );

  if (!res.ok) {
    const error = await res.json();
    throw new Error(error.status_message || "Error rating movie");
  }
}

export async function fetchSimilarMovies(movieId: number): Promise<Movie[]> {
  const res = await fetch(
    `${BASE_URL}/movie/${movieId}/similar?api_key=${API_KEY}&language=es-ES`
  );
  if (!res.ok) throw new Error("Error fetching similar movies");

  const data = await res.json();
  return data.results;
}
