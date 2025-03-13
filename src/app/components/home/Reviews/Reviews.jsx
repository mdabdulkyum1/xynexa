import React from 'react';
import ReviewCard from './ReviewCard';

const Reviews = () => {
    const reviews = [
        {
            id: 1,
            text: "The cosmetician isn't just about enhancing beauty, but crafting confidence.",
            name: "Jenna Milton",
            role: "Visit Cosmetician",
            image: "https://via.placeholder.com/50"
        },
        {
            id: 2,
            text: "A healthy smile is the best accessory you can wear every day!",
            name: "David Parker",
            role: "Dental Specialist",
            image: "https://via.placeholder.com/50"
        },
        {
            id: 3,
            text: "Mental wellness is not a luxury, it's a necessity for a fulfilling life.",
            name: "Sarah Lee",
            role: "Psychologist",
            image: "https://via.placeholder.com/50"
        },
        {
            id: 4,
            text: "Good nutrition is the foundation of a strong and energetic life.",
            name: "Michael Brown",
            role: "Nutritionist",
            image: "https://via.placeholder.com/50"
        }
    ];
    return (
        <div className="flex flex-wrap justify-center gap-6 p-10">
            {reviews.map((review) => (
                <ReviewCard key={review.id} review={review} />
            ))}
        </div>
    );
};

export default Reviews;