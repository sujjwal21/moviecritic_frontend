import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

import Layout from "../components/Layout";
import ReviewCard from "../components/ReviewCard";
import { useMovieList } from "../store/movies";
import { Review } from "../types";

function Reviews() {
  const { movies } = useMovieList();
  const [reviews, setReviews] = useState<Review[]>([]);
  const params = useParams<{ id: string }>();

  const movie = movies.find((movie) => movie._id === params.id);

  useEffect(() => {
    const source = axios.CancelToken.source();

    (async () => {
      try {
        const response = await axios.get<Review[]>(
          `${process.env.REACT_APP_API_URL}/movies/${params.id}/reviews`
        );
        console.log("reviews", response.data);
        setReviews(response.data);
      } catch (error) {
        console.error("Failed to fetch movies", error);
      }
    })();

    return () => {
      source.cancel();
    };
  }, [params.id, setReviews]);

  return (
    <Layout>
      <div className="flex flex-col md:flex-row justify-between items-center py-4">
        <h1 className="text-3xl font-bold text-gray-800">{movie?.name}</h1>
        <div className="flex items-center">
          <span className="text-3xl mr-2 text-blue-600">
            {movie?.averageRating}/10
          </span>
        </div>
      </div>
      {reviews.map((review) => (
        <ReviewCard
          key={review._id}
          id={review._id}
          review={review.reviewComments}
          rating={review.rating}
          author={review.reviewerName}
        />
      ))}
    </Layout>
  );
}

export default Reviews;
