export interface Origin {
  name: string;
  url: string;
}

export interface Location {
  name: string;
  url: string;
}

export interface RMApiCharacter {
  id: number;
  name: string;
  status: string;
  species: string;
  type: string;
  gender: string;
  origin: Origin;
  location: Location;
  image: string;
  episode: string[];
  url: string;
  created: string;
}

export interface RMApiResponse {
  info: {
    count: number;
    pages: number;
    next: string;
    prev: null;
  };
  results: RMApiCharacter[];
}
