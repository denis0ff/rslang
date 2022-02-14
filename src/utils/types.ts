export interface IWord {
  id: string
  group: number
  page: number
  word: string
  image: string
  audio: string
  audioMeaning: string
  audioExample: string
  textMeaning: string
  textExample: string
  transcription: string
  wordTranslate: string
  textMeaningTranslate: string
  textExampleTranslate: string
}

export enum Paths {
  HOME = '/',
  SPRINT = 'sprint',
  AUDIO_CALL = 'audiocall',
  TEXTBOOK = 'textbook',
  AUTH = 'authorization',
  STAT = 'statistics',
  NOT_FOUND = '*',
}

export enum Tokens {
  token = 'token',
  refreshToken = 'refreshToken',
}

export enum WordDifficulties {
  DIFFICULT = 'difficult',
  STUDIED = 'studied',
}

export interface IUserWord {
  difficulty: WordDifficulties
  optional: {
    lastTime: string
    allTry: number
    streak: number
    games: {
      sprint: { right: number; wrong: number }
      audioCall: { right: number; wrong: number }
    }
  }
}

export interface IGotUserWord extends IUserWord {
  id?: string
  wordId?: string
}

export interface ILongStat {
  date: string // дата долгосрочной статы, т.е. если дата сегоднешняя данные обновлять, нет - добавить с новой датой
  newWords: number // количество новых слов за этот день
}

export interface IGameStat {
  newWords: number
  allWords: number
  right: number
  streak: number
}
export interface IStat {
  id?: string
  learnedWords: number
  optional: {
    words: string // массив id всех изученных слов
    date: string
    games: {
      sprint: IGameStat
      audioCall: IGameStat
    }
    longStat: string // если последний элемент в массиве прошлого дня дата - пушишь новый, нет - добавляешь/обновляешь элемент с датой сегодня
  }
}
