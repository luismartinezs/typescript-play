import React from "react";
import ChainVisualization from "./ChainVisualization";
import { optimizeVertices, Vertex } from "../index";

const generateVertices = (start: Vertex, end: Vertex, totalPoints: number): Vertex[] => {
  const result: Vertex[] = [];
  for (let i = 0; i < totalPoints; i++) {
    const t = i / (totalPoints - 1);
    const vertex: Vertex = start.map((startCoord, index) => {
      const endCoord = end[index];
      return startCoord + (endCoord - startCoord) * t;
    });
    result.push(vertex);
  }
  return result;
};

const startPoint: Vertex = [-10, -10];
const endPoint: Vertex = [10, 10];
const totalPoints = 20;

const vertices: Vertex[] = generateVertices(startPoint, endPoint, totalPoints);
const learningRate = 0.01;
const iterations = 1000;
const optimizedVertices = optimizeVertices(vertices, learningRate, iterations);

const ChainOptimizer: React.FC = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6 text-center text-blue-600">Chain Optimization Visualization</h1>
      <div className="flex flex-col mb-8">
        <div className="w-full mb-8">
          <h2 className="text-xl font-semibold mb-2">Original Chain</h2>
          <ChainVisualization vertices={vertices} width={600} height={400} />
        </div>
        <div className="w-full">
          <h2 className="text-xl font-semibold mb-2">Optimized Chain</h2>
          <ChainVisualization
            vertices={optimizedVertices}
            width={600}
            height={400}
          />
        </div>
      </div>
      <div className="bg-white shadow-md rounded-lg p-4">
        <h2 className="text-xl font-semibold mb-2 text-blue-500">Optimized Vertices:</h2>
        <div className="flex flex-wrap gap-2">
          {optimizedVertices.map((vertex, index) => (
            <div key={index} className="bg-gray-100 p-2 rounded-md text-sm">
              <span className="font-medium">V{index + 1}:</span> {vertex.map((v) => v.toFixed(2)).join(", ")}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ChainOptimizer;
