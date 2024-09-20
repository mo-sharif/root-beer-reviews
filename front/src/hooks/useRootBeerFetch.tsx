import { useState, useEffect, useCallback } from 'react';
import axios from 'axios';

interface Picture {
  id: number;
  name: string;
  mimetype: string;
  path: string;
  createdAt: string;
  updatedAt: string;
}

interface RootBeer {
  id: number;
  name: string;
  description: string;
  Pictures: Picture[];
  reviewAverageRating?: number;
}

interface PaginatedResponse {
  items: RootBeer[];
  total: number;
}

export const useRootBeerFetch = (
  offset: number, 
  desc: boolean, 
  minRating: number | null, 
  maxRating: number | null, 
  sort: string, 
  searchTerm: string // Include searchTerm as a dependency
) => {
  const [rootBeers, setRootBeers] = useState<RootBeer[]>([]);
  const [total, setTotal] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(false);
  const BASE_URL = 'http://localhost:4000';

  const fetchRootBeers = useCallback(
    async (currentOffset: number) => {
      setLoading(true);
      try {
        const params: any = { offset: currentOffset, length: 10, desc, sort };
        if (minRating !== null) params.minRating = minRating;
        if (maxRating !== null) params.maxRating = maxRating;
        if (searchTerm) params.name = searchTerm; // Include search term in the request

        const response = await axios.get<PaginatedResponse>(`${BASE_URL}/api/drinks`, { params });
        setRootBeers(response.data.items);
        setTotal(response.data.total);
      } catch (error) {
        console.error('Error fetching root beers:', error);
      } finally {
        setLoading(false);
      }
    },
    [desc, minRating, maxRating, sort, searchTerm] // Add searchTerm to dependencies
  );

  useEffect(() => {
    const handler = setTimeout(() => {
      fetchRootBeers(offset); // Trigger fetch after 300ms delay
    }, 300); // Debounce time of 300ms

    return () => {
      clearTimeout(handler); // Clear timeout if searchTerm changes before 300ms
    };
  }, [fetchRootBeers, offset, searchTerm]); // Re-run effect when searchTerm changes

  return { rootBeers, total, loading, fetchRootBeers };
};