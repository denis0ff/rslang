import {
  Chart as ChartJS,
  LinearScale,
  CategoryScale,
  BarElement,
  Legend,
  Tooltip,
  Title,
} from 'chart.js'
import { useEffect, useState } from 'react'
import { Bar } from 'react-chartjs-2'
import styled from 'styled-components'
import { ILongStat } from '../../utils/types'
import { ListItem } from './GameCard'
import { IChartData, ILongStatProps } from './types'
import { Section, Title as HeaderTitle } from './WordStats'

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend)

export const options = {
  responsive: true,
  plugins: {
    legend: {
      position: 'top' as const,
      labels: {
        font: {
          size: 14,
          family: "'Bebas Neue', cursive",
          font: {
            size: 14,
            family: "'Bebas Neue', cursive",
          },
        },
      },
    },
  },
  scales: {
    y: {
      title: {
        display: true,
        text: 'Кол-во слов',
        font: {
          size: 16,
          family: "'Bebas Neue', cursive",
        },
      },
    },
    x: {
      title: {
        display: true,
        text: 'Период изучения',
        font: {
          size: 16,
          family: "'Bebas Neue', cursive",
        },
      },
    },
  },
}

const Wrapper = styled.div`
  width: 100%;
  box-shadow: 0px 8px 40px 20px rgb(34 60 80 / 47%);
  overflow-x: scroll;
  &::-webkit-scrollbar {
    width: 7px;
    background-color: #030303;
  }
  &::-webkit-scrollbar-thumb {
    background-color: #b3065c;
    border-radius: 2em;
  }
`

const WrapperGraph = styled.div`
  width: 100%;
  min-width: 700px;
  max-width: 1440px;
`

export const LongStats = ({ longStat }: ILongStatProps) => {
  const [data, setData] = useState<IChartData>({
    labels: [],
    dataset1: [],
    dataset2: [],
  })
  useEffect(() => {
    const stat: ILongStat[] =
      longStat.length !== 0 ? JSON.parse(longStat) : null
    if (Array.isArray(stat))
      setData((prev) => {
        prev.labels = stat.map((el) => el.date.slice(0, 10))
        prev.dataset1 = stat.map((el) => el.newWords)
        prev.dataset2 = stat.map((el) => el.learnedWords)
        return { ...prev }
      })
  }, [longStat])

  return (
    <Section>
      <HeaderTitle>Статистика за всё время</HeaderTitle>
      <ul>
        <ListItem>
          «Новые слова» - график отображает статистику новых слов за каждый день
          обучения
        </ListItem>
        <ListItem>
          «Изученные слова» - график отображает прогрессирующую статистику за
          всё время обучения (рост количества изученных слов по дням)
        </ListItem>
      </ul>
      <Wrapper>
        <WrapperGraph>
          <Bar
            options={options}
            data={{
              labels: data.labels,
              datasets: [
                {
                  label: 'Новые слова',
                  data: data.dataset1,
                  backgroundColor: 'rgb(172, 3, 130)',
                },
                {
                  label: 'Изученные слова',
                  data: data.dataset2,
                  backgroundColor: 'rgb(50, 4, 255)',
                },
              ],
            }}
          />
        </WrapperGraph>
      </Wrapper>
    </Section>
  )
}
