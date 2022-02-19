import React, { FC } from 'react'
import styled from 'styled-components'
import { IWordlistItem } from './textbookTypes'
import Pic from '../../assets/progress.png'
import { AuthContext } from '../../utils/services'
import { WordDifficulties } from '../../utils/types'

const Container = styled.div<{
  label?: WordDifficulties
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
      if (props.label && props.label === WordDifficulties.DIFFICULT)
        return '#d651ff;'
      if (props.label && props.label === WordDifficulties.STUDIED)
        return '#65c6ff;'
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
  state,
  word,
  active,
  label,
  callback,
}) => {
  const { isAuth } = React.useContext(AuthContext)

  const getStatistic = () => {
    const f = state.aggrWords.find((el) => el._id === word.id)
    if (
      isAuth &&
      f &&
      f.userWord &&
      f.userWord.optional &&
      f.userWord.optional.games
    ) {
      const n1 = f.userWord.optional.games.audioCall
        ? f.userWord.optional.games.audioCall.right
        : 0
      const n2 = f.userWord.optional.games.sprint
        ? f.userWord.optional.games.sprint.right
        : 0
      return (
        <Progress>
          <img src={Pic} alt="прогресс" />
          {`${n1 + n2}/${f.userWord.optional.allTry}`}
        </Progress>
      )
    }
    return null
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
      {getStatistic()}
    </Container>
  )
}
