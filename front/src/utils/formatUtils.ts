export const getImageUrl = (path: string): string => {
    const BASE_URL = 'http://localhost:4000';
    return `${BASE_URL}/${path}`;
  };
  
  export const calculateTotalPages = (total: number, length: number): number => {
    return Math.ceil(total / length);
  };
  