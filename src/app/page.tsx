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
        <h1 className="text-4xl font-bold mb-4 text-center">Poster Maker</h1>
        
        <div className="bg-blue-50 p-4 rounded-lg mb-8">
          <h2 className="text-lg font-semibold mb-2">Quick Instructions:</h2>
          <ol className="list-decimal list-inside space-y-1 text-sm">
            <li>Upload your image</li>
            <li>Enter desired dimensions in inches</li>
            <li>Preview how it will be split into A4 pages</li>
            <li>Download and print the PDF</li>
            <li>Cut and assemble the pages</li>
          </ol>
        </div>
        
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

        <div className="mt-8 text-center text-gray-600">
          <p>I don't drink coffee, buy me a chocolate milk</p>
          <p className="font-semibold">Venmo: @arnav-k</p>
        </div>
      </div>
    </main>
  );
}