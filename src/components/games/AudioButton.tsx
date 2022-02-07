import styled from 'styled-components'
import Icon from '../../assets/audio-play.svg'
import { IAudioButtonProps } from './types'

const Button = styled.button`
  width: 36px;
  height: 28px;
`

const StyledIcon = styled(Icon)``

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
