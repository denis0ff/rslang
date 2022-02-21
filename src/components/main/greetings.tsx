import React from 'react'
import styled from 'styled-components'
import Flex from './flex'
import BlockDiv from './Block'

const Greetings = styled.section`
  width: 100%;
  min-height: 80vh;
  color: #ffffff;
`
const GreetingsBlock = () => {
  return (
    <Greetings>
      <Flex
        styleRT={{
          justify: 'space-between',
          items: 'center',
          padding: '5rem 0',
          media: `
          @media (max-width: 700px) {
            margin: 3rem 1rem;
            flex-direction: column;
          }
        `,
        }}
      >
        <BlockDiv
          styleRT={{
            styleChildren: `h2 {font-size: 3rem; text-shadow: 1px 0px 3px; line-height: 3.5rem; margin-bottom: 1.5rem;}
              li {font-size: 1.5rem; line-height: 2.0rem }`,
            mediaChildren: `@media (max-width: 700px) {
                h2 {
                  font-size: 2rem;
                  line-height: 2.5rem;
                }
                li {
                  font-size: 1.3rem;
                  line-height: 1.5rem;
                  margin: 1rem;
                  list-style: circle;
                  font-size: 1rem;
                }
              }`,
          }}
        >
          <h2>
            Изучай английский
            <div>с RSLang</div>
          </h2>
          <ul>
            <li>
              Приложение для эффективного изучения английского языка в игровой
              форме.
            </li>
            <li>
              В приложении есть учебник, который поможет вам изучать лексику.
            </li>
            <li>
              Мини-игры позволят вам закрепить ваши знания и улучшить
              аудирование.
            </li>
          </ul>
        </BlockDiv>
        <Flex
          styleRT={{
            justify: 'center',
            items: 'center',
            wrap: 'wrap',
            margin: '0 0',
            styleChildren: `img {width: 70%; min-width: 280px; max-width: 380px; height: 70%; display: block; object-position: center; margin: 0; flex: 1 0 50%;}`,
          }}
        >
          <img src="../../assets/img/main2.png" alt="img" />
        </Flex>
      </Flex>
    </Greetings>
  )
}

export default GreetingsBlock
