import { NewsItem as NewsItemType } from "@api/news/useNews";

interface Props {
  item: NewsItemType;
}

export const NewsItem = ({ item }: Props) => {
  return (
    <div className="flex flex-col gap-1 p-3 border border-grey rounded-md bg-white">
      <span className="text-sm font-bold text-gray-800 capitalize">
        {item.name}
      </span>
      <span className="text-xs text-blue-500">
        {item.email}
      </span>
      <p className="text-xs text-gray-600 leading-relaxed">
        {item.body}
      </p>
    </div>
  );
};