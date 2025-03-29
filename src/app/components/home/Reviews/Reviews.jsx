"use client";
import './reviewCard.css'
import { motion } from 'framer-motion'

const Reviews = () => {
    const allReviews = [
        {
            id: 1,
            text: "The cosmetician isn't just about enhancing beauty.",
            name: "Jenna Milton",
            role: "Visit Cosmetician",
            image: "https://i.ibb.co.com/7d6VDp63/young-beautiful-woman-pink-warm-sweater-natural-look-smiling-portrait-isolated-long-hair-285396-896.jpg"
        },
        {
            id: 2,
            text: "A healthy smile is the best accessory you can wear every day!",
            name: "David Parker",
            role: "Dental Specialist",
            image: "https://i.ibb.co.com/JwJWRPGB/young-bearded-man-with-striped-shirt-273609-5677.jpg"
        },
        {
            id: 3,
            text: "Mental wellness is not a luxury, it's a necessity for a fulfilling life.",
            name: "Sarah Lee",
            role: "Psychologist",
            image: "https://i.ibb.co.com/k2kbjWxF/young-beautiful-girl-posing-black-leather-jacket-park-1153-8104.jpg"
        },
        {
            id: 4,
            text: "Good nutrition is the foundation of a strong and energetic life.",
            name: "Michael Brown",
            role: "Nutritionist",
            image: "https://i.ibb.co.com/vjbMNpm/pngtree-african-american-man-expression-png-image-10102288.png"
        }
    ];

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 p-10 bg-gradient-to-t from-purple-100/80 to-gray-100 my-10 lg:my-28">
            {allReviews.map((review) => (
                <motion.div
                    key={review.id}
                    className="p-5 text-center reviews-card rounded-xl border border-white/30 bg-white/10 backdrop-blur-lg shadow-lg"
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, ease: "easeOut" }}
                    whileHover={{
                        scale: 1.05,
                        boxShadow: "0px 10px 20px rgba(0, 0, 0, 0.2)",
                    }}
                    whileTap={{ scale: 0.98 }}
                >
                    <p className="text-gray-700">"{review.text}"</p>
                    <div className="mt-4 flex items-center justify-center gap-3">
                        <img
                            src={review.image}
                            alt={review.name}
                            className="w-12 h-12 rounded-full object-cover"
                        />
                        <div className="text-left">
                            <h4 className="text-lg font-semibold text-primary">{review.name}</h4>
                            <p className="text-sm text-gray-700">{review.role}</p>
                        </div>
                    </div>
                </motion.div>
            ))}
        </div>
    );
};

export default Reviews;
