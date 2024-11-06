export const enum Place {
  MAIN,
  LOGIN,
}
export interface VikeStore {
  place: Place;
}

export const getPlace = (urlLogical?: string): Place => {
  if (urlLogical?.startsWith("/login")) {
    return Place.LOGIN;
  }
  return Place.MAIN;
};
