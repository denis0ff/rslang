import { Errors } from '../components/auth/types'

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

export const signIn = (data: {
  token: string
  refreshToken: string
  userId: string
}) => {
  localStorage.setItem('token', data.token)
  localStorage.setItem('refreshToken', data.refreshToken)
  localStorage.setItem('userId', data.userId)
  window.location.href = window.location.origin
}

export const catchError = (status: number) => {
  switch (status) {
    case 404:
      return Errors.ERROR_404
    case 403:
      return Errors.ERROR_403
    case 417:
      return Errors.ERROR_417
    default:
      return Errors.ERROR_SOME
  }
}

export const sameDay = (dateJSON: string) => {
  const date = new Date(dateJSON)
  const now = new Date()
  return (
    date.getFullYear() === now.getFullYear() &&
    date.getDate() === now.getDate() &&
    date.getMonth() === now.getMonth()
  )
}

export const checkIsNaN = (value: number) => (Number.isNaN(value) ? 0 : value)
export const getRandomAnswers = (
  currentIindex: number,
  maxIndex: number
): number => {
  const randomIndex = (max: number): number => {
    const randomItem = getRandomInteger(0, max)
    return randomItem === currentIindex ? randomIndex(max) : randomItem
  }
  const rIndex = randomIndex(maxIndex)
  return shuffle([rIndex, currentIindex])[0]
}
