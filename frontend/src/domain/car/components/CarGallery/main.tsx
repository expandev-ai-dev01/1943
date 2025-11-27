import { useState } from 'react';
import { cn } from '@/core/lib/utils';
import { Dialog, DialogContent } from '@/core/components/dialog';
import { Button } from '@/core/components/button';
import { Maximize2Icon, ChevronLeftIcon, ChevronRightIcon } from 'lucide-react';
import type { CarGalleryProps } from './types';

function CarGallery({ photos, mainPhoto, altText }: CarGalleryProps) {
  const [currentPhoto, setCurrentPhoto] = useState(mainPhoto);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);

  const allPhotos = [mainPhoto, ...photos.filter((p) => p !== mainPhoto)];

  const handleThumbnailClick = (photo: string) => {
    setCurrentPhoto(photo);
  };

  const openLightbox = () => {
    const index = allPhotos.indexOf(currentPhoto);
    setLightboxIndex(index !== -1 ? index : 0);
    setLightboxOpen(true);
  };

  const nextPhoto = () => {
    setLightboxIndex((prev) => (prev + 1) % allPhotos.length);
  };

  const prevPhoto = () => {
    setLightboxIndex((prev) => (prev - 1 + allPhotos.length) % allPhotos.length);
  };

  return (
    <div className="space-y-4">
      <div className="bg-muted group relative aspect-video w-full overflow-hidden rounded-lg">
        <img
          src={currentPhoto}
          alt={altText}
          className="h-full w-full cursor-pointer object-cover transition-transform duration-300 hover:scale-105"
          onClick={openLightbox}
        />
        <Button
          variant="secondary"
          size="icon"
          className="absolute bottom-4 right-4 opacity-0 transition-opacity group-hover:opacity-100"
          onClick={openLightbox}
        >
          <Maximize2Icon className="size-4" />
        </Button>
      </div>

      <div className="flex gap-2 overflow-x-auto pb-2">
        {allPhotos.map((photo, index) => (
          <button
            key={index}
            className={cn(
              'relative aspect-video w-24 shrink-0 overflow-hidden rounded-md border-2 transition-all',
              currentPhoto === photo
                ? 'border-primary ring-primary/20 ring-2'
                : 'border-transparent opacity-70 hover:opacity-100'
            )}
            onClick={() => handleThumbnailClick(photo)}
          >
            <img
              src={photo}
              alt={`${altText} thumbnail ${index + 1}`}
              className="h-full w-full object-cover"
            />
          </button>
        ))}
      </div>

      <Dialog open={lightboxOpen} onOpenChange={setLightboxOpen}>
        <DialogContent className="max-w-screen-lg border-none bg-transparent p-0 shadow-none">
          <div className="relative flex h-[80vh] w-full items-center justify-center">
            <img
              src={allPhotos[lightboxIndex]}
              alt={altText}
              className="max-h-full max-w-full object-contain"
            />
            <Button
              variant="ghost"
              size="icon"
              className="absolute left-2 top-1/2 -translate-y-1/2 text-white hover:bg-white/20"
              onClick={prevPhoto}
            >
              <ChevronLeftIcon className="size-8" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="absolute right-2 top-1/2 -translate-y-1/2 text-white hover:bg-white/20"
              onClick={nextPhoto}
            >
              <ChevronRightIcon className="size-8" />
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export { CarGallery };
