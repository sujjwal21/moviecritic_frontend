import AddMovieForm from "./AddMovieForm";
import AddReviewForm from "./AddReviewForm";
import { useNavigate } from "react-router-dom";

export default function Navbar() {
  const navigate = useNavigate();
  return (
    <div className="flex justify-between items-center bg-gray-300 p-4">
      <span
        className="font-bold text-black hover:cursor-pointer"
        onClick={() => {
          navigate("/");
        }}
      >
        MOVIECRITIC
      </span>
      <div className="flex">
        <div className="mr-3">
          <AddMovieForm onClose={() => {}} />
        </div>
        <AddReviewForm />
      </div>
    </div>
  );
}
