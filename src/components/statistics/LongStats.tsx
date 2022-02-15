import {
  Chart as ChartJS,
  LinearScale,
  CategoryScale,
  BarElement,
  Legend,
  Tooltip,
  Title,
} from 'chart.js'
import { Bar } from 'react-chartjs-2'
import styled from 'styled-components'
import { ILongStatProps } from './types'

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

export const data = {
  labels: [1, 2, 3, 4, 5],
  datasets: [
    {
      label: 'Новые слова',
      data: [2, 15, 100, 405, 2500],
      backgroundColor: 'rgba(255, 99, 132, 0.9)',
    },
    {
      label: 'Изученные слова',
      data: [50, 1250, 2340, 3500, 3200],
      backgroundColor: 'rgba(53, 162, 235, 0.9)',
    },
  ],
}

const Wrapper = styled.div`
  height: 50%;
  width: 50%;
  margin: 5em;
  background-color: whitesmoke;
`

export const LongStats = ({ longStat, allWords }: ILongStatProps) => {
  return (
    <article>
      <h2>Статистика за всё время</h2>
      <Wrapper>
        <Bar options={options} data={data} />
      </Wrapper>
    </article>
  )
}
