import BlockDiv from './Block'
import Flex from './flex'

const Presentatins = () => {
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
          width: '80%',
          height: '80vh',
          mediaChildren: `@media (max-width: 800px) {
           & {height: 50vh};
          }`,
        }}
      >
        <iframe
          width="100%"
          height="100%"
          src="https://www.youtube.com/embed/lZQCG5y_UYQ"
          title="YouTube video player"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        />
      </BlockDiv>
    </Flex>
  )
}
export default Presentatins
