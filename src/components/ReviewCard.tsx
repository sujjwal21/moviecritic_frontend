import { RiEditBoxFill } from "react-icons/ri";
import { ImBin } from "react-icons/im";
import { useMovieList } from "../store/movies";
import axios from "axios";
import { useState } from "react";
import { Review } from "../types"; // Import the Review type if necessary

export default function ReviewCard({
  id, // Review ID for deletion
  review,
  rating,
  author,
}: {
  id: string; // Type for the id prop
  review: string;
  rating: number;
  author: string;
}) {
  const { movies, setMovies } = useMovieList();

  const handleDelete = async (e: React.MouseEvent) => {
    e.stopPropagation();

    try {
      await axios.delete(`${process.env.REACT_APP_API_URL}/reviews/${id}`);
      window.location.reload();
    } catch (error) {
      console.error("Failed to delete review", error);
    }
  };

  return (
    <div className="flex relative justify-between items-start mt-4 border-2 border-gray-200 px-4 py-4 mb-5">
      <div>
        <p className="text-gray-500 mb-4">{review}</p>
        <span className="text-gray-500 italic font-bold">By {author}</span>
      </div>
      <div className="flex items-center justify-end">
        <span className="text-xl mr-2 text-blue-600">{rating}/10</span>
        <div className="absolute bottom-2 right-2 flex space-x-2">
          <button className="text-gray-400 hover:text-gray-600">
            <RiEditBoxFill className="w-6 h-6" />
          </button>

          <button
            onClick={handleDelete}
            className="text-gray-400 hover:text-gray-600"
          >
            <ImBin className="w-6 h-6" />
          </button>
        </div>
      </div>
    </div>
  );
}
