import { useQuery } from "@tanstack/react-query";
import { apiRequest } from "@api/Api";

export interface NewsItem {
  postId: number;
  id: number;
  name: string;
  email: string;
  body: string;
}

const fetchNews = async (): Promise<NewsItem[]> => {
  const response = await apiRequest<{}, NewsItem[]>({
    url: "comments?_limit=10",
    method: "GET",
  });
  return response.data;
};

export const useNews = () => {
  return useQuery({
    queryKey: ["news"],
    queryFn: fetchNews,
  });
};