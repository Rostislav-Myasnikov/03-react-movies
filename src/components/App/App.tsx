import SearchBar from "../SearchBar/SearchBar";
import fetchMovies from "../../services/movieService";
import { useState } from "react";
import type {Movie} from "../../types/movie";
import toast, { Toaster } from "react-hot-toast";
import MovieGrid from "../MovieGrid/MovieGrid";
import ErrorMessage from "../ErrorMessage/ErrorMessage";
import Loader from "../Loader/Loader";
import MovieModal from "../MovieModal/MovieModal";

function App() {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null);
  const [isLoad, setIsLoad] = useState<boolean>(false);
  const [isError, setIsError] = useState<boolean>(false);

  const handleSearch = async (query: string) => {
    try {
      setIsLoad(true);
      setIsError(false);
      const result = await fetchMovies(query);
      setMovies(result);
      console.log(result);
      if (result.length === 0) {
        toast.error("No movies found for your request.");
      }
    } catch (error) {
      setIsLoad(false);
      setIsError(true);

      console.log(error);
    } finally {
      setIsLoad(false);
    }
  };

  return (
    <>
      <SearchBar onSubmit={handleSearch} />
      <Toaster />
      {isLoad && <Loader />}
      {isError && <ErrorMessage />}
      <MovieGrid
        movies={movies}
        onSelect={(movie) => setSelectedMovie(movie)}
      />
      {selectedMovie && (
        <MovieModal
          movie={selectedMovie}
          onClose={() => setSelectedMovie(null)}
        />
      )}
    </>
  );
}

export default App;
