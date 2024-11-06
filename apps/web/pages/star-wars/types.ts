export type Movie = {
  id: string;
  title: string;
  release_date: string;
};

// types.ts
export interface MovieDetails {
  id: string;
  title: string;
  release_date: string;
  director?: string;
  producer?: string;
}
