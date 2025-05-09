'use client';

import { useState } from 'react';
import ImageUpload from '@/components/ImageUpload';
import DimensionInput from '@/components/DimensionInput';
import PosterPreview from '@/components/PosterPreview';

export default function Home() {
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [dimensions, setDimensions] = useState({
    width: 0,
    height: 0,
  });
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  const handleImageUpload = (file: File) => {
    setSelectedImage(file);
    const url = URL.createObjectURL(file);
    setPreviewUrl(url);
  };

  const handleDimensionsChange = (width: number, height: number) => {
    setDimensions({ width, height });
  };

  return (
    <main className="min-h-screen p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold mb-8 text-center">Poster Maker</h1>
        
        <div className="space-y-8">
          <ImageUpload onImageUpload={handleImageUpload} />
          
          {selectedImage && (
            <DimensionInput
              onDimensionsChange={handleDimensionsChange}
              image={selectedImage}
            />
          )}
          
          {previewUrl && dimensions.width > 0 && (
            <PosterPreview
              imageUrl={previewUrl}
              dimensions={dimensions}
            />
          )}
        </div>
      </div>
    </main>
  );
}