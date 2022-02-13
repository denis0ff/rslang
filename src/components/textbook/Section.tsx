import { FC } from 'react'
import styled from 'styled-components'
import { ISection, ISectionDifficult } from './types'

const codeColors = [
  '#00aa00',
  '#aaff00',
  '#ffff00',
  '#ffaa00',
  '#ff5500',
  '#ff0000',
  '#d651ff',
]

const ButtonPath = styled.button<{
  checked: boolean
  ind: number
}>`
  display: flex;
  justify-content: space-between;
  font-family: inherit;
  border: none;
  border-radius: 10px;
  width: calc((100% - 5 * 10px) / 6);
  position: relative;
  background-color: #ffffff;
  transition: all ease 0.3s;
  pointer-events: ${(props) => (props.checked ? 'none;' : 'auto;')};
  opacity: ${(props) => (props.checked ? '1;' : '0.7;')};
  &:hover,
  &:hover .code {
    opacity: 0.9;
  }
  &:nth-child(${(props) => (props.ind < 6 ? props.ind + 1 : 1)}):hover .code {
    background-color: ${(props) => codeColors[props.ind]};
  }
  @media screen and (max-width: 1080px) {
    width: calc((100% - 2 * 10px) / 3);
  }
  @media screen and (max-width: 640px) {
    width: calc((100% - 1 * 10px) / 2);
  }
  @media screen and (max-width: 420px) {
    width: calc((100%) / 1);
  }
`

const Title = styled.div`
  width: 100px;
  padding: 5px 0 5px 10px;
`

const H2 = styled.h2`
  font-size: 1.6em;
  line-height: 1.2em;
  height: 1.2em;
  text-align: start;
`

const P = styled.p`
  margin: 5px 0 0 0;
  font-size: 1em;
  text-align: start;
`

const Code = styled.div<{
  checked: boolean
  ind: number
}>`
  position: absolute;
  display: flex;
  align-items: center;
  justify-content: center;
  right: 0;
  top: 0;
  width: 70px;
  height: 100%;
  border-top-right-radius: 9px;
  border-bottom-right-radius: 10px;
  border-top-left-radius: 45%;
  transition: all ease 0.3s;
  background-color: ${(props) =>
    props.checked ? codeColors[props.ind] : '#cccccc;'};
  opacity: ${(props) => (props.checked ? '1;' : '0.7;')};
`

export const Section: FC<ISection> = ({
  name,
  code,
  first,
  last,
  ind,
  checked,
  callback,
}) => {
  const sectionListener = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
    const checkGroup = e.currentTarget.dataset.prop || ''
    if (checkGroup) {
      callback(+checkGroup)
    }
  }

  return (
    <ButtonPath
      key={code}
      type="button"
      checked={checked}
      ind={ind}
      onClick={sectionListener}
      data-prop={ind}
    >
      <Title>
        <H2>{name}</H2>
        <P>{`${first}-${last}`}</P>
      </Title>
      <Code checked={checked} ind={ind} className="code">
        {code}
      </Code>
    </ButtonPath>
  )
}

export const SectionDifficult: FC<ISectionDifficult> = ({
  name,
  count,
  checked,
  ind,
  callback,
}) => {
  const sectionListener = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
    const checkGroup = e.currentTarget.dataset.prop || ''
    if (checkGroup) {
      callback(+checkGroup)
    }
  }

  return (
    <ButtonPath
      key="D"
      type="button"
      checked={checked}
      ind={ind}
      onClick={sectionListener}
      className="section"
      data-prop={ind}
    >
      <Title>
        <H2>{name}</H2>
        <P>{count}</P>
      </Title>
      <Code checked={checked} ind={6} className="code">
        {}
      </Code>
    </ButtonPath>
  )
}
