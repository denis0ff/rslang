import { useState } from 'react'
import { Authorization } from '../components/auth/Authorization'
import { Registration } from '../components/auth/Registration'
import { AuthAction, Errors } from '../components/auth/types'
import { WrapperRow } from '../components/games/Difficulty'

export const Auth = () => {
  const [action, setAction] = useState(AuthAction.AUTH)
  const [error, setError] = useState(Errors.ALL_RIGHT)
  return (
    <WrapperRow>
      {action === AuthAction.AUTH ? (
        <Authorization
          setAction={setAction}
          setError={setError}
          error={error}
        />
      ) : (
        <Registration setAction={setAction} setError={setError} error={error} />
      )}
    </WrapperRow>
  )
}
