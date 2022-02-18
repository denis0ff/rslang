import React, { FC } from 'react'
import styled from 'styled-components'
import { IWordlistItem, WordDifficultyType } from './textbookTypes'
import Pic from '../../assets/progress.png'
import { AuthContext } from '../../utils/services'

const Container = styled.div<{
  label?: WordDifficultyType
  active: boolean
}>`
  display: flex;
  flex-direction: column;
  width: 180px;
  height: 110px;
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

const Progress = styled.p`
  font-size: 14px;
  line-height: 14px;
  height: 14px;
  letter-spacing: 1px;
  z-index: 5;
  margin-top: auto;
  & img {
    height: 14px;
    width: auto;
    margin-right: 5px;
  }
`

export const WordlistItem: FC<IWordlistItem> = ({
  ind,
  word,
  active,
  label,
  callback,
}) => {
  const { isAuth } = React.useContext(AuthContext)

  const getRightTry = () => {
    const n1 = word.userWord?.optional.games.audioCall
      ? word.userWord.optional.games.audioCall.right
      : 0
    const n2 = word.userWord?.optional.games.sprint
      ? word.userWord?.optional.games.sprint.right
      : 0
    return n1 + n2
  }

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
      <Title>{word.word}</Title>
      <P>{word.wordTranslate}</P>
      {(() => {
        if (
          isAuth &&
          word.userWord &&
          word.userWord.optional &&
          word.userWord.optional.games
        ) {
          return (
            <Progress>
              <img src={Pic} alt="прогресс угадывания слова в играх" />
              {`${getRightTry()}/${word.userWord?.optional.allTry}`}
            </Progress>
          )
        }
        return null
      })()}
    </Container>
  )
}
