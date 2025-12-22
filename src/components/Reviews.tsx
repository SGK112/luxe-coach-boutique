'use client';

import { useState } from 'react';
import { Star, ThumbsUp, CheckCircle, ChevronDown } from 'lucide-react';
import { Review } from '@/types';
import { reviews } from '@/data/products';

interface ReviewsProps {
  productId?: string;
  rating: number;
  reviewCount: number;
}

export default function Reviews({ rating, reviewCount }: ReviewsProps) {
  const [sortBy, setSortBy] = useState('helpful');
  const [showAll, setShowAll] = useState(false);

  const displayedReviews = showAll ? reviews : reviews.slice(0, 3);

  const ratingBreakdown = [
    { stars: 5, count: 120, percentage: 77 },
    { stars: 4, count: 25, percentage: 16 },
    { stars: 3, count: 8, percentage: 5 },
    { stars: 2, count: 2, percentage: 1 },
    { stars: 1, count: 1, percentage: 1 },
  ];

  return (
    <div className="border-t pt-12">
      <h2 className="text-2xl font-light tracking-wider mb-8">
        Customer Reviews
      </h2>

      <div className="grid md:grid-cols-3 gap-8 mb-8">
        {/* Overall Rating */}
        <div className="text-center md:text-left">
          <div className="text-5xl font-light mb-2">{rating}</div>
          <div className="flex items-center justify-center md:justify-start gap-1 mb-2">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                className={`w-5 h-5 ${
                  i < Math.floor(rating)
                    ? 'text-yellow-400 fill-yellow-400'
                    : 'text-gray-300'
                }`}
              />
            ))}
          </div>
          <p className="text-sm text-gray-500">Based on {reviewCount} reviews</p>
        </div>

        {/* Rating Breakdown */}
        <div className="col-span-2">
          {ratingBreakdown.map((item) => (
            <div key={item.stars} className="flex items-center gap-3 mb-2">
              <span className="text-sm w-12">{item.stars} stars</span>
              <div className="flex-1 h-2 bg-gray-100 rounded-full overflow-hidden">
                <div
                  className="h-full bg-yellow-400 rounded-full"
                  style={{ width: `${item.percentage}%` }}
                />
              </div>
              <span className="text-sm text-gray-500 w-12">{item.count}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Sort & Write Review */}
      <div className="flex items-center justify-between mb-6 pb-4 border-b">
        <div className="flex items-center gap-2">
          <span className="text-sm text-gray-500">Sort by:</span>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="text-sm border-none bg-transparent focus:ring-0 cursor-pointer"
          >
            <option value="helpful">Most Helpful</option>
            <option value="recent">Most Recent</option>
            <option value="highest">Highest Rated</option>
            <option value="lowest">Lowest Rated</option>
          </select>
        </div>
        <button className="btn btn-outline text-xs py-2 px-4">
          Write a Review
        </button>
      </div>

      {/* Review List */}
      <div className="space-y-6">
        {displayedReviews.map((review) => (
          <ReviewCard key={review.id} review={review} />
        ))}
      </div>

      {/* Show More */}
      {!showAll && reviews.length > 3 && (
        <button
          onClick={() => setShowAll(true)}
          className="w-full mt-6 py-3 border border-gray-200 text-sm font-medium tracking-wider uppercase hover:bg-gray-50 transition-colors flex items-center justify-center gap-2"
        >
          Show All {reviewCount} Reviews
          <ChevronDown className="w-4 h-4" />
        </button>
      )}
    </div>
  );
}

function ReviewCard({ review }: { review: Review }) {
  const [helpful, setHelpful] = useState(false);

  return (
    <div className="pb-6 border-b last:border-0">
      <div className="flex items-start justify-between mb-3">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <div className="flex">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={`w-4 h-4 ${
                    i < review.rating
                      ? 'text-yellow-400 fill-yellow-400'
                      : 'text-gray-300'
                  }`}
                />
              ))}
            </div>
            {review.verified && (
              <span className="flex items-center gap-1 text-xs text-green-600">
                <CheckCircle className="w-3 h-3" />
                Verified Purchase
              </span>
            )}
          </div>
          <h4 className="font-medium">{review.title}</h4>
        </div>
        <span className="text-sm text-gray-500">
          {new Date(review.date).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
          })}
        </span>
      </div>

      <p className="text-gray-600 text-sm leading-relaxed mb-3">{review.content}</p>

      <div className="flex items-center justify-between">
        <span className="text-sm text-gray-500">— {review.author}</span>
        <button
          onClick={() => setHelpful(!helpful)}
          className={`flex items-center gap-1.5 text-sm ${
            helpful ? 'text-black' : 'text-gray-500 hover:text-black'
          } transition-colors`}
        >
          <ThumbsUp className={`w-4 h-4 ${helpful ? 'fill-current' : ''}`} />
          Helpful ({helpful ? review.helpful + 1 : review.helpful})
        </button>
      </div>
    </div>
  );
}
