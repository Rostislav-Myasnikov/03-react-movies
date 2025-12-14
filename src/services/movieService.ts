import axios from "axios";

export default async function fetchMovies(query: string) {
  const response = await axios.get(`https://api.themoviedb.org/3/search/movie`, {
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
