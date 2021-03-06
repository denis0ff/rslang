import React, { useEffect, useState } from 'react'
import { GameStatus } from '../types'
import { Color, ITimerProps } from './types'

function TimerDisplay(props: { time: number }) {
  const { time } = props
  return (
    <div className="time-description">
      Осталось:
      <span>{time}</span> c
    </div>
  )
}
function ClockSvg({ color }: Color) {
  return (
    <svg
      aria-hidden="true"
      focusable="false"
      data-prefix="fas"
      data-icon="history"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 512 512"
    >
      <path
        fill={color}
        d="M504 255.531c.253
        136.64-111.18
        248.372-247.82
        248.468-59.015.042-113.223-20.53-155.822-54.911-11.077-8.94-11.905-25.541-1.839-35.607l11.267-11.267c8.609-8.609
        22.353-9.551
        31.891-1.984C173.062 425.135 212.781 440
        256 440c101.705 0 184-82.311 184-184 0-101.705-82.311-184-184-184-48.814 0-93.149
        18.969-126.068 49.932l50.754 50.754c10.08 10.08 2.941 27.314-11.313 27.314H24c-8.837
        0-16-7.163-16-16V38.627c0-14.254 17.234-21.393 27.314-11.314l49.372 49.372C129.209
        34.136 189.552 8 256 8c136.81 0 247.747 110.78 248 247.531zm-180.912
        78.784l9.823-12.63c8.138-10.463 6.253-25.542-4.21-33.679L288 256.349V152c0-13.255-10.745-24-24-24h-16c-13.255
        0-24 10.745-24 24v135.651l65.409 50.874c10.463 8.137 25.541 6.253 33.679-4.21z"
      />
    </svg>
  )
}

export default function Timer({ onTimer, conrols, end }: ITimerProps) {
  const [value, setValueTimer] = useState(30)
  useEffect(() => {
    const int = window.setTimeout(() => {
      if (value > 0 && end) {
        setValueTimer(value - 1)
      } else {
        clearTimeout(int)
        onTimer(GameStatus.RESULT)
        conrols(value, end)
      }
    }, 1000)
  }, [value])

  return (
    <div className="timer-wrapper">
      <ClockSvg color={value < 10 ? '#d31831' : '#ffffff'} />
      <TimerDisplay time={value} />
    </div>
  )
}
