import styled from 'styled-components'

export const DesriptionTitle = styled.h2`
  margin: 5rem 0 2rem;
  font-size: 2em;
  text-transform: uppercase;
  letter-spacing: 0.3em;
`

export const DescriptionList = styled.ul`
  margin: 1rem auto;
  width: 60%;
  font-size: 1.5em;
`

export const DescriptionListItem = styled.li`
  margin: 1rem;
  text-align: left;
  list-style: circle;
  font-size: 1rem;
`

export const AudioCallDescription = () => (
  <>
    <DesriptionTitle>«Аудиовызов»</DesriptionTitle>
    <DescriptionList>
      Тренировка, которая улучшает восприятие речи на слух
      <DescriptionListItem>Используйте мышь, чтобы выбрать</DescriptionListItem>
      <DescriptionListItem>
        Используйте цифровые клавиши от 1 до 5 для выбора ответа
      </DescriptionListItem>
      <DescriptionListItem>
        Используйте клавишу Enter для повторного звучания слова
      </DescriptionListItem>
      <DescriptionListItem>
        Используйте пробел для подсказки или для перехода к следующему слову
      </DescriptionListItem>
    </DescriptionList>
  </>
)
