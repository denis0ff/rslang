import ReactDOM from 'react-dom'
import { BrowserRouter } from 'react-router-dom'
import { createGlobalStyle } from 'styled-components'
import { App, AppWrapper } from './App'

const GlobalStyle = createGlobalStyle`

  @font-face {
    font-family: 'Roboto Condensed';
    src: url(https://fonts.googleapis.com/css2?family=Bebas+Neue&display=swap) format('woff2');
  }

  * {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }

  html {
    height: 100%;
    font: 14px 'Bebas Neue', cursive;
  }

  body {
    margin: 0;
    background-color: #030303;
    &::-webkit-scrollbar {
      width: 7px;
      background-color: #030303;
    }
    &::-webkit-scrollbar-thumb {
      background-color: #b3065c;
      border-radius: 2em;
    }
  }

  ul {
    padding: 0;
    margin: 0;
  }

  li {
    list-style: none;
  }

  a {
    color: inherit;
    text-decoration: none;
    padding: 0.5rem;
  }

  #root {
    display: flex;
    flex-direction: column;
    max-width: 1440px;
    min-height: 100vh;
    margin: 0 auto;
    color: #fafafa;
  }

  h2, h3 {
    margin: 0;
    line-height: 2.5rem;
    cursor: default;
  }

  h3 {
    line-height: 2rem;
  }
`

const app = (
  <BrowserRouter>
    <GlobalStyle />
    <AppWrapper>
      <App />
    </AppWrapper>
  </BrowserRouter>
)

ReactDOM.render(app, document.getElementById('root'))
