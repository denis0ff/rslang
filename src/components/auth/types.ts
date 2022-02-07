import { Dispatch, SetStateAction } from 'react'

export enum AuthAction {
  AUTH,
  REGISTRATION,
}

export enum Errors {
  ALL_RIGHT = '',
  NO_EMAIL = 'Неправильно указан email',
  PASS_REPEAT = 'Введеные пароли не совпадают',
  PASS_STRONG = 'Пароль должен содержать символы в нижнем и верхнем регистре, а также числа. Длина пароля должна быть не менее 8 символов.',
  ERROR_403 = 'Неправильный email или пароль',
  ERROR_404 = 'Пользователь с таким email не найден, попробуйте пройти регистрацию',
  ERROR_417 = 'Пользователь с такими данными уже существует',
  ERROR_SOME = 'Произошла непредвиденная ошибка, повторите действие еще раз',
}

export interface IAuthProps {
  setAction: Dispatch<SetStateAction<AuthAction>>
  setError: Dispatch<SetStateAction<Errors>>
}

export type IsAuthContext = {
  isAuth: boolean
  setIsAuth: Dispatch<SetStateAction<boolean>>
}