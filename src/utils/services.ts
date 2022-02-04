import axios from 'axios'
import { getWordsResponse } from './config'

export const getWordsPromise = async (group: number, page: number) =>
  axios.get(getWordsResponse(group, page))
