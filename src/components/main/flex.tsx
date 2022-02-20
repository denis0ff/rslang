import { FC } from 'react'
import styled from 'styled-components'
import { IFlexProps, Style } from './types'

const StyledFlex = styled.div<{ styleRT: Style }>`
  display: flex;
  flex-direction: ${(props) => props.styleRT.direction || 'row'};
  align-items: ${(props) => props.styleRT.items || 'stretch'};
  justify-content: ${(props) => props.styleRT.justify || 'stretch'};
  margin: ${(props) => props.styleRT.margin || 0};
  padding: ${(props) => props.styleRT.padding || 0};
  width: ${(props) => props.styleRT.width};
  flex: ${(props) => props.styleRT.flex};
  gap: ${(props) => props.styleRT.gap};
  height: ${(props) => props.styleRT.height || null};
  min-height: ${(props) => props.styleRT.mHeight || null};
  min-width: ${(props) => props.styleRT.mWidth || null};
  flex-wrap: ${(props) => props.styleRT.wrap || 'nowrap'};
  ${(props) => props.styleRT.styleChildren || null};
  ${(props) => props.styleRT.media || null}
  ${(props) => props.styleRT.mediaChildren || null};
`
const Flex: FC<IFlexProps> = ({ styleRT, children }) => {
  return <StyledFlex styleRT={styleRT}>{children}</StyledFlex>
}
export default Flex
