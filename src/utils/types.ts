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
