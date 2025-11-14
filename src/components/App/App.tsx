import { useState, useEffect } from "react";
import toast, { Toaster } from "react-hot-toast";

import SearchBar from "../SearchBar/SearchBar";
import MovieGrid from "../MovieGrid/MovieGrid";
import Loader from "../Loader/Loader";
import ErrorMessage from "../ErrorMessage/ErrorMessage";
import MovieModal from "../MovieModal/MovieModal";

import { useMovies } from "../../services/useMovies";
import type { Movie } from "../../types/movie";

import ReactPaginate from "react-paginate";
import styles from "./App.module.css";

const App = () => {
  const [query, setQuery] = useState("");
  const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null);
  const [page, setPage] = useState(1);

  const { data, isLoading, isError } = useMovies(query, page);

  const movies = data?.results ?? [];
  const totalPages = data?.total_pages ?? 1;

  const handleSearch = (value: string): void => {
    setQuery(value);
    setPage(1);
  };

  const handleSelect = (movie: Movie): void => {
    setSelectedMovie(movie);
  };

  const handleCloseModal = (): void => {
    setSelectedMovie(null);
  };

  useEffect(() => {
  if (!isLoading && !isError && query !== "" && movies.length === 0) {
    toast.error("No movies found for your request.");
  }
}, [isLoading, isError, query, movies.length]);
  return (
    <div className={styles.app}>
      <SearchBar onSubmit={handleSearch} />

      <main>
        {isLoading && <Loader />}

        {isError && !isLoading && <ErrorMessage />}

        {!isLoading && !isError && movies.length > 0 && (
          <>
           {totalPages > 1 && (
              <ReactPaginate
                pageCount={totalPages}
                pageRangeDisplayed={5}
                marginPagesDisplayed={1}
                onPageChange={({ selected }) => setPage(selected + 1)}
                forcePage={page - 1}
                containerClassName={styles.pagination}
                activeClassName={styles.active}
                nextLabel="→"
                previousLabel="←"
              />
            )}
            <MovieGrid movies={movies} onSelect={handleSelect} />
          </>
        )}

        {selectedMovie && (
          <MovieModal movie={selectedMovie} onClose={handleCloseModal} />
        )}
      </main>

      <Toaster position="top-center" />
    </div>
  );
};

export default App;
