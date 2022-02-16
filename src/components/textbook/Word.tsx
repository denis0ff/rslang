import parse from 'html-react-parser'
import React, { FC, useState } from 'react'
import styled from 'styled-components'
import { BASE } from './textbookConfig'
import { AuthContext } from '../../utils/services'
import {
  IWordAddition,
  IWordAudioFiles,
  IWordObj,
  WordDifficultyType,
} from './textbookTypes'
import { VolumeSVG } from './VolumeSVG'

const Container = styled.div<{
  difficulty?: WordDifficultyType
  isDifficultGroup: boolean
  isPlay: boolean
}>`
  display: flex;
  flex-direction: column;
  width: 400px;
  height: 700px;
  flex-shrink: 0;
  background-color: #ffffff;
  color: #030303;
  border-top-left-radius: 160px;
  @media screen and (max-width: 420px) {
    width: 300px;
    border-top-left-radius: 120px;
  }
  & img {
    width: 100%;
    height: 200px;
    border-top-left-radius: 160px;
    border-bottom-right-radius: 160px;
    object-fit: cover;
    @media screen and (max-width: 420px) {
      border-top-left-radius: 120px;
      border-bottom-right-radius: 120px;
    }
  }
  & .description {
    display: flex;
    flex-grow: 1;
    justify-content: space-between;
    flex-direction: column;
    row-gap: 5px;
    padding: 15px;
  }
  & h2 {
    font-size: 20px;
    letter-spacing: 1px;
    line-height: 22px;
  }
  & h3 {
    font-size: 1.2em;
    line-height: 22px;
  }
  & .buttons {
    display: flex;
    flex-wrap: wrap;
    column-gap: 10px;
    row-gap: 10px;
    margin: 10px 0;
  }
  & .buttons button {
    border: none;
    border-radius: 5px;
    width: 175px;
    height: 26px;
    text-align: center;
    text-transform: uppercase;
    opacity: 0.8;
    transition: all ease 0.3s;
    cursor: pointer;
  }
  & .buttons button:hover {
    opacity: 1;
  }
  & .buttons .difficult {
    background-color: ${(props) =>
      props.difficulty === 'difficult' && !props.isDifficultGroup
        ? '#ccc;'
        : '#d651ff;'};
    pointer-events: ${(props) =>
      props.difficulty === 'difficult' && !props.isDifficultGroup
        ? 'none;'
        : 'auto;'};
  }
  & .buttons .studied {
    background-color: ${(props) =>
      props.difficulty === 'studied' ? '#ccc' : '#65c6ff;'};
    pointer-events: ${(props) =>
      props.difficulty === 'studied' ? 'none;' : 'auto;'};
  }
  & .explanation-title {
    font-size: 1.3em;
    letter-spacing: 2px;
  }
  & .explanation-example {
    font-size: 1em;
  }
  & .line {
    display: flex;
    width: 26px;
    height: 26px;
    & div {
      margin-left: 25px;
      width: 26px;
      height: 26px;
      transition: all ease 0.3s;
      cursor: pointer;
      pointer-events: ${(props) => (!props.isPlay ? 'none;' : 'auto;')};
      opacity: ${(props) => (!props.isPlay ? '0.3' : '1')};
      & svg {
        width: 26px;
        height: 26px;
      }
      &:hover {
        opacity: 0.8;
      }
    }
  }
`

const getProp = (e: React.MouseEvent<HTMLButtonElement>): IWordAddition => {
  return JSON.parse(e.currentTarget.dataset.prop || '')
}

const getButtonName = (isAdd: boolean) => {
  return isAdd ? 'Добавить в сложные' : 'Удалить из сложных'
}

export const Word: FC<IWordObj> = ({
  word,
  difficulty,
  deleteDifficulty,
  state,
}) => {
  const { isAuth } = React.useContext(AuthContext)
  const [isPlay, setIsPlay] = useState(false)
  const [audioFiles] = useState<IWordAudioFiles>({
    audio: new Audio(),
    audioMeaning: new Audio(),
    audioExample: new Audio(),
  })

  const difficultyListener = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
    const checkWord = getProp(e)
    difficulty(checkWord)
  }

  const deleteDifficultyListener = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
    const checkWord = getProp(e)
    deleteDifficulty(checkWord.id)
  }

  const audioPlay = () => {
    setIsPlay(false)
    const items = [
      audioFiles.audio,
      audioFiles.audioMeaning,
      audioFiles.audioExample,
    ]
    for (let i = 0; i < items.length; i += 1) {
      items[i].onended = () => {
        if (i + 1 < items.length) items[i + 1].play()
        else setIsPlay(true)
      }
    }
    items[0].play()
  }

  const audioKeyPressListener = () => {
    audioPlay()
  }
  const audioClickListener = (e: React.MouseEvent<HTMLDivElement>) => {
    e.preventDefault()
    audioPlay()
  }

  const buttonDifficulty = (
    name: WordDifficultyType,
    child: string,
    click: (e: React.MouseEvent<HTMLButtonElement>) => void
  ) => {
    if (isAuth) {
      return (
        <button
          className={name}
          type="button"
          data-prop={JSON.stringify({
            id: word.id,
            difficulty: name,
            isNew: !!word.userWord,
          })}
          onClick={click}
        >
          {child}
        </button>
      )
    }
    return ''
  }

  React.useEffect(() => {
    const audioPromise = new Promise<boolean>((resolve) => {
      audioFiles.audio.onloadeddata = () => {
        if (audioFiles.audio.readyState >= 2) {
          resolve(true)
        }
      }
    })
    const audioMeaningPromise = new Promise<boolean>((resolve) => {
      audioFiles.audioMeaning.onloadeddata = () => {
        if (audioFiles.audioMeaning.readyState >= 2) {
          resolve(true)
        }
      }
    })
    const audioExamplePromise = new Promise<boolean>((resolve) => {
      audioFiles.audioExample.onloadeddata = () => {
        if (audioFiles.audioExample.readyState >= 2) {
          resolve(true)
        }
      }
    })

    audioFiles.audio.src = BASE + word.audio
    audioFiles.audioMeaning.src = BASE + word.audioMeaning
    audioFiles.audioExample.src = BASE + word.audioExample

    Promise.all([audioPromise, audioMeaningPromise, audioExamplePromise]).then(
      (res) => {
        if (res.every((item) => item)) setIsPlay(true)
      },
      () => {
        throw Error('audio not load')
      }
    )
    return () => {
      setIsPlay(false)
    }
  }, [state.words[state.counter.currentWord]])

  if (!word) {
    return null
  }

  return (
    <Container
      difficulty={word.userWord ? word.userWord.difficulty : undefined}
      isDifficultGroup={state.counter.currentGroup === 6}
      isPlay={isPlay}
    >
      <img src={BASE + word.image} alt={word.word} className="word_image" />
      <div className="description">
        <h2>{word.word}</h2>
        <h3>{word.wordTranslate}</h3>
        <div className="line">
          <h3>{word.transcription}</h3>
          <div
            role="button"
            onKeyPress={audioKeyPressListener}
            onClick={audioClickListener}
            tabIndex={0}
          >
            <VolumeSVG color="#333" />
          </div>
        </div>
        <div className="buttons">
          {buttonDifficulty(
            'difficult',
            getButtonName(state.counter.currentGroup < 6),
            state.counter.currentGroup < 6
              ? difficultyListener
              : deleteDifficultyListener
          )}
          {buttonDifficulty(
            'studied',
            'Добавить в изученые',
            difficultyListener
          )}
        </div>
        <p className="explanation-title">Значение</p>
        <p className="explanation-example">{parse(word.textMeaning)}</p>
        <p className="explanation-example">{word.textMeaningTranslate}</p>
        <p className="explanation-title">Пример</p>
        <p className="explanation-example">{parse(word.textExample)}</p>
        <p className="explanation-example">{word.textExampleTranslate}</p>
      </div>
    </Container>
  )
}
