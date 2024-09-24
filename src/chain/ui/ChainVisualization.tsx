import React, { useEffect, useRef } from 'react';
import { Vertex } from "../index.js";

interface ChainVisualizationProps {
  vertices: Vertex[];
  width: number;
  height: number;
}

const ChainVisualization: React.FC<ChainVisualizationProps> = ({
  vertices,
  width,
  height,
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Clear canvas
    ctx.clearRect(0, 0, width, height);

    // Find min and max values for normalization
    const minX = Math.min(...vertices.map(v => v[0]));
    const maxX = Math.max(...vertices.map(v => v[0]));
    const minY = Math.min(...vertices.map(v => v[1]));
    const maxY = Math.max(...vertices.map(v => v[1]));

    const padding = 40;
    const xScale = (x: number) => ((x - minX) / (maxX - minX)) * (width - 2 * padding) + padding;
    const yScale = (y: number) => height - (((y - minY) / (maxY - minY)) * (height - 2 * padding) + padding);

    // Draw axes
    ctx.beginPath();
    ctx.moveTo(padding, height - padding);
    ctx.lineTo(width - padding, height - padding);
    ctx.moveTo(padding, height - padding);
    ctx.lineTo(padding, padding);
    ctx.stroke();

    // Draw axis labels
    ctx.font = '12px Arial';
    ctx.fillText(`${minX.toFixed(2)}`, padding, height - padding + 15);
    ctx.fillText(`${maxX.toFixed(2)}`, width - padding, height - padding + 15);
    ctx.fillText(`${minY.toFixed(2)}`, padding - 30, height - padding);
    ctx.fillText(`${maxY.toFixed(2)}`, padding - 30, padding);

    // Draw straight lines connecting vertices
    ctx.beginPath();
    ctx.strokeStyle = 'black';
    vertices.forEach((vertex, index) => {
      const x = xScale(vertex[0]);
      const y = yScale(vertex[1]);

      if (index === 0) {
        ctx.moveTo(x, y);
      } else {
        ctx.lineTo(x, y);
      }
    });
    ctx.stroke();

    // Draw vertices
    vertices.forEach((vertex) => {
      const x = xScale(vertex[0]);
      const y = yScale(vertex[1]);

      // Draw point
      ctx.fillStyle = 'blue';
      ctx.beginPath();
      ctx.arc(x, y, 5, 0, 2 * Math.PI);
      ctx.fill();

      // // Draw coordinate values
      // ctx.fillStyle = 'black';
      // ctx.fillText(`(${vertex[0].toFixed(2)}, ${vertex[1].toFixed(2)})`, x + 5, y - 5);
    });

  }, [vertices, width, height]);

  return (
    <div className="bg-white p-4 rounded-lg shadow-md">
      <canvas
        ref={canvasRef}
        width={width}
        height={height}
        className="border border-gray-300 rounded"
      />
      <div className="mt-4">
        <h3 className="text-lg font-semibold mb-2">Vertex Coordinates:</h3>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2">
          {vertices.map((vertex, index) => (
            <div key={index} className="bg-gray-100 p-2 rounded text-sm">
              <span className="font-medium">V{index + 1}:</span> ({vertex[0].toFixed(2)}, {vertex[1].toFixed(2)})
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ChainVisualization;
