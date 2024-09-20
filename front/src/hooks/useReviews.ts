import { useEffect, useState } from 'react';
import axios from 'axios';
import { Review, ReviewsResponse } from '../interfaces';

export const useReviews = (id: string, offset: number, length: number) => {
    const [reviews, setReviews] = useState<Review[]>([]);
    const [totalReviews, setTotalReviews] = useState<number>(0);
  
    useEffect(() => {
      const fetchReviews = async () => {
        try {
          const response = await axios.get<ReviewsResponse>(`http://localhost:4000/api/drinks/${id}/reviews`, {
            params: { offset, length },
          });
          setReviews(response.data.items);
          setTotalReviews(response.data.total);
        } catch (error) {
          console.error('Error fetching reviews:', error);
        }
      };
  
      fetchReviews();
    }, [id, offset, length]);
  
    return { reviews, totalReviews };
  };