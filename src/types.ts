export type Movie = {
  _id: string;
  name: string;
  releaseDate: string;
  averageRating: number;
};

export type Review = {
  _id: string;
  movieId: string;
  reviewerName: string;
  rating: number;
  reviewComments: string;
};
