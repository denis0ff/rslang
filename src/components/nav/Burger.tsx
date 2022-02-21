import React, { FC, ReactNode, useState } from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'
import { Paths } from '../../utils/types'
import Flex from '../main/flex'

const Wrapper = styled.div<{ open: boolean }>`
  display: flex;
  flex-flow: row nowrap;
  z-index: 1000;
  .logo {
    display: none;
  }
  a {
    margin: 1.2rem 1rem;
    width: 50%;
  }
  @media (max-width: 768px) {
    flex-flow: column nowrap;
    background-color: #050505;
    opacity: 0.9;
    position: fixed;
    transform: ${({ open }) => (open ? 'translateX(0)' : 'translateX(100%)')};
    top: 0;
    right: 0;
    height: 100vh;
    width: 300px;
    padding-top: 3.5rem;
    transition: transform 0.3s ease-in-out;
    li {
      color: #fff;
    }
    .logo {
      display: block;
    }
  }
`

const StyledBurger = styled.div<{ open: boolean }>`
  width: 2rem;
  height: 2rem;
  position: fixed;
  top: 20px;
  right: 20px;
  z-index: 1001;
  display: none;
  @media (max-width: 768px) {
    display: flex;
    justify-content: space-around;
    flex-flow: column nowrap;
  }
  div {
    width: 2rem;
    height: 0.25rem;
    background-color: ${({ open }) => (open ? '#e2d1d1' : '#c5c5c5')};
    border-radius: 10px;
    transform-origin: 1px;
    transition: all 0.3s linear;
    &:nth-child(1) {
      transform: ${({ open }) => (open ? 'rotate(45deg)' : 'rotate(0)')};
    }
    &:nth-child(2) {
      transform: ${({ open }) => (open ? 'translateX(100%)' : 'translateX(0)')};
      opacity: ${({ open }) => (open ? 0 : 1)};
    }
    &:nth-child(3) {
      transform: ${({ open }) => (open ? 'rotate(-45deg)' : 'rotate(0)')};
    }
  }
`
const Burger: FC<ReactNode> = ({ children }) => {
  const [open, setOpen] = useState(false)
  return (
    <>
      <Flex
        styleRT={{
          justify: 'space-between',
          items: 'center',
          styleChildren: `.logo {
          display: none;} @media (max-width: 768px) { .logo {
          display: block; font-size: 1.5rem; line-height: 1.6rem}}`,
        }}
      >
        <div className="logo">
          <Link to={Paths.HOME}>RS Lang</Link>
        </div>
        <StyledBurger open={open} onClick={() => setOpen(!open)}>
          <div />
          <div />
          <div />
        </StyledBurger>
      </Flex>
      <Wrapper open={open}>{children}</Wrapper>
    </>
  )
}

export default Burger
