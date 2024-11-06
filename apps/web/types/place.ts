export const enum Place {
  MAIN,
  BAR,
  LOGIN,
}
export interface VikeStore {
  place: Place;
}

export const getPlace = (urlLogical?: string): Place => {
  if (urlLogical === "/") {
    return Place.MAIN;
  } else if (urlLogical?.startsWith("/login")) {
    return Place.LOGIN;
  }
  return Place.BAR;
};
