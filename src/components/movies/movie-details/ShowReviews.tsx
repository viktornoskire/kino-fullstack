"use client";
import { useState, useEffect } from "react";

interface ReviewProps {
  userName: string;
  rating: number;
  comment: string;
  createdAt: string;
}

const ShowReviews = ({ movie }: { movie: { slug: string } }) => {
  const [reviews, setReviews] = useState<ReviewProps[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const reviewsPerPage = 3;

  useEffect(() => {
    if (!movie?.slug) return;

    const fetchReviews = async () => {
      try {
        const response = await fetch(`/api/movies/${movie.slug}/reviews`);
        if (!response.ok) throw new Error("Failed to fetch reviews");
        const data = await response.json();
        setReviews(data.reviews);
      } catch (error) {
        console.error(error);
      }
    };

    fetchReviews();
  }, [movie?.slug]);

 
  const indexOfLastReview = currentPage * reviewsPerPage;
  const indexOfFirstReview = indexOfLastReview - reviewsPerPage;
  const currentReviews = reviews.slice(indexOfFirstReview, indexOfLastReview);
  const totalPages = Math.ceil(reviews.length / reviewsPerPage);

  
  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  return (
    <div className="bg-kino-darkgrey p-4 rounded-lg my-10 mx-2 max-w-md">
      <h2 className="text-2xl font-bold mb-4">Reviews</h2>

      {currentReviews.length > 0 ? (
        currentReviews.map((review, index) => (
          <div key={index} className="mb-4 pb-4 border-b border-gray-600">
            <p className="font-bold">{review.userName}</p> - {review.rating}/5
            <p className="mt-1">{review.comment}</p>
            <p className="text-sm text-gray-400">
              {new Date(review.createdAt).toLocaleDateString("sv-SE")}
            </p>
          </div>
        ))
      ) : (
        <p>No reviews yet.</p>
      )}
      
      {reviews.length > reviewsPerPage && (
        <div className="flex justify-between items-center mt-6">
          <button
            onClick={() => paginate(currentPage > 1 ? currentPage - 1 : 1)}
            disabled={currentPage === 1}
            className={`px-4 py-2 rounded-3xl w-29 ${
              currentPage === 1
                ? "bg-kino-darkgrey border-2 border-kino-red cursor-not-allowed"
                : "bg-kino-red hover:bg-kino-darkred"
            }`}
          >
            Previous
          </button>

          <span className="font-medium">
            Page {currentPage} of {totalPages}
          </span>

          <button
            onClick={() =>
              paginate(currentPage < totalPages ? currentPage + 1 : totalPages)
            }
            disabled={currentPage === totalPages}
            className={`px-4 py-2 rounded-3xl w-29 ${
              currentPage === totalPages
                ? "bg-gray-500 cursor-not-allowed"
                : "bg-kino-red hover:bg-red-700"
            }`}
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
};

export default ShowReviews;
