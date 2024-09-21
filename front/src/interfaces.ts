interface PictureObject {
  id: number;
  name: string;
  mimetype: string;
  path: string;
  createdAt: string;
  updatedAt: string;
}

export interface Review {
  id: number;
  user_name: string;
  description: string;
  rating: number;
  createdAt: string;
  updatedAt: string;
}

export interface RootBeer {
  id: number;
  name: string;
  description: string;
  Pictures: PictureObject[];
}

export interface ReviewsResponse {
  items: Review[];
  total: number;
}
