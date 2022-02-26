import { mapRange, } from './MathUtil'

type Point = {
  x: number, y: number,
}

type PathData = {
  x: number, y: number,
  cp1x: number, cp1y: number,
  cp2x: number, cp2y: number,
}

const spline = (points: Point[]): PathData[] => {
  const n = points.length - 1

  const alpha = Array(n).fill(1)
  const beta = Array(n).fill(4)
  const gamma = Array(n).fill(1)

  alpha[0] = 0
  alpha[n - 1] = 2

  beta[0] = 2
  beta[n - 1] = 7

  gamma[0] = 1
  gamma[n - 1] = 0

  const betaPair = {
    x: [...beta],
    y: [...beta],
  }
  const rPair = {
    x: Array(n),
    y: Array(n),
  }

  const control = {
    first: Array(n),
    second: Array(n),
  }

  for (let i = 0; i < n; i++) {
    const a = i === 0 ? 1
      : i === n - 1 ? 8
        : 4
    const b = i === n - 1 ? 1 : 2
    rPair['x'][i] = a * points[i]['x'] + b * points[i + 1]['x']
    rPair['y'][i] = a * points[i]['y'] + b * points[i + 1]['y']
  }

  for (let i = 1; i < n; i++) {
    const mX = alpha[i] / betaPair['x'][i - 1]
    const mY = alpha[i] / betaPair['y'][i - 1]

    betaPair['x'][i] -= mX * gamma[i - 1]
    betaPair['y'][i] -= mY * gamma[i - 1]

    rPair['x'][i] -= mX * rPair['x'][i - 1]
    rPair['y'][i] -= mY * rPair['y'][i - 1]
  }

  control['first'][n - 1] = {
    x: rPair['x'][n - 1] / betaPair['x'][n - 1],
    y: rPair['y'][n - 1] / betaPair['y'][n - 1],
  }
  for (let i = n - 2; i >= 0; i--) {
    control['first'][i] = {
      x: (rPair['x'][i] - gamma[i] * control['first'][i + 1]['x']) / betaPair['x'][i],
      y: (rPair['y'][i] - gamma[i] * control['first'][i + 1]['y']) / betaPair['y'][i],
    }
  }

  for (let i = 0; i < n - 1; i++) {
    control['second'][i] = {
      x: 2 * points[i + 1]['x'] - control['first'][i + 1]['x'],
      y: 2 * points[i + 1]['y'] - control['first'][i + 1]['y'],
    }
  }

  control['second'][n - 1] = {
    x: (points[n]['x'] + control['first'][n - 1]['x']) / 2,
    y: (points[n]['y'] + control['first'][n - 1]['y']) / 2,
  }

  return Array(n).fill(0).map((_, i) => {
    const { x, y, } = points[i]
    const { x: cp1x, y: cp1y, } = control['first'][i]
    const { x: cp2x, y: cp2y, } = control['second'][i]

    return {
      x, y,
      cp1x, cp1y,
      cp2x, cp2y,
    }
  })
}

const generatePaths = (values: Array<number>, width: number, height: number) => {
  if (values.length < 1) return ''
  const points = [values[0], ...values, values[values.length - 1], values[values.length - 1]]

  const pathsData = spline(points.map((y, x) => ({
    x: mapRange(x, 0, points.length - 2, -5, width + 5),
    y: mapRange(y, 50, -10, 0, height * 0.8),
  })))

  const paths = []
  for (let i = 0; i < pathsData.length - 1; i++) {
    const { x: x1, y: y1, cp1x, cp1y, cp2x, cp2y, } = pathsData[i]
    const { x: x2, y: y2, } = pathsData[i + 1]
    if (i === 0) paths.push(`M ${x1},${0} L ${x1},${y1}`)
    paths.push(`${i === 0 ? `M ${x1},${y1} ` : ''}C ${cp1x},${cp1y} ${cp2x},${cp2y} ${x2},${y2}`)
  }
  paths.push(`L ${width + 2},${height + 2} L ${-2},${height + 2} L ${pathsData[0].x},${pathsData[0].y}`)
  return paths.join(' ')
}

const generatePoints = (values: Array<number>, width: number, height: number) => {
  const points = [values[0], ...values, values[values.length - 1], values[values.length - 1]]

  const pathsData = spline(points.map((y, x) => ({
    x: mapRange(x, 0, points.length - 2, -5, width + 5),
    y: mapRange(y, 50, -10, 0, height * 0.8),
  })))
  return pathsData.slice(1, points.length - 2).map(({ x, y }) => ({ x, y }))
}

export {
  generatePaths,
  generatePoints,
}