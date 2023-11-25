import { Link } from "react-router-dom";
import { useState } from "react";
import Switch from "@mui/material/Switch";
import FormControlLabel from "@mui/material/FormControlLabel";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import {
  Menu as MenuIcon,
  Settings as SettingsIcon,
} from "@mui/icons-material";
import "./AppHeader.css";
import appLogo from "../../images/header/logo/header__logo.png";

const AppHeader = () => {
  const [isFahrenheit, setIsFahrenheit] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleTemperatureToggle = () => {
    setIsFahrenheit(!isFahrenheit);
  };

  const handleModeToggle = () => {
    setIsDarkMode(!isDarkMode);
  };

  const handleMenuOpen = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  return (
    <header className="header full-width">
      <div className="header__wrapper full-width_type_wrapper">
        <Link to="/">
          <img className="header__logo" src={appLogo} alt="App logo" />
        </Link>

        <button className="header__menu-hamburger" onClick={toggleMobileMenu}>
          <MenuIcon />
        </button>

        <nav
          className={`header__nav ${
            mobileMenuOpen ? "header__nav_open slide-in-blurred-right" : ""
          }`}
        >
          <Link to="/" className="header__nav-link" onClick={toggleMobileMenu}>
            Home
          </Link>
          <Link
            to="/favorites"
            className="header__nav-link"
            onClick={toggleMobileMenu}
          >
            Favorites
          </Link>
          <div className="header__menu">
            <button
              className="header__menu-button"
              onMouseOver={handleMenuOpen}
            >
              <SettingsIcon />
            </button>
            <Menu
              anchorEl={anchorEl}
              open={Boolean(anchorEl)}
              onClose={handleMenuClose}
              MenuListProps={{ onMouseLeave: handleMenuClose }}
              disableScrollLock={true}
              PaperProps={{
                style: {
                  width: 150,
                },
              }}
            >
              <MenuItem>
                <FormControlLabel
                  control={
                    <Switch
                      checked={isFahrenheit}
                      onChange={handleTemperatureToggle}
                    />
                  }
                  label={isFahrenheit ? "Fahrenheit" : "Celsius"}
                />
              </MenuItem>
              <MenuItem>
                <FormControlLabel
                  control={
                    <Switch checked={isDarkMode} onChange={handleModeToggle} />
                  }
                  label={isDarkMode ? "Dark Mode" : "Light Mode"}
                />
              </MenuItem>
            </Menu>
          </div>
        </nav>
      </div>
    </header>
  );
};

export default AppHeader;
