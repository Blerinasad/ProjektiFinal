import { useGallery } from "@api/gallery/useGallery";
import { HandleRequestState } from "@components/shared/HandleRequestState/HandleRequestState";
import Spinner from "@components/shared/Spinner/Spinner";
import { GalleryItem } from "./GalleryItem/GalleryItem";

export const Gallery = () => {
  const { data, isLoading, isError } = useGallery();

  return (
    <div className="flex flex-col flex-1 max-h-full px-6 overflow-y-auto gap-3 py-4">
      <h1 className="w-full text-4xl font-bold text-left">Gallery</h1>

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
              <p className="text-red-500">Failed to load photos. Please try again.</p>
            </div>
          }
        >
          <div className="grid grid-cols-3 gap-3">
            {data?.map((photo) => (
              <GalleryItem key={photo.id} photo={photo} />
            ))}
          </div>
        </HandleRequestState>
      </HandleRequestState>
    </div>
  );
};