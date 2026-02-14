import { useRef, useEffect, memo } from 'react';
import { decode } from 'blurhash';

interface BlurhashCanvasProps {
  hash: string;
  width?: number;
  height?: number;
  className?: string;
}

/**
 * Renders a blurhash placeholder as a tiny canvas, stretched to fill its container.
 * The decode is done once on mount & cached in the canvas.
 */
export const BlurhashCanvas = memo(function BlurhashCanvas({
  hash,
  width = 32,
  height = 32,
  className = '',
}: BlurhashCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    try {
      const pixels = decode(hash, width, height);
      const ctx = canvas.getContext('2d');
      if (!ctx) return;

      const imageData = ctx.createImageData(width, height);
      imageData.data.set(pixels);
      ctx.putImageData(imageData, 0, 0);
    } catch {
      // invalid hash — silently skip
    }
  }, [hash, width, height]);

  return (
    <canvas
      ref={canvasRef}
      width={width}
      height={height}
      className={`w-full h-full object-cover ${className}`}
      aria-hidden="true"
    />
  );
});
