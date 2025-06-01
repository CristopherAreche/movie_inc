import { fetchNowPlayingMovies } from "../services/tmbd";
import { describe, test, expect } from "vitest";
describe("Testing all the API Calls", () => {
  test("Add should return an object", () => {
    const API_KEY = import.meta.env.VITE_TMDB_API_KEY;
    const BASE_URL = "";
    expect(fetchNowPlayingMovies(API_KEY, BASE_URL)).rejects.toThrow(
      "Error fetching now playing movies"
    );
  });

  test("Test if movie details is an object", async () => {
    const API_KEY = import.meta.env.VITE_TMDB_API_KEY;
    const BASE_URL = "https://api.themoviedb.org/3";
    const results = await fetchNowPlayingMovies(API_KEY, BASE_URL);
    expect(Array.isArray(results)).toBe(true);
    results.forEach((movie) => {
      expect(typeof movie).toBe("object");
    });
  });
});

//hacer un test si falta el api key

//para correr el test, agregar al proyecto el .env con la api key y correr el comando npm run test. agraegar esto en el README file.
