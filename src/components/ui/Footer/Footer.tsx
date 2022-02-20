import styled from 'styled-components'
import { Paths } from '../../../utils/types'

const Container = styled.div`
  display: flex;
  width: 100%;
  height: 40px;
  & .footer-wrapper {
    display: flex;
    height: 100%;
    width: 100%;
    align-items: center;
    justify-content: space-between;
  }
  & .footer-link {
    display: inline-flex;
    margin: 0;
    padding: 0;
    font-size: 14px;
    line-height: 14px;
    color: #555;
    text-align: center;
    & a {
      color: #555;
    }
    & a:hover {
      color: #999;
    }
  }
  & .copyright:before {
    content: '©';
  }
  & .trss {
    display: block;
    width: 100px;
    height: 34px;
    background-image: url("${Paths.HOME}assets/rss.svg");

    background-size: 100px 34px;
    background-repeat: no-repeat;
  }
}
`

export const Footer = () => {
  return (
    <Container>
      <div className="footer-wrapper">
        <p className="footer-link copyright">Copyright 2022</p>
        <p className="footer-link ">
          <a
            href="https://github.com/ameshchanka/"
            target="_blank"
            rel="noreferrer"
          >
            Aleh Meshchanka
          </a>
        </p>
        <p className="footer-link ">
          <a
            href="https://github.com/denis0ff/"
            target="_blank"
            rel="noreferrer"
          >
            Denis Popov
          </a>
        </p>
        <p className="footer-link ">
          <a href="https://github.com/MxKlim/" target="_blank" rel="noreferrer">
            Maxim Klimenkov
          </a>
        </p>
        <p className="footer-link ">
          <a
            href="https://rs.school/js/"
            target="_blank"
            rel="noreferrer"
            className="trss"
          >
            {}
          </a>
        </p>
      </div>
    </Container>
  )
}
