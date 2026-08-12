"use client";

import { useState } from "react";
import Image from "next/image";

export default function ProductGallery({ images = [], title = "" }) {
  const [selectedImage, setSelectedImage] = useState(images[0] || "/placeholder.png");

  return (
    <div className="flex flex-col-reverse sm:flex-row gap-4">
      {/* Thumbnail List */}
      {images.length > 1 && (
        <div className="flex sm:flex-col gap-3 overflow-x-auto sm:overflow-y-auto max-h-115 scrollbar-none">
          {images.map((img, idx) => (
            <button
              key={idx}
              onClick={() => setSelectedImage(img)}
              className={`relative w-16 h-16 sm:w-20 sm:h-20 shrink-0 rounded-xl overflow-hidden bg-gray-50 border-2 transition-all ${
                selectedImage === img
                  ? "border-accent shadow-md scale-95"
                  : "border-gray-200 hover:border-gray-300 opacity-70 hover:opacity-100"
              }`}
            >
              <Image src={img} alt={`${title} view ${idx}`} fill className="object-contain p-1" />
            </button>
          ))}
        </div>
      )}

      {/* Main Image Stage */}
      <div className="relative flex-1 aspect-square sm:h-115 bg-gray-50 rounded-2xl overflow-hidden border border-gray-200/80 shadow-xs flex items-center justify-center p-6">
        <Image
          src={selectedImage}
          alt={title}
          fill
          priority
          sizes="(max-width: 768px) 100vw, 50vw"
          className="object-contain p-4 transition-all duration-300 hover:scale-105"
        />
      </div>
    </div>
  );
}