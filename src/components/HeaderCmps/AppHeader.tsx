import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
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
import { useDispatch, useSelector } from "react-redux";
import { toggleTemperatureMode } from "../../store/actions/temperatureAction";

const AppHeader = () => {
  const dispatch = useDispatch()
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const isFahrenheit = useSelector((state: any) => state.temperatureModule.isFahrenheit);

  const handleResize = () => {
    if (window.innerWidth >= 530) {
      setMobileMenuOpen(false);
    }
  };
  useEffect(() => {
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []); 
  const handleTemperatureToggle = () => {
    dispatch(toggleTemperatureMode());
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

        <button
          className="header__menu-hamburger"
          onClick={() => {
            toggleMobileMenu();
          }}
        >
          <MenuIcon />
        </button>

        <nav
          className={`header__nav ${
            mobileMenuOpen ? "header__nav_open slide-in-blurred-right" : ""
          }`}
        >
          <Link
            to="/"
            className="header__nav-link"
            onClick={() => {
              if (mobileMenuOpen) toggleMobileMenu();
            }}
          >
            Home
          </Link>
          <Link
            to="/favorites"
            className="header__nav-link"
            onClick={() => {
              if (mobileMenuOpen) toggleMobileMenu();
            }}
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
