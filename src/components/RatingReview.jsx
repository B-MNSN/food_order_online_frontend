import React, { useState } from "react";
import { FaStar } from "react-icons/fa";

function RatingReview({ rating, setRating, onRatingClick  }) {
    const [hoveredStar, setHoveredStar] = useState(null);

    const handleStarClick = (star) => {
        if (onRatingClick()) {
            setRating(rating === star ? 0 : star);
        }
    };
    return (
        <div>
            {[1, 2, 3, 4, 5].map((star) => {
                return (
                    <FaStar
                        key={star}
                        className='start'
                        fill={hoveredStar >= star || rating >= star ? '#f3b15a' : '#ddd'}
                        style={{
                            cursor: 'pointer',
                            fontSize: '1.75rem',
                            margin: '0 0.2rem'
                        }}
                        onClick={() => setRating(handleStarClick)}
                        onMouseEnter={() => setHoveredStar(star)}
                        onMouseLeave={() => setHoveredStar(null)}
                    >
                    </FaStar>
                )
            })}
        </div>
    );
}

export default RatingReview;