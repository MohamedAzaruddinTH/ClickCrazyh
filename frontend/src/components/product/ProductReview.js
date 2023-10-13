import { useSelector } from "react-redux";

export default function ProductReview({ reviews }) {
  const darkMode = useSelector((state) => state.darkmode);

  return (
    <div className="w-3/4 mx-auto mt-8 font-montserrat">
      <h3 classNameName="text-lg ">Other's Reviews:</h3>
      <hr className="my-2 border-t-2 border-gray-400" />
      {reviews &&
        reviews.map((review) => (
          <div key={review._id} className="my-4">
            <div className="flex items-center mb-2">
              <div className="flex items-center">
                {[1, 2, 3, 4, 5].map((star) => (
                  <span
                    key={star}
                    className={`text-xl ${
                      star <= review.rating
                        ? "text-yellow-400"
                        : "text-pale-blue"
                    }`}
                  >
                    ★
                  </span>
                ))}
              </div>
              <p
                className={`ml-2 text-md text-${
                  darkMode ? "gray-300" : "stone-900"
                } font-semibold`}
              >
                by {review.user ? review.user.name : "Unknown User"}
              </p>
            </div>
            <p className={`text-md text-${darkMode ? "white" : "gray-900"}`}>
              {review.comment}
            </p>
            <hr className="my-2 border-t-2 border-gray-400" />
          </div>
        ))}
    </div>
  );
}
