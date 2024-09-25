import React, { useState } from "react";
import { FaStar } from "react-icons/fa";

function RatingReview({ rating, setRating }) {
    const [hoveredStar, setHoveredStar] = useState(null);
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
                        onClick={() => setRating(rating === star ? 0 : star)}
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