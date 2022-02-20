import styled from 'styled-components'
import Icon from '../../assets/audio-play.svg'
import { IAudioButtonProps } from './types'

const Button = styled.button`
  width: 4em;
  height: 4em;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #607d8b4a;
  border: none;
  border-radius: 50%;
  transition: 300ms;
  &:hover {
    background-color: #607d8b21;
    svg {
      fill: wheat;
    }
  }
`

const StyledIcon = styled(Icon)`
  fill: #fafafa;
`

export const AudioButton = ({ audio, src }: IAudioButtonProps) => {
  return (
    <Button
      onClick={() => {
        if (src) {
          audio.pause()
          audio.src = src
        }
        audio.play()
      }}
    >
      <StyledIcon />
    </Button>
  )
}
