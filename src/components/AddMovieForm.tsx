import React, { useRef, useState, useEffect } from "react";
import axios from "axios";
import { useMovieList } from "../store/movies";

interface Movie {
  id?: string;
  name: string;
  releaseDate: string;
}

interface AddMovieFormProps {
  movie?: Movie;
  onClose: () => void;
}

function AddMovieForm({ movie, onClose }: AddMovieFormProps) {
  const [showModal, setShowModal] = useState(false);
  const { movies, setMovies } = useMovieList();
  console.log("edit form movie", movie);

  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    if (movie) {
      if (formRef.current) {
        const nameInput = formRef.current.elements.namedItem(
          "name"
        ) as HTMLInputElement;
        const releaseDateInput = formRef.current.elements.namedItem(
          "releaseDate"
        ) as HTMLInputElement;

        nameInput.value = movie.name;
        releaseDateInput.value = movie.releaseDate;
      }
    }
  }, [movie]);

  const openModal = () => setShowModal(true);
  const closeModal = () => {
    setShowModal(false);
    onClose();
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const formData = new FormData(formRef.current!);
    const name = formData.get("name") as string;
    const releaseDate = formData.get("releaseDate") as string;

    try {
      let response;
      if (movie) {
        response = await axios.put(
          `${process.env.REACT_APP_API_URL}/movies/${movie.id}`,
          {
            name,
            releaseDate,
          }
        );
        window.location.reload();
      } else {
        response = await axios.post(`${process.env.REACT_APP_API_URL}/movies`, {
          name,
          releaseDate,
        });
      }

      setMovies([response.data, ...movies]);
    } catch (error) {
      console.error("Failed to save movie", error);
    } finally {
      closeModal();
    }
  };

  return (
    <>
      <button
        onClick={openModal}
        className="bg-white text-blue-600 font-medium px-4 py-2 rounded border border-blue-600"
      >
        {movie ? "Edit movie" : "Add new movie"}
      </button>
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white rounded-lg shadow-lg border border-gray-200 px-8 py-8 w-[400px] relative">
            <button
              className="absolute top-2 right-2 text-black rounded-full h-6 w-6 flex items-center justify-center text-xl font-bold"
              onClick={closeModal}
            >
              &times;
            </button>
            <h2 className="text-2xl font-bold mb-6 text-black">
              {movie ? "Edit Movie" : "Add New Movie"}
            </h2>
            <form
              ref={formRef}
              className="flex flex-col space-y-4"
              onSubmit={handleSubmit}
            >
              <input
                type="text"
                id="name"
                name="name"
                placeholder={movie ? movie.name : "Name"}
                className="px-4 py-2 rounded border border-gray-300 focus:border-blue-500 focus:ring focus:ring-blue-500"
                required
              />
              <input
                type="date"
                id="releaseDate"
                name="releaseDate"
                placeholder="Release Date"
                className="px-4 py-2 rounded border border-gray-300 focus:border-blue-500 focus:ring focus:ring-blue-500"
                required
              />
              <button
                type="submit"
                className="self-end inline-block px-4 py-2 rounded bg-blue-600 text-white font-bold"
              >
                {movie ? "Update movie" : "Create movie"}
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  );
}

export default AddMovieForm;
