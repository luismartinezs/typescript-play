export type Vertex = Array<number>

// f = ax^2 + by^2

// Gradient of f
function gradientF([x, y]: Vertex): Vertex {
  const [a, b] = [0.2, -0.2]
  const df_dx = 2 * x * a
  const df_dy = 2 * y * b
  return [df_dx, df_dy]
}

// Regularization penalty based on vertex distances
function regularizationGradient(
  vertex: Vertex,
  previousVertex: Vertex | null,
  nextVertex: Vertex | null
): Vertex {
  const regWeight = 3

  const deltaPrev = previousVertex ? vertex.map((v, i) => v - previousVertex[i]) : [0, 0, 0]
  const deltaNext = nextVertex ? vertex.map((v, i) => v - nextVertex[i]) : [0, 0, 0]

  // Gradient is the difference between current vertex and its neighbors
  const gradient = deltaPrev.map((dp, i) => dp + deltaNext[i])
  return gradient.map(g => g * regWeight)  // Scale by the regularization weight
}

// Update vertex using both the gradient of f and regularization
export function updateVertex(
  vertex: Vertex,
  previousVertex: Vertex | null,
  nextVertex: Vertex | null,
  learningRate: number
): Vertex {
  // Gradient of the main function f
  const gradF = gradientF(vertex)

  // Gradient from regularization based on neighboring vertices
  const regGrad = regularizationGradient(vertex, previousVertex, nextVertex)

  // Combine both gradients: gradient of f and regularization
  const totalGrad = gradF.map((g, i) => g + regGrad[i])

  // Update vertex position based on the combined gradient
  return vertex.map((v, i) => v - learningRate * totalGrad[i])
}

export function optimizeVertices(vertices: Vertex[], learningRate: number, iterations: number): Vertex[] {
  for (let i = 0; i < iterations; i++) {
    vertices = vertices.map((vertex, index) => {
      // Skip the first and last vertices to keep their positions fixed
      if (index === 0 || index === vertices.length - 1) {
        return vertex
      }
      const previousVertex = vertices[index - 1]
      const nextVertex = vertices[index + 1]
      return updateVertex(vertex, previousVertex, nextVertex, learningRate)
    })
  }
  return vertices
}

// Example usage:
const vertices: Vertex[] = [
  [-3, -2],
  [0, 0],
  [4, 5],
  [7, 8],
]

// Parameters for optimization
const learningRate = 0.01
const iterations = 1000

// Optimizing vertices with regularization
const optimizedVertices = optimizeVertices(vertices, learningRate, iterations)

// Logging function to display vertex locations
function logVertices(vertices: Vertex[]) {
  vertices.forEach((vertex, index) => {
    console.log(`Vertex ${index + 1}:`, vertex.map(v => v.toFixed(2)))
  })
}

logVertices(optimizedVertices)