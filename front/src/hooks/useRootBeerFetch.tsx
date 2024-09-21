import { useState, useEffect, useCallback } from "react";
import axios from "axios";
import { RootBeer } from "interfaces";

interface UseRootBeerFetchResult {
  rootBeers: RootBeer[];
  total: number;
  loading: boolean;
  fetchRootBeers: (currentOffset: number) => Promise<void>;
}
const BASE_URL = "http://localhost:4000";

export const useRootBeerFetch = (
  offset: number,
  desc: boolean,
  minRating: number | null,
  maxRating: number | null,
  sort: string,
  name: string, // New parameter for name filtering
  description: string, // New parameter for description filtering
  length: number, // Add length to the hook arguments
): UseRootBeerFetchResult => {
  const [rootBeers, setRootBeers] = useState<RootBeer[]>([]);
  const [total, setTotal] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(true);

  // Memoize the fetchRootBeers function to avoid recreating it on every render
  const fetchRootBeers = useCallback(
    async (currentOffset: number) => {
      setLoading(true);
      try {
        const params: any = { offset: currentOffset, length, desc, sort };
        if (minRating !== null) params.minRating = minRating;
        if (maxRating !== null) params.maxRating = maxRating;
        if (name) params.name = name; // Use name to filter
        if (description) params.description = description; // Use description to filter

        const response = await axios.get(`${BASE_URL}/api/drinks`, { params });
        setRootBeers(response.data.items);
        setTotal(response.data.total);
      } catch (error) {
        console.error("Error fetching root beers:", error);
      } finally {
        setLoading(false);
      }
    },
    [desc, minRating, maxRating, sort, name, description, length], // Add necessary dependencies here
  );

  // Fetch root beers when component mounts or any dependency changes
  useEffect(() => {
    fetchRootBeers(offset);
  }, [offset, fetchRootBeers]);

  return {
    rootBeers,
    total,
    loading,
    fetchRootBeers,
  };
};
