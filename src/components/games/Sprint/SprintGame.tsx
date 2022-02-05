import React, { useEffect, useState } from 'react'
import { IGameRunProps } from '../types'
import Timer from './timer'
import './styles/style.css'

const Title = () => <h2>SprintGame</h2>

const Wrapper: React.FC = () => {
  return (
    <div className="wrapper">
      <Title />
      <Timer />
    </div>
  )
}
const Container: React.FC = () => {
  return (
    <div className="container">
      <Wrapper />
    </div>
  )
}

// { words }: IGameRunProps
export const SprintGame = (props: IGameRunProps) => {
  console.log(props)
  return <Container />
 
}
