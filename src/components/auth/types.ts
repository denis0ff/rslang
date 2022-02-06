import { Dispatch, SetStateAction } from 'react'

export enum AuthAction {
  AUTH,
  REGISTRATION,
}

export interface IAuthProps {
  setAction: Dispatch<SetStateAction<AuthAction>>
}
