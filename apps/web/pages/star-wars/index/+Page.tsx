import React from "react";
import { useData } from "vike-react/useData";
import type { Data } from "./+data.js";

export default function Page() {
  const movies = useData<Data>();

  if (!movies) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <h1>Star Wars Movies</h1>
      <ul>
        {movies.map(({ id, title, release_date }) => (
          <li key={id}>
            <a href={`/star-wars/${id}`}>{title}</a> ({release_date})
          </li>
        ))}
      </ul>
    </>
  );
}
