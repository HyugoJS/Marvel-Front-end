import logo from "../assets/logo.png";
import { Link } from "react-router-dom";
import Cookies from "js-cookie";

const Header = ({ userToken, setUserToken }) => {
  const existingToken = userToken;
  const token = Cookies.get("token");
  return (
    <header className="container">
      <div>
        <img src={logo} alt="" />
      </div>
      <div className="header-links">
        <Link to="/">Home</Link>
        <Link to="/characters">Characters</Link>
        <Link to="/comics">Comics</Link>
        <Link to="/favorites">Favorites</Link>
        <div className="header-buttons">
          {existingToken ? (
            <button
              className="disconnect"
              onClick={() => {
                setUserToken(null);
                Cookies.remove("token");
              }}
            >
              Se déconnecter
            </button>
          ) : (
            <>
              <Link to="/signup">Sign Up</Link>
              <Link to="/login">Log In</Link>
            </>
          )}
        </div>
      </div>
    </header>
  );
};
export default Header;
