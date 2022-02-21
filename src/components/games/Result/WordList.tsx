import styled from 'styled-components'
import { getFileResponse } from '../../../utils/config'
import { AudioButton } from '../AudioButton'
import { IWordListProps, WordListType } from '../types'

const List = styled.ul`
  text-align: left;
  font-size: 1.2rem;
`

const WordLength = styled.span<{ type: WordListType }>`
  padding: 0.2em 0.5em;
  line-height: 3em;
  background-color: ${({ type }) =>
    type === WordListType.MISTAKE ? '#b9393989' : '#35c77e89'};
`

const Item = styled.li`
  display: flex;
  align-items: center;
`

const Word = styled.p`
  padding: 0.5em;
`

const WordTranslate = styled.span`
  color: wheat;
`

const Button = styled.div`
  button {
    background-color: transparent;
    height: 24px;
    width: 24px;
    &:hover {
      background-color: transparent;
    }
  }
`

export const WordList = ({ type, audio, words }: IWordListProps) => {
  if (words.length !== 0)
    return (
      <List>
        {type === WordListType.MISTAKE
          ? WordListType.MISTAKE
          : WordListType.SUCCESS}{' '}
        <WordLength type={type}>{words.length}</WordLength>
        {words.map((word) => (
          <Item key={word.id}>
            <Button>
              <AudioButton audio={audio} src={getFileResponse(word.audio)} />
            </Button>
            <Word>
              {word.word}
              {' - '}
              <WordTranslate>{word.wordTranslate}</WordTranslate>
            </Word>
          </Item>
        ))}
      </List>
    )
  return <span />
}
