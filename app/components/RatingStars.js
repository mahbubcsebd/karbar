import React, { useMemo } from 'react';
// import { FaRegStar, FaStar } from 'react-icons/fa6';

const RatingStars = ({ rating, className = "" }) => {
  // Memoize the stars array to prevent unnecessary re-renders
  const stars = useMemo(() => {
    const totalStars = 5;
    return Array.from({ length: totalStars }).map((_, index) => ({
      filled: index < rating,
      id: index,
    }));
  }, [rating]);

  return (
      <div
          className={`flex items-center gap-1 ${className}`}
          role="img"
          aria-label={`Rating: ${rating} out of 5 stars`}
      >
          {/* {stars.map(({ filled, id }) =>
              filled ? (
                  <IoMdStar
                      key={id}
                      className={`text-xl ${
                          filled ? 'text-[#FF9E2C]' : 'text-gray-400'
                      }`}
                  />
              ) : (
                  <IoMdStarOutline
                      key={id}
                      className="text-xl text-gray-400"
                  />
              )
          )} */}
      </div>
  );
};

export default React.memo(RatingStars);