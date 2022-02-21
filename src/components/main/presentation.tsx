import { useState } from 'react'
import styled from 'styled-components'
import BlockDiv from './Block'
import Flex from './flex'

const BtnStyled = styled.button`
  background-color: transparent;
  border: none;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  cursor: pointer;
  &:hover {
    svg {
      fill-opacity: 0.5;
    }
  }
  &:active {
    transform: translate(-50%, -50%) scale(0.98);
    svg {
      fill: #c5c5c5;
    }
  }
`
const Frime = () => {
  return (
    <iframe
      src="https://www.youtube.com/embed/lZQCG5y_UYQ?autoplay=1"
      title="YouTube video player"
      frameBorder="0"
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
      allowFullScreen
    />
  )
}
const Btn = ({onClick}: { onClick: () => void }) => {
  return (
    <BtnStyled onClick={onClick} type="button">
      <svg width="68" height="48" viewBox="0 0 68 48">
        <path
          fill="#ff0000"
          d="M66.52,7.74c-0.78-2.93-2.49-5.41-5.42-6.19C55.79,.13,34,0,34,0S12.21,.13,6.9,1.55 C3.97,2.33,2.27,4.81,1.48,7.74C0.06,13.05,0,24,0,24s0.06,10.95,1.48,16.26c0.78,2.93,2.49,5.41,5.42,6.19 C12.21,47.87,34,48,34,48s21.79-0.13,27.1-1.55c2.93-0.78,4.64-3.26,5.42-6.19C67.94,34.95,68,24,68,24S67.94,13.05,66.52,7.74z"
        />
        <path fill="#ffffff" fillOpacity={0.9} d="M 45,24 27,14 27,34" />
      </svg>
    </BtnStyled>
  )
}
const Presentatins = () => {
  const [frimeActive, setFrimeActive] = useState(true)
  return (
    <Flex
      styleRT={{
        direction: 'column',
        justify: 'center',
        items: 'center',
        margin: '0 0',
      }}
    >
      <BlockDiv
        styleRT={{
          styleChildren: `h2 {width: 100%; text-shadow: 1px 0px 3px; font-size: 3rem; line-height: 3.5rem; margin-bottom: 3rem;
          text-align: center;}
          p {text-align: center; color: #fcbd02; font-size: 1.5rem; line-height: 2.0rem; margin-bottom: 2rem}`,
          mediaChildren: `@media (max-width: 800px) {
            h2 { font-size: 2rem; line-height: 2.5rem;}
          }`,
        }}
      >
        <h2>Добро пожаловать в RS Lang</h2>
        <p>Видео инструкция</p>
      </BlockDiv>
      <BlockDiv
        styleRT={{
          width: '70%',
          height: '60vh',
          mediaChildren: ` 
          border: 1px solid #ffffff;
          position: relative;
          iframe {
            position: absolute;
            top:0;
            left: 0;
            width: 100% !important;
            height: 100% !important;
        }
          @media (max-width: 800px) {
           & {
            padding-bottom: 56.25%;
            width: 100%,
            padding-top: 30px;
            height: auto;
            overflow: hidden;};
          }`,
        }}
      >
        {frimeActive ? (
          <Btn
            onClick={() => {
              console.log('ok')
              setFrimeActive((prev) => !prev)
            }}
          />
        ) : (
          <Frime />
        )}
      </BlockDiv>
    </Flex>
  )
}
export default Presentatins
