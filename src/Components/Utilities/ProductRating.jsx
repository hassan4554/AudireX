import { FaStar } from "react-icons/fa"
const Star = () => <span><FaStar /></span>;

export const ProductRating = ({ rateCount }) => {
    const stars = [...Array(rateCount)];
    return (
        <div className="stars">
            {stars.map((_, index) => (
                <Star key={index} />
            ))}
        </div>
    );
};