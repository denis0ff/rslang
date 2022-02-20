import styled from 'styled-components'
import Flex from './flex'

interface IPersonInfo {
  src: string
  name: string
  status: string
  work: string
}
const personInfo: IPersonInfo[] = [
  {
    src: '../../assets/img/dev1.jpg',
    name: 'Denis Popov',
    status: 'Front-end developer Team lead',
    work: '',
  },
  {
    src: '../../assets/img/dev2.jpg',
    name: 'Aleh Meshchanka',
    status: 'Front-end developer',
    work: '',
  },
  {
    src: '../../assets/img/dev3.jpg',
    name: 'Max Klimenkov',
    status: 'Front-end developer',
    work: '',
  },
]
const AboutItem = styled.div`
  width: 100%;
  h2 {
    width: 100%;
    text-align: center;
    font-size: 3rem;
    line-height: 3.5rem;
    margin-bottom: 1.5rem;
    width: 100%;
    text-align: center;
    text-shadow: 1px 0px 3px;
  }
  img {
    width: 100%;
    height: 100%;
  }
`
const Person = ({ src, name, status, work }: IPersonInfo) => {
  return (
    <Flex
      styleRT={{
        width: '100%',
        direction: 'column',
        mWidth: '200px',
        flex: '0 1 25%',
        styleChildren: `.block-img {width: 100%; height: auto; border-radius: 50%; overflow: hidden;}`,
      }}
    >
      <div className="block-img">
        <img src={src} alt={name} />
      </div>
      <Flex styleRT={{ direction: 'column' }}>
        <h3>{name}</h3>
        <p>{status}</p>
        <p>{work}</p>
      </Flex>
    </Flex>
  )
}

const About = () => {
  return (
    <Flex
      styleRT={{
        padding: '5rem auto',
        width: '100%',
        justify: 'center',
        items: 'center',
      }}
    >
      <AboutItem>
        <h2>O команде</h2>
        <Flex
          styleRT={{
            gap: '1rem',
            justify: 'space-between',
            wrap: 'wrap',
            mediaChildren: `@media (max-width: 500px) {
              justify-content: center;
              align-item: center;  
          }`,
          }}
        >
          {personInfo.map((item) => {
            return (
              <Person
                key={item.src}
                src={item.src}
                name={item.name}
                status={item.status}
                work={item.work}
              />
            )
          })}
        </Flex>
      </AboutItem>
    </Flex>
  )
}
export default About
