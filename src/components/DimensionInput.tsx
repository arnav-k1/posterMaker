import { useState, useEffect } from 'react';

interface DimensionInputProps {
  onDimensionsChange: (width: number, height: number) => void;
  image: File;
}

export default function DimensionInput({ onDimensionsChange, image }: DimensionInputProps) {
  const [width, setWidth] = useState<number>(0);
  const [height, setHeight] = useState<number>(0);
  const [aspectRatio, setAspectRatio] = useState<number>(1);

  useEffect(() => {
    const img = new Image();
    img.onload = () => {
      setAspectRatio(img.width / img.height);
    };
    img.src = URL.createObjectURL(image);
  }, [image]);

  const handleWidthChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newWidth = Number(e.target.value);
    setWidth(newWidth);
    setHeight(newWidth / aspectRatio);
    onDimensionsChange(newWidth, newWidth / aspectRatio);
  };

  const handleHeightChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newHeight = Number(e.target.value);
    setHeight(newHeight);
    setWidth(newHeight * aspectRatio);
    onDimensionsChange(newHeight * aspectRatio, newHeight);
  };

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-semibold">Enter Poster Dimensions</h2>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium mb-1">Width (inches)</label>
          <input
            type="number"
            value={width}
            onChange={handleWidthChange}
            className="w-full p-2 border rounded"
            min="0"
            step="0.1"
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Height (inches)</label>
          <input
            type="number"
            value={height}
            onChange={handleHeightChange}
            className="w-full p-2 border rounded"
            min="0"
            step="0.1"
          />
        </div>
      </div>
    </div>
  );
}