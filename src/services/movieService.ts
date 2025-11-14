import axios from "axios";
import type { MoviesResponse } from "../types/movie";

const TOKEN = import.meta.env.VITE_TMDB_TOKEN;
const BASE_URL = "https://api.themoviedb.org/3";

export async function fetchMovies(
  query: string,
  page: number
): Promise<MoviesResponse> {
  const config = {
    params: {
      query,
      page,
      include_adult: false,
      language: "en-US",
    },
    headers: {
      Authorization: `Bearer ${TOKEN}`,
    },
  };

  const url = `${BASE_URL}/search/movie`;
  const response = await axios.get<MoviesResponse>(url, config);

  return response.data;
}
