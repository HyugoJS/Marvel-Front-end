import logo from "../assets/logo.png";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <header className="container">
      <div>
        <img src={logo} alt="" />
      </div>
      <div className="header-links">
        <Link to="/characters">Characters</Link>
        <Link to="/comics">Comics</Link>
        <p>Favoris</p>
      </div>
    </header>
  );
};
export default Header;
