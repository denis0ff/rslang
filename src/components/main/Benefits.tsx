import BlockDiv from './Block'
import Flex from './flex'
import { ICardMain } from './types'

const cardContent: ICardMain[] = [
  {
    src: '../../assets/img/card1.png',
    title: 'учебник',
    content:
      'Более 3500 тысяч слов для изучения, разбитых на разделы по уровню твоей подготовки с удобной навигацией.',
  },
  {
    src: '../../assets/img/card2.png',
    title: 'словарь',
    content:
      'Создай свой персональный словарь для изучения слов - добавляй слова, которым хочешь уделить особое внимание и удаляй, если слово тебе уже известно.',
  },
  {
    src: '../../assets/img/card3.png',
    title: 'статистика',
    content:
      'Отслеживай свой прогресс в индивидуальной статистике, ставь цели и вдохновляйся на и достижение новых результатов каждый день!',
  },
  {
    src: '../../assets/img/card4.png',
    title: 'игры',
    content:
      '2 увлекательные игры на развитие запоминания слов, тренинг аудирование.',
  },
]
const Cadr = (props: ICardMain) => {
  const { src, title, content } = props
  return (
    <Flex
      styleRT={{
        width: '22%',
        height: '500px',
        justify: 'start',
        items: 'center',
        direction: 'column',
        margin: '0rem auto',
        padding: '1rem 0.5rem',
        gap: '0.5rem',
        mWidth: '200px',
        styleChildren: `h3 {font-size: 1.8rem; text-transform: capitalize ;  line-height: 2.5rem; margin-bottom: 1.0rem; width: 100%; text-align: left;}
        p {font-size: 1.2rem; line-height: 1.5rem; width: 100%; text-align: left; font-weight: 400;}
        img {width: 100%; height: 100%; object-fit: cover;}
        `,
        mediaChildren: `@media (max-width: 660px) {
          flex: 1 0 auto;
          gap: 1rem;
        `,
        media: `&:hover {
          transition: all 0.3s ease;
          border-radius: 15px 15px 0 15px;
          box-shadow: 0px -12px 20px -5px rgba(255, 255, 255, 0.6) inset;
        }`,
      }}
    >
      <BlockDiv styleRT={{ width: '100%', mHeight: '200px' }}>
        <img src={src} alt={title} />
      </BlockDiv>
      <h3>{title}</h3>
      <p>{content} </p>
    </Flex>
  )
}

const Benefits = () => {
  return (
    <Flex
      styleRT={{
        width: '100%',
        height: 'auto',
        justify: 'space-between',
        direction: 'column',
        margin: '5rem 0 5rem 0',
        styleChildren: `h2 {font-size: 3rem; line-height: 3.5rem; margin-bottom: 1.5rem; text-shadow: 1px 0px 3px; width: 100%; text-align: center;}
        p {font-size: 1.5rem; line-height: 2.0rem; width: 100%; text-align: center;}`,
        mediaChildren: `@media (max-width: 700px) {
          h2 {
            font-size: 2rem;
            line-height: 2.5rem;
          }
          p {
            font-size: 1.4rem;
            line-height: 1.6rem
          }
        }`,
      }}
    >
      <BlockDiv styleRT={{}}>
        <h2>Оцените преимущества приложения.</h2>
        <p style={{ color: '#fcbd02' }}>
          Зарегистрируйтесь чтобы использовать все возможности приложения
        </p>
      </BlockDiv>
      <Flex
        styleRT={{
          width: '100%',
          height: 'auto',
          mHeight: '500px',
          margin: '2rem auto',
          justify: 'space-between',
          wrap: 'wrap',
          mediaChildren: `@media (max-width: 700px) {
            flex-directon: column;
            gap: 2rem;
          }`,
        }}
      >
        {cardContent.map((item) => {
          return (
            <Cadr
              key={item.src}
              src={item.src}
              title={item.title}
              content={item.content}
            />
          )
        })}
      </Flex>
    </Flex>
  )
}
export default Benefits
