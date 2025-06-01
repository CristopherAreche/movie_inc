import { Movie } from "../services/tmbd.types";

const FAVORITES_KEY = "movies_favorites";

export function getFavorites(): Movie[] {
  const stored = localStorage.getItem(FAVORITES_KEY);
  return stored ? JSON.parse(stored) : [];
}

export function isFavorite(movieId: number): boolean {
  return getFavorites().some((m) => m.id === movieId);
}

export function addFavorite(movie: Movie): void {
  const current = getFavorites();
  const updated = [...current, movie];
  localStorage.setItem(FAVORITES_KEY, JSON.stringify(updated));
}

export function removeFavorite(movieId: number): void {
  const updated = getFavorites().filter((m) => m.id !== movieId);
  localStorage.setItem(FAVORITES_KEY, JSON.stringify(updated));
}
