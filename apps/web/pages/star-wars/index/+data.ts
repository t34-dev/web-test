// https://vike.dev/data

import type { MovieDetails } from "../types.js";
import { useConfig } from "vike-react/useConfig";

export type Data = Awaited<ReturnType<typeof data>>;

export const data = async () => {
  try {
    const config = useConfig();

    const response = await fetch("https://brillout.github.io/star-wars/api/films/index.json");
    if (!response.ok) {
      console.error(`HTTP error! status: ${response.status}`);
      return [];
    }

    const movies = (await response.json()) as MovieDetails[];

    if (!movies || !Array.isArray(movies)) {
      console.error("Invalid movies data received");
      return [];
    }

    config({
      title: "Star Wars Movies",
    });

    return movies.map(minimize);
  } catch (error) {
    console.error("Failed to fetch movies:", error);
    return [];
  }
};
function minimize(movie: MovieDetails) {
  const { id, title, release_date } = movie;
  return { id, title, release_date };
}
