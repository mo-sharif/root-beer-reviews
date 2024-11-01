// hooks/useRootBeerDetails.ts
import { useEffect, useState } from "react";
import axios from "axios";
import { RootBeer } from "interfaces";

export const useRootBeerDetails = (id: string, refreshFlag: boolean) => {
  const [rootBeer, setRootBeer] = useState<RootBeer | null>(null);

  useEffect(() => {
    const fetchRootBeer = async () => {
      try {
        const response = await axios.get<RootBeer>(
          `http://localhost:4000/api/drinks/${id}`,
        );
        setRootBeer(response.data);
      } catch (error) {
        console.error("Error fetching root beer:", error);
      }
    };

    fetchRootBeer();
  }, [id, refreshFlag]); // Depend on both id and refreshFlag

  return rootBeer;
};
