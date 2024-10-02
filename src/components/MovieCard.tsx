import { Link } from "react-router-dom";
import { ImBin } from "react-icons/im";
import { RiEditBoxFill } from "react-icons/ri";
import { useMovieList } from "../store/movies";
import axios from "axios";
import { useState } from "react";
import AddMovieForm from "./AddMovieForm"; // Import AddMovieForm

export default function MovieCard({
  id,
  title,
  date,
  rating,
}: {
  id: string;
  title: string;
  date: string;
  rating: number;
}) {
  const { movies, setMovies } = useMovieList();
  const [showEditForm, setShowEditForm] = useState(false);

  const handleDelete = async (movieId: string) => {
    try {
      await axios.delete(`${process.env.REACT_APP_API_URL}/movies/${movieId}`);
      setMovies(movies.filter((movie) => movie._id !== movieId));
    } catch (error) {
      console.error("Failed to delete movie", error);
    }
  };

  return (
    <div className="relative bg-slate-300 p-6 space-y-3 border-2 shadow-md hover:shadow-lg">
      <Link to={`/movies/${id}`}>
        <h2 className="text-2xl text-custom-black">{title}</h2>
        <p className="text-lg italic text-gray-700">Released: {date}</p>
        <p className="text-lg font-bold text-gray-700">Rating: {rating}/10</p>
      </Link>

      <div className="absolute bottom-2 right-2 flex space-x-2">
        <button
          onClick={(e) => {
            e.stopPropagation(); // Stop event bubbling
            setShowEditForm(true); // Show edit form
          }}
          className="text-gray-600 hover:text-gray-800"
        >
          <RiEditBoxFill className="w-6 h-6" />
        </button>

        <button
          onClick={(e) => {
            e.stopPropagation(); // Stop event bubbling
            handleDelete(id); // Trigger delete action
          }}
          className="text-gray-600 hover:text-gray-800"
        >
          <ImBin className="w-6 h-6" />
        </button>
      </div>

      {showEditForm && (
        <AddMovieForm
          movie={{ id, name: title, releaseDate: date }}
          onClose={() => setShowEditForm(false)}
        />
      )}
    </div>
  );
}
