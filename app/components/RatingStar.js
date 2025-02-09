import { FaRegStar, FaStar } from 'react-icons/fa';

const RatingStar = ({ rating }) => {
    // Create an array of size 5 to represent 5 stars
    const totalStars = 5;

    return (
        <ul className="flex items-center gap-2">
            {Array.from({ length: totalStars }, (_, index) => (
                <li
                    key={index}
                    className="text-xl"
                >
                    {index < rating ? (
                        <FaStar className="text-[#FF9E2C]" /> // Color for filled stars
                    ) : (
                        <FaRegStar className="text-gray-400" /> // Gray color for unfilled stars
                    )}
                </li>
            ))}
        </ul>
    );
};

export default RatingStar;
