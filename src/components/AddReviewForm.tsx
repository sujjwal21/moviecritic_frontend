import React, { useRef, useState } from "react";
import axios from "axios";
import MoviesDropdown from "./MoviesDropdown";

function AddReviewForm() {
  const [selectedMovie, setSelectedMovie] = useState("");
  const [showModal, setShowModal] = useState(false);
  const formRef = useRef<HTMLFormElement>(null);

  const openModal = () => setShowModal(true);
  const closeModal = () => setShowModal(false);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const formData = new FormData(formRef.current!);
    const name = formData.get("name") as string;
    const rating = formData.get("rating") as string;
    const review = formData.get("review") as string;

    try {
      await axios.post(
        `${process.env.REACT_APP_API_URL}/movies/${selectedMovie}/reviews`,
        {
          name,
          rating,
          review,
        }
      );
    } catch (error) {
      console.error("Failed to add review", error);
    } finally {
      closeModal();
    }
  };

  return (
    <>
      <button
        onClick={openModal}
        className="bg-blue-600 text-white font-medium px-4 py-2 rounded"
      >
        Add new review
      </button>
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white rounded-lg shadow border border-gray-200 px-8 py-8 w-[400px] relative">
            <button
              className="absolute top-2 right-2 text-black rounded-full h-6 w-6 flex items-center justify-center text-xl font-bold"
              onClick={closeModal}
            >
              &times;
            </button>
            <h2 className="text-2xl font-bold mb-6 text-black">
              Add New Review
            </h2>
            <form
              ref={formRef}
              className="flex flex-col space-y-4"
              onSubmit={handleSubmit}
            >
              <MoviesDropdown onChange={setSelectedMovie} />
              <input
                type="text"
                id="name"
                name="name"
                placeholder="Your name"
                className="px-4 py-2 rounded border border-gray-300 focus:border-blue-500 focus:ring focus:ring-blue-500"
              />
              <input
                type="number"
                min={1}
                max={10}
                id="rating"
                name="rating"
                placeholder="Rating out of 10"
                className="px-4 py-2 rounded border border-gray-300 focus:border-blue-500 focus:ring focus:ring-blue-500"
              />
              <textarea
                id="review"
                name="review"
                placeholder="Review comments"
                className="px-4 py-2 rounded border border-gray-300 focus:border-blue-500 focus:ring focus:ring-blue-500"
              ></textarea>
              <button
                type="submit"
                className="self-end inline-block px-4 py-2 rounded bg-blue-600 text-white font-bold"
              >
                Add review
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  );
}

export default AddReviewForm;
