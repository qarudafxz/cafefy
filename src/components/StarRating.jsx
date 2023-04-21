import React, { useState } from "react";
import { FaStar } from "react-icons/fa";

const StarRating = ({ rating, setRating, disabled = false, ...rest }) => {
  const [hover, setHover] = useState(null);

  return (
    <div className="flex space-x-2 items-center">
      {[...Array(5)].map((star, i) => {
        const ratingValue = i + 1;
        let color;
        if (!disabled) {
          if (hover) {
            color =
              ratingValue <= (hover || rating)
                ? "text-yellow-400"
                : "text-gray-200";
          } else {
            color =
              ratingValue <= (hover || rating)
                ? "text-primary"
                : "text-gray-200";
          }
        } else {
          color = "text-gray-200 opacity-40";
        }
        return (
          <label
            key={i}
            className="transform transition hover:scale-125 ease-in-out"
          >
            <input
              type="radio"
              name="rating"
              className="hidden"
              value={ratingValue}
              disabled={disabled}
              onClick={() => setRating(ratingValue)}
            />
            <FaStar
              className={
                `${
                  !disabled && "active:text-yellow-300"
                }  cursor-pointer transition ease-in-out ` + color
              }
              size="2.5em"
              onMouseEnter={() => setHover(ratingValue)}
              onMouseLeave={() => setHover(null)}
            />
          </label>
        );
      })}
    </div>
  );
};

export default StarRating;