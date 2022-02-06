import styled from 'styled-components'
import { getFileResponse } from '../../../utils/config'
import { AudioButton } from '../AudioButton'
import { IWordListProps, WordListType } from '../types'

const List = styled.ul``

const Item = styled.li`
  display: flex;
  align-items: center;
`

const Word = styled.p`
  padding: 0.5em;
`

const WordTranslate = styled.span``

export const WordList = ({ type, audio, words }: IWordListProps) => (
  <List>
    {type === WordListType.MISTAKE
      ? WordListType.MISTAKE
      : WordListType.SUCCESS}{' '}
    <span>{words.length}</span>
    {words.map((word) => (
      <Item key={word.id}>
        <AudioButton audio={audio} src={getFileResponse(word.audio)} />
        <Word>
          {word.word}
          {' - '}
          <WordTranslate>{word.wordTranslate}</WordTranslate>
        </Word>
      </Item>
    ))}
  </List>
)
