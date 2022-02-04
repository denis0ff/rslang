import axios from 'axios'
import { getWordsResponse } from './config'

// Рандомайзер в пределах min-max
const getRandomInteger = (min: number, max: number): number =>
  Math.floor(min + Math.random() * (max + 1 - min))

export const getWordsPromise = async (group: number, page?: number) =>
  page
    ? axios.get(getWordsResponse(group, page))
    : axios.get(getWordsResponse(group, getRandomInteger(0, 30)))
