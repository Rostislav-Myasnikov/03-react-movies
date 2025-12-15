import axios from "axios";
import type { Movie } from "../types/movie";

interface MoviesResponse {
  results: Movie[];
}

export default async function fetchMovies(query: string):Promise<Movie[]> {
  const response = await axios.get<MoviesResponse>(`https://api.themoviedb.org/3/search/movie`, {
    params: {
      query,
    },
    headers: {
      Authorization: `Bearer ${import.meta.env.VITE_API_KEY}`,
      "Content-Type": "application/json",
    },
  });

  return response.data.results;
}
