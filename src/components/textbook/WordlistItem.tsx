import React, { FC } from 'react'
import styled from 'styled-components'
import { IWordlistItem, WordDifficultyType } from './types'

const Container = styled.div<{
  label?: WordDifficultyType
  active: boolean
}>`
  display: flex;
  flex-direction: column;
  width: 180px;
  height: 95px;
  padding: 5px 10px;
  border-radius: 5px;
  color: #030303;
  transition: all ease 0.3s;
  opacity: ${(props) => (props.active ? '1;' : '0.7;')};
  position: relative;
  cursor: pointer;
  background-color: #fff;
  pointer-events: ${(props) => (props.active ? 'none;' : 'auto;')};
  &.active,
  &:hover {
    opacity: 0.9;
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
      if (props.label === 'difficult') return '#d651ff;'
      if (props.label === 'studied') return '#65c6ff;'
      return 'transparent;'
    }};
  }
`

const Title = styled.p`
  font-size: 1.4em;
  font-weight: bolder;
}
`

const P = styled.p`
  font-size: 16px;
  line-height: 16px;
  height: 48px;
`

export const WordlistItem: FC<IWordlistItem> = ({
  ind,
  word,
  trans,
  active,
  label,
  callback,
}) => {
  const itemListener = (e: React.MouseEvent<HTMLDivElement>) => {
    e.preventDefault()
    const checkWord = e.currentTarget.dataset.prop || ''
    if (checkWord) {
      callback(+checkWord)
    }
  }

  return (
    <Container
      label={label}
      active={active}
      onClick={itemListener}
      data-prop={ind}
    >
      <Title>{word}</Title>
      <P>{trans}</P>
    </Container>
  )
}
