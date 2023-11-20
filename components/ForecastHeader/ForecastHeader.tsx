import { IconButton } from "@mui/material";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import "./ForecastHeader.css";
import { useState } from "react";
const ForecastHeader = () => {
  const [filled, setFilled] = useState(false);
  const toggleHeart = () => {
    setFilled(!filled);
  };

  return (
    <section className="forecast-header">
      <div className="forecast-header__info">
        <div className="forecast-header__wrapper">
          <img
            className="forecast-header__img"
            src="https://developer.accuweather.com/sites/default/files/12-s.png"
            alt="Weather image"
          />
          <div className="forecast-header__info-text">
            <h3 className="forecast-header__info-city">Tel Aviv</h3>
            <h2 className="forecast-header__info-details">Mon 18&deg;C</h2>
          </div>
        </div>
      </div>
      <div className="forecast-header__favorites">
        <div
          onClick={toggleHeart}
          style={{ border: "1px solid", cursor: "pointer" }}
        >
          <span className="forecast-header__favorites-text">
            <IconButton>
              {filled ? (
                <FavoriteIcon className="heart-icon filled" />
              ) : (
                <FavoriteBorderIcon className="heart-icon" />
              )}
            </IconButton>
            Add to Favorites
          </span>
        </div>
      </div>
    </section>
  );
};
export default ForecastHeader;
