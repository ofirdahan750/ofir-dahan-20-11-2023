import { Link } from "react-router-dom";
import "./AppHeader.css";
import appLogo from "../../images/header/logo/header__logo.png";

const AppHeader = () => {
  return (
    <header className="header full-width">
      <div className="header__wrapper full-width_type_wrapper">
        <img className="header__logo" src={appLogo} alt="App logo" />
        <nav className="header__nav">
          <Link to="/">Home</Link>
          <Link to="/favorites">Favorites</Link>
        </nav>
      </div>
    </header>
  );
};

export default AppHeader;
