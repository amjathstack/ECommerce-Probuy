'use client'
import Image from "next/image"
import empty_star from '../../public/icons/empty-star.svg'
import full_star from '../../public/icons/full-star.svg'

export default function RatingStar({ rating, setRating }) {
    return (
        <div className="flex gap-1 mt-3 mb-3">
            <button
                onClick={() => setRating(Prev => Prev === 1 ? 0 : 1)}
                type="button"
            >
                <Image
                    src={rating <= 0 ? empty_star : full_star}
                    className="w-5"
                    alt="star-icon"
                />
            </button>
            <button
                onClick={() => setRating(Prev => Prev === 2 ? 0 : 2)}
                type="button"
            >
                <Image
                    src={rating >= 2 ? full_star : empty_star}
                    className="w-5"
                    alt="star-icon" />
            </button>
            <button
                onClick={() => setRating(Prev => Prev === 3 ? 0 : 3)}
                type="button"
            >
                <Image
                    src={rating >= 3 ? full_star : empty_star}
                    className="w-5"
                    alt="star-icon" />
            </button>
            <button
                onClick={() => setRating(Prev => Prev === 4 ? 0 : 4)}
                type="button"
            >
                <Image
                    src={rating >= 4 ? full_star : empty_star}
                    className="w-5"
                    alt="star-icon" />
            </button>
            <button
                onClick={() => setRating(Prev => Prev === 5 ? 0 : 5)}
                type="button"
            >
                <Image
                    src={rating >= 5 ? full_star : empty_star}
                    className="w-5"
                    alt="star-icon" />
            </button>

        </div>
    )
}