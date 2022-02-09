import { FC } from 'react'
import styled from 'styled-components'
import { IWordlistItem, WordlistItemLabelType } from './types'

const Container = styled.div<{ label?: WordlistItemLabelType }>`
  display: flex;
  flex-direction: column;
  width: 180px;
  height: 95px;
  padding: 5px 10px;
  border-radius: 5px;
  background-color: #ffffff;
  color: #030303;
  transition: all ease 0.3s;
  opacity: 0.7;
  position: relative;
  &.active,
  &:hover {
    opacity: 1;
  }
  &::after {
    position: absolute;
    content: '';
    border: none;
    border-top-left-radius: 25px;
    border-bottom-right-radius: 5px;
    bottom: 0;
    right: 0;
    width: 30px;
    height: 30px;
    background-color: ${(props) => {
      if (props.label === 'difficult') return '#ff5500;'
      if (props.label === 'studied') return '#00aaff;'
      return 'transparent;'
    }};
  }
`

const H2 = styled.h2`
  font-size: 1.4em;
}
`

const P = styled.p`
  font-size: 16px;
  line-height: 16px;
  height: 48px;
`

export const WordlistItem: FC<IWordlistItem> = ({ word, trans, label }) => {
  return (
    <Container label={label}>
      <H2>{word}</H2>
      <P>{trans}</P>
    </Container>
  )
}
