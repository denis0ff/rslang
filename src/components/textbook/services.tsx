import axios from 'axios'
import { getWordsResponse } from '../../utils/config'
import { IWord } from '../../utils/types'

export const getWordsService = async (group: number, page: number) => {
  const data = await axios.get(getWordsResponse(group, page)).then((res) => {
    return res.data as IWord[]
  })
  return data
}
