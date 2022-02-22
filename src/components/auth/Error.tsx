import styled from 'styled-components'
import { Errors } from './types'

const Text = styled.p`
  margin: 0.5em;
  align-self: center;
  background-color: #ff161657;
`

export const Error = ({ error }: { error: Errors }) => <Text>{error}</Text>
