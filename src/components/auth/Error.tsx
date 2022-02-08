import styled from 'styled-components'
import { Errors } from './types'

const Text = styled.p``

export const Error = ({ error }: { error: Errors }) => (
  <div>
    <Text>{error}</Text>
  </div>
)
