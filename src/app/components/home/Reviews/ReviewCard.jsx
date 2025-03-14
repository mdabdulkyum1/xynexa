import PropTypes from 'prop-types';

const ReviewCard = ({review}) => {
    return (
        <div className="bg-white shadow-md rounded-xl p-5 w-80 text-center">
        <p className="text-gray-700 italic">"{review.text}"</p>
        <div className="mt-4 flex items-center justify-center gap-3">
          <img
            src={review.image}
            alt={review.name}
            className="w-12 h-12 rounded-full object-cover"
          />
          <div className="text-left">
            <h4 className="text-base font-semibold">{review.name}</h4>
            <p className="text-xs text-gray-500">{review.role}</p>
          </div>
        </div>
      </div>
    );
};

ReviewCard.propTypes = {
    
};

export default ReviewCard;