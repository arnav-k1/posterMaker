import { useEffect, useRef, useState } from 'react';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

interface PosterPreviewProps {
  imageUrl: string;
  dimensions: {
    width: number;
    height: number;
  };
}

export default function PosterPreview({ imageUrl, dimensions }: PosterPreviewProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const gridCanvasRef = useRef<HTMLCanvasElement>(null);
  const [savedImage, setSavedImage] = useState<string | null>(null);
  const [downloadComplete, setDownloadComplete] = useState(false);
  const [fileName, setFileName] = useState('poster');

  // Convert inches to pixels (assuming 100 DPI)
  const inchesToPixels = (inches: number) => inches * 100;

  useEffect(() => {
    const img = new Image();
    img.onload = () => {
      const canvas = canvasRef.current;
      if (!canvas) return;

      const ctx = canvas.getContext('2d');
      if (!ctx) return;

      // Set canvas size to match the poster dimensions in pixels
      canvas.width = inchesToPixels(dimensions.width);
      canvas.height = inchesToPixels(dimensions.height);

      // Draw the image
      ctx.drawImage(img, 0, 0, canvas.width, canvas.height);

      // Draw the grid on a separate canvas
      const gridCanvas = gridCanvasRef.current;
      if (!gridCanvas) return;

      const gridCtx = gridCanvas.getContext('2d');
      if (!gridCtx) return;

      // Set grid canvas size to match the main canvas
      gridCanvas.width = canvas.width;
      gridCanvas.height = canvas.height;

      // Clear the grid canvas first
      gridCtx.clearRect(0, 0, gridCanvas.width, gridCanvas.height);

      // Draw grid lines with increased opacity and line width
      gridCtx.strokeStyle = 'rgba(255, 0, 0, 0.8)'; // Increased opacity
      gridCtx.lineWidth = 3; // Increased line width

      // Letter dimensions in inches
      const letterWidth = 8.5; // Letter width
      const letterHeight = 11; // Letter height

      // Draw vertical lines
      for (let x = 0; x < dimensions.width; x += letterWidth) {
        gridCtx.beginPath();
        gridCtx.moveTo(inchesToPixels(x), 0);
        gridCtx.lineTo(inchesToPixels(x), gridCanvas.height);
        gridCtx.stroke();
      }

      // Draw horizontal lines
      for (let y = 0; y < dimensions.height; y += letterHeight) {
        gridCtx.beginPath();
        gridCtx.moveTo(0, inchesToPixels(y));
        gridCtx.lineTo(gridCanvas.width, inchesToPixels(y));
        gridCtx.stroke();
      }
    };
    img.src = imageUrl;
  }, [imageUrl, dimensions]);

  const handleSaveImage = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const dataUrl = canvas.toDataURL('image/png');
    setSavedImage(dataUrl);

    const link = document.createElement('a');
    link.download = 'poster-template.png';
    link.href = dataUrl;
    link.click();
  };

  const handleDownload = async () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    // Letter dimensions in inches
    const letterWidth = 8.5;
    const letterHeight = 11;

    // Calculate number of pages needed
    const totalPagesX = Math.ceil(dimensions.width / letterWidth);
    const totalPagesY = Math.ceil(dimensions.height / letterHeight);

    // Create a new PDF
    const pdf = new jsPDF('p', 'in', 'letter');

    // Create a temporary canvas for each page
    const tempCanvas = document.createElement('canvas');
    const tempCtx = tempCanvas.getContext('2d');
    if (!tempCtx) return;

    // Set temporary canvas size to Letter dimensions in pixels
    tempCanvas.width = inchesToPixels(letterWidth);
    tempCanvas.height = inchesToPixels(letterHeight);

    for (let y = 0; y < totalPagesY; y++) {
      for (let x = 0; x < totalPagesX; x++) {
        // Fill the canvas with white background
        tempCtx.fillStyle = 'white';
        tempCtx.fillRect(0, 0, tempCanvas.width, tempCanvas.height);

        // Calculate the source rectangle
        const sourceX = x * inchesToPixels(letterWidth);
        const sourceY = y * inchesToPixels(letterHeight);
        const sourceWidth = Math.min(
          inchesToPixels(letterWidth),
          inchesToPixels(dimensions.width) - sourceX
        );
        const sourceHeight = Math.min(
          inchesToPixels(letterHeight),
          inchesToPixels(dimensions.height) - sourceY
        );

        // Calculate the destination dimensions to maintain aspect ratio
        const aspectRatio = sourceWidth / sourceHeight;
        let destWidth = tempCanvas.width;
        let destHeight = tempCanvas.width / aspectRatio;

        // If the height is too large, scale based on height instead
        if (destHeight > tempCanvas.height) {
          destHeight = tempCanvas.height;
          destWidth = tempCanvas.height * aspectRatio;
        }

        // Position the image at the top-left of the page
        const destX = 0;
        const destY = 0;

        // Draw the portion of the image to the temporary canvas
        tempCtx.drawImage(
          canvas,
          sourceX,
          sourceY,
          sourceWidth,
          sourceHeight,
          destX,
          destY,
          destWidth,
          destHeight
        );

        // Convert the temporary canvas to an image
        const imgData = tempCanvas.toDataURL('image/jpeg', 1.0);

        // Add the image to the PDF
        if (x === 0 && y === 0) {
          pdf.addImage(imgData, 'JPEG', 0, 0, letterWidth, letterHeight);
        } else {
          pdf.addPage();
          pdf.addImage(imgData, 'JPEG', 0, 0, letterWidth, letterHeight);
        }
      }
    }

    // Save the PDF
    pdf.save(`${fileName}.pdf`);
    setDownloadComplete(true);
    
    // Reset the download complete message after 3 seconds
    setTimeout(() => {
      setDownloadComplete(false);
    }, 3000);
  };

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-semibold">Poster Preview</h2>
      <div className="border rounded-lg p-4 overflow-auto relative">
        <canvas
          ref={canvasRef}
          className="max-w-full h-auto"
          style={{ border: '1px solid #ccc' }}
        />
        <canvas
          ref={gridCanvasRef}
          className="absolute top-0 left-0 max-w-full h-auto pointer-events-none"
          style={{ border: '1px solid #ccc' }}
        />
      </div>
      <div className="space-y-4">
        <div className="flex flex-col sm:flex-row gap-4 items-center">
          <input
            type="text"
            value={fileName}
            onChange={(e) => setFileName(e.target.value)}
            placeholder="Enter file name"
            className="p-2 border rounded w-full sm:w-auto"
          />
          <button
            onClick={handleDownload}
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors w-full sm:w-auto"
          >
            Download PDF
          </button>
        </div>
        {downloadComplete && (
          <div className="text-green-600 flex items-center gap-2">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
            PDF downloaded successfully!
          </div>
        )}
      </div>
    </div>
  );
}