import styled from 'styled-components'

const Card = styled.div<{ percent: number }>`
  margin: 2em;
  display: flex;
  justify-content: center;
  transition: 500ms;
  cursor: context-menu;
  svg {
    position: relative;
    width: 250px;
    height: 250px;
  }
  svg circle {
    width: 100%;
    height: 100%;
    fill: none;
    stroke: #191919;
    stroke-width: 10;
    stroke-linecap: round;
    transform: translate(5px, 5px);
  }
  svg circle:nth-child(2) {
    stroke-dasharray: 750;
    stroke-dashoffset: 750;
  }
  &:nth-child(1) svg circle:nth-child(2) {
    stroke-dashoffset: calc(750 - (750 * ${({ percent }) => percent}) / 100);
    stroke: #00ff43;
  }
`

const Percent = styled.div`
  position: relative;
  width: 250px;
  height: 250px;
  border-radius: 50%;
  box-shadow: inset 0 0 50px #000;
  background: #222;
  color: grey;
  z-index: 1000;
  &:hover {
    color: #fafafa;
    div {
      font-size: 100px;
      transform: translateY(-10px);
    }
  }
`

const Title = styled.div`
  color: inherit;
  font-weight: 700;
  font-size: 80px;
  transition: 0.5s;
  span {
    color: inherit;
    font-size: 0.5em;
  }
`

const Number = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 50%;
  transition: 500ms;
`

export const ProgressBar = ({ percent }: { percent: number }) => (
  <div>
    <Card percent={Math.ceil(percent)}>
      <Percent>
        <svg>
          <circle cx="120" cy="120" r="120" />
          <circle cx="120" cy="120" r="120" />
        </svg>
        <Number>
          <Title>
            {Math.ceil(percent) || 0}
            <span>%</span>
          </Title>
        </Number>
      </Percent>
    </Card>
  </div>
)
