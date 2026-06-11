import { useNews } from "@api/news/useNews";
import { HandleRequestState } from "@components/shared/HandleRequestState/HandleRequestState";
import Spinner from "@components/shared/Spinner/Spinner";
import { NewsItem } from "./NewsItem/NewsItem";

export const News = () => {
  const { data, isLoading, isError } = useNews();

  return (
    <div className="flex flex-col flex-1 max-h-full px-6 overflow-y-auto gap-3 py-4">
      <h1 className="w-full text-4xl font-bold text-left">News</h1>

      <HandleRequestState
        state={isLoading}
        placeholder={
          <div className="flex justify-center items-center flex-1">
            <Spinner />
          </div>
        }
      >
        <HandleRequestState
          state={isError}
          placeholder={
            <div className="flex justify-center items-center flex-1">
              <p className="text-red-500">Failed to load news. Please try again.</p>
            </div>
          }
        >
          <div className="flex flex-col gap-2">
            {data?.map((item) => (
              <NewsItem key={item.id} item={item} />
            ))}
          </div>
        </HandleRequestState>
      </HandleRequestState>
    </div>
  );
};