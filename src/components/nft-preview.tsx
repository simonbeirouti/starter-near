"use client";

import Image from "next/image";
import { useState, useEffect, useCallback } from "react";

interface NFTPreviewProps {
  layerFolders: Array<{ id: string; name: string; images: File[]; order: number }>;
}

export function NFTPreview({ layerFolders }: NFTPreviewProps) {
  const [randomLayers, setRandomLayers] = useState<Array<{ url: string; order: number }>>([]);

  const randomizeImages = useCallback(() => {
    // Sort folders by order (lowest order = bottom layer)
    const newLayers = layerFolders.map(folder => {
      const randomIndex = Math.floor(Math.random() * folder.images.length);
      return {
        url: URL.createObjectURL(folder.images[randomIndex]),
        order: folder.order
      };
    });
    
    // Sort layers by order
    setRandomLayers(newLayers.sort((a, b) => a.order - b.order));
  }, [layerFolders]);

  useEffect(() => {
    if (layerFolders.length > 0) {
      randomizeImages();
      const interval = setInterval(randomizeImages, 3000);
      return () => clearInterval(interval);
    }
  }, [layerFolders, randomizeImages]);

  return (
    <div className="relative w-[500px] h-[500px] mx-auto bg-transparent border-gray-300 rounded-md">
      {randomLayers.map((layer, index) => (
        <Image
          key={index}
          src={layer.url}
          alt={`Layer ${layer.order + 1}`}
          width={500}
          height={500}
          className="absolute top-0 left-0 w-full h-full object-contain rounded-md"
          style={{ zIndex: layer.order }} // Ensure proper stacking order
        />
      ))}
    </div>
  );
}
