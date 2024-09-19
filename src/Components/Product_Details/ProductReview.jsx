import Reviews from '../Utilities/ReviewsData';
import './ProductReview.css'
import { FaStar } from "react-icons/fa"

const ProductReview = () => {
  const Star = () => <span><FaStar /></span>;

  const ProductRating = ({ rateCount }) => {
    const stars = [...Array(rateCount)];
    return (
      <div className="rating-stars">
        {stars.map((_, index) => (
          <Star key={index} />
        ))}
      </div>
    );
  };

  return (
    <div className='reviews-container'>

      {
        Reviews.map((review) => {
          return (
            <div className="review" key={review.id}>
              <div className="review-div-1">
                <figure className="review-figure">
                  <img className="review-img" src="https://www.pngitem.com/pimgs/m/150-1503945_transparent-user-png-default-user-image-png-png.png" alt="User Image" />
                </figure>
                <div className="review-details">
                  <div className="review-name">{review.name}</div>
                  <div className="ratings">
                    <div className="rating-count"><ProductRating rateCount={review.rateCount} /></div>
                    <div className='slash'>|</div>
                    <div className="rating-date">{review.date}</div>
                  </div>
                </div>
              </div>
              <div className="review-div-2">
                {review.review}
              </div>
            </div>
          )
        })
      }
    </div>
  )
}

export default ProductReview
