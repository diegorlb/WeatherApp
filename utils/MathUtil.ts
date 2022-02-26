export const mapRange = (n: number, iMin: number, iMax: number, oMin: number, oMax: number): number => {
  return oMin + (n - iMin) * (oMax - oMin) / (iMax - iMin)
}