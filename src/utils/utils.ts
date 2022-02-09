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
