import { useQuery } from "@tanstack/react-query";
import { apiRequest } from "@api/Api";

export interface GalleryPhoto {
  albumId: number;
  id: number;
  title: string;
  url: string;
  thumbnailUrl: string;
}

const fetchGallery = async (): Promise<GalleryPhoto[]> => {
  const response = await apiRequest<{}, GalleryPhoto[]>({
    url: "photos?_limit=12",
    method: "GET",
  });
  return response.data;
};

export const useGallery = () => {
  return useQuery({
    queryKey: ["gallery"],
    queryFn: fetchGallery,
  });
};