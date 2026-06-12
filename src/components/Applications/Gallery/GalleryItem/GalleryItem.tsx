import { GalleryPhoto } from "api/gallery/useGallery";

interface Props {
  photo: GalleryPhoto;
}

export const GalleryItem = ({ photo }: Props) => {
  return (
    <div className="flex flex-col gap-1">
      <div className="overflow-hidden rounded-md bg-grey aspect-square">
        <img
          src={photo.thumbnailUrl}
          alt={photo.title}
          className="w-full h-full object-cover hover:scale-105 transition-transform duration-200"
        />
      </div>
      <p className="text-xs text-gray-600 truncate text-center" title={photo.title}>
        {photo.title}
      </p>
    </div>
  );
};