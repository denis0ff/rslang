import { FC } from 'react'
import styled from 'styled-components'
import { IFlexProps, Style } from './types'

const Block = styled.div<{ styleRT: Style }>`
  width: ${(props) => props.styleRT.width};
  height: ${(props) => props.styleRT.height};
  min-height ${(props) => props.styleRT.mHeight};
  ${(props) => props.styleRT.styleChildren};
  ${(props) => props.styleRT.media};
  ${(props) => props.styleRT.mediaChildren || null};
`
const BlockDiv: FC<IFlexProps> = ({ styleRT, children }) => {
  return <Block styleRT={styleRT}> {children} </Block>
}
export default BlockDiv
