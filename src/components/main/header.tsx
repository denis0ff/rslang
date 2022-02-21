const LinkNav = ({ path }) => {
  return (
    <li className="header-navigation__ite">
      <a href={path}>Домой</a>
    </li>
  )
}
const Header = () => {
  return (
    <header className="header">
      <div className="header-log">RS Clone</div>
      <ul className="header-navigation">
        <LinkNav path="/" />
      </ul>
      <button type="button" className="logout-btn">
        Вход
      </button>
    </header>
  )
}
export default Header
