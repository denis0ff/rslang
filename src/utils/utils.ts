// Рандомайзер в пределах min-max
export const getRandomInteger = (min: number, max: number): number =>
  Math.floor(min + Math.random() * (max + 1 - min))

// перемешивает массив (mutational)
export const shuffle = <T>(array: T[]): T[] => {
  for (let i = array.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[array[i], array[j]] = [array[j], array[i]]
  }
  return array
}