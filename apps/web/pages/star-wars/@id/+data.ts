// https://vike.dev/data

import type { PageContextServer } from "vike/types";
import type { MovieDetails } from "../types.js";
import { useConfig } from "vike-react/useConfig";

export type Data = Awaited<ReturnType<typeof data>>;

export const data = async (pageContext: PageContextServer) => {
  try {
    const config = useConfig();

    const response = await fetch(`https://brillout.github.io/star-wars/api/films/${pageContext.routeParams.id}.json`);
    if (!response.ok) {
      console.error(`HTTP error! status: ${response.status}`);
      return null;
    }

    const movie = (await response.json()) as MovieDetails;

    if (!movie) {
      console.error("No movie data received");
      return null;
    }

    config({
      title: movie.title,
    });

    return minimize(movie);
  } catch (error) {
    console.error("Failed to fetch movie:", error);
    return null;
  }
};
function minimize(movie: MovieDetails): MovieDetails {
  const { id, title, release_date, director, producer } = movie;
  return { id, title, release_date, director, producer };
}
