import ReactDOM from 'react-dom'
import { BrowserRouter } from 'react-router-dom'
import { createGlobalStyle } from 'styled-components'
import { App } from './App'

const GlobalStyle = createGlobalStyle`

  @font-face {
    font-family: 'Roboto Condensed';
    src: url(https://fonts.googleapis.com/css2?family=Bebas+Neue&display=swap) format('woff2');
  }

  html {
    height: 100%;
    font: 14px 'Bebas Neue', cursive;
  }

  body {
    margin: 0;
    background-color: #030303;
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
    max-width: 1440px;
    margin: 0 auto;
    padding: 1rem;
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
    <App />
  </BrowserRouter>
)

ReactDOM.render(app, document.getElementById('root'))
