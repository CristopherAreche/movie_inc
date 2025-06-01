import { Movie } from "../services/tmbd.types";
export function sortMoviesByTitle(
  movies: Movie[],
  direction: "asc" | "desc" = "asc"
): Movie[] {
  return [...movies].sort((a, b) => {
    const titleA = a.title.toLowerCase();
    const titleB = b.title.toLowerCase();

    if (titleA < titleB) return direction === "asc" ? -1 : 1;
    if (titleA > titleB) return direction === "asc" ? 1 : -1;
    return 0;
  });
}
