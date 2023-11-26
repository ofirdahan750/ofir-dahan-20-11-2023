import { Link } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import Switch from "@mui/material/Switch";
import FormControlLabel from "@mui/material/FormControlLabel";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import {
  Menu as MenuIcon,
  Settings as SettingsIcon,
} from "@mui/icons-material";
import appLogo from "../../images/header/logo/header__logo1.png";
import appLogoDark from "../../images/header/logo/header__logo1.png";
import { useDispatch, useSelector } from "react-redux";
import { toggleTemperatureMode } from "../../store/actions/temperatureAction";
import { toggleDarkMode } from "../../store/actions/darkModeAction";
import "./AppHeader.css";
import useOutsideClick from "../../custom-hooks/useOutsideClick";

const AppHeader = () => {
  const dispatch = useDispatch();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const wrapperRef = useRef<HTMLDivElement>(null);

  const isFahrenheit: boolean = useSelector(
    (state: any) => state.temperatureModule.isFahrenheit
  );
  const isDarkMode: boolean = useSelector(
    (state: any) => state.darkModeModule.isDarkMode
  );

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
  useOutsideClick(wrapperRef, () => {
    if (mobileMenuOpen) {
      setMobileMenuOpen(false);
    }
  });

  const handleTemperatureToggle = () => {
    dispatch(toggleTemperatureMode(!isFahrenheit));
  };

  const handleModeToggle = () => {
    dispatch(toggleDarkMode(!isDarkMode));
  };

  const handleMenuOpen = (event: React.MouseEvent<HTMLButtonElement>) => {
    if (event.currentTarget && document.contains(event.currentTarget)) {
      setAnchorEl(event.currentTarget);
    } else {
      setAnchorEl(null);
    }
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const toggleMobileMenu = () => {
    setMobileMenuOpen((prevState) => !prevState);
  };

  return (
    <header
      className={`header ${isDarkMode && "header_theme_dark"} full-width`}
      ref={wrapperRef}
    >
      <div className="header__wrapper full-width_type_wrapper">
        <Link to="/">
          <img
            className="header__logo"
            src={isDarkMode ? appLogoDark : appLogo}
            alt="App logo"
          />
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
            mobileMenuOpen && "header__nav_open slide-in-blurred-right"
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
            <div>
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
                      <Switch
                        checked={isDarkMode}
                        onChange={handleModeToggle}
                      />
                    }
                    label={isDarkMode ? "Dark Mode" : "Light Mode"}
                  />
                </MenuItem>
              </Menu>
            </div>
          </div>
        </nav>
      </div>
    </header>
  );
};

export default AppHeader;
