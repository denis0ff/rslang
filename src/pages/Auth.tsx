import { useState } from 'react'
import { Authorization } from '../components/auth/Authorization'
import { Registration } from '../components/auth/Registration'
import { AuthAction } from '../components/auth/types'

export const Auth = () => {
  const [action, setAction] = useState(AuthAction.AUTH)
  return action === AuthAction.AUTH ? (
    <Authorization setAction={setAction} />
  ) : (
    <Registration setAction={setAction} />
  )
}
