import { MovieDetailsType } from "../services/tmbd.types";

export function formatDate(dateString: string): string {
  const date = new Date(dateString);
  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

export function formatDuration(runtime: number): string {
  const hrs = Math.floor(runtime / 60);
  const mins = runtime % 60;
  return `${hrs} hr ${mins} min`;
}

export function formatGenres(genres: MovieDetailsType["genres"]): string {
  return genres.map((g) => g.name).join(", ");
}

export function formatCountries(
  countries: MovieDetailsType["production_countries"]
): string {
  return countries.map((c) => c.name).join(", ");
}
