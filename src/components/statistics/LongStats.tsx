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
import { IChartData, ILongStatProps } from './types'

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend)

export const options = {
  responsive: true,
  plugins: {
    legend: {
      position: 'top' as const,
    },
  },
  scales: {
    y: {
      title: {
        display: true,
        text: 'Кол-во слов',
      },
    },
    x: {
      title: {
        display: true,
        text: 'Период изучения',
      },
    },
  },
}

// export const data: IChartData = {
//   labels: [],
//   datasets: [
//     {
//       label: 'Новые слова',
//       data: [],
//       backgroundColor: 'rgba(172, 3, 129, 0.9)',
//     },
//     {
//       label: 'Изученные слова',
//       data: [],
//       backgroundColor: 'rgba(45, 15, 179, 0.9)',
//     },
//   ],
// }

const Wrapper = styled.div`
  height: 50%;
  width: 50%;
  margin: 5em;
  background-color: whitesmoke;
`

export const LongStats = ({ longStat }: ILongStatProps) => {
  const [data, setData] = useState<IChartData>({
    labels: [],
    datasets: [
      {
        label: 'Новые слова',
        data: [],
        backgroundColor: 'rgba(172, 3, 129, 0.9)',
      },
      {
        label: 'Изученные слова',
        data: [],
        backgroundColor: 'rgba(45, 15, 179, 0.9)',
      },
    ],
  })
  useEffect(() => {
    const stat: ILongStat[] =
      longStat.length !== 0 ? JSON.parse(longStat) : null
    if (Array.isArray(stat))
      setData((prev) => {
        prev.labels = stat.map((el) => el.date.slice(0, 10))
        prev.datasets[0].data = stat.map((el) => el.newWords)
        prev.datasets[1].data = stat.map((el) => el.learnedWords)

        return { ...prev }
      })
  }, [longStat])

  return (
    <article>
      <h2>Статистика за всё время</h2>
      <Wrapper>
        <Bar options={options} data={data} />
      </Wrapper>
    </article>
  )
}
