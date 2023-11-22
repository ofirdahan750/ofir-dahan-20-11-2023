import { IconButton } from "@mui/material";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import "./ForecastHeader.css";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useLocalStorage } from '../../../custom-hooks/useLocalStorage'; // Make sure to create this custom hook

const ForecastHeader = () => {
  const [filled, setFilled] = useState(false);
  const { getLocalStorageItem, setLocalStorageItem } = useLocalStorage();

  const currentConditions = useSelector(
    (state: any) => state.currentConditionsModule.currentConditions
  );
  const selectedCity = useSelector(
    (state: any) => state.selectedCityModule.selectedCity
  );

  useEffect(() => {
    // Check if the city is in favorites when component mounts
    const favorites = getLocalStorageItem('favorites') || [];
    setFilled(favorites.includes(selectedCity.city));
  }, [selectedCity.city, getLocalStorageItem]);

  const toggleHeart = () => {
    const favorites = getLocalStorageItem('favorites') || [];
    if (filled) {
      // Remove from favorites
      const updatedFavorites = favorites.filter((city: any) => city !== selectedCity.city);
      setLocalStorageItem('favorites', updatedFavorites);
    } else {
      // Add to favorites
      setLocalStorageItem('favorites', [...favorites, selectedCity.city]);
    }
    setFilled(!filled);
  };

  return (
    <section className="forecast-header">
      <div className="forecast-header__info">
        {currentConditions && (
          <div className="forecast-header__wrapper">
            <img
              className="forecast-header__img"
              src={`https://developer.accuweather.com/sites/default/files/${
                currentConditions.WeatherIcon > 10
                  ? currentConditions.WeatherIcon
                  : "0" + currentConditions.WeatherIcon
              }-s.png`}
              alt="Weather image"
            />
            <div className="forecast-header__info-text">
              <h3 className="forecast-header__info-city">{selectedCity.city}</h3>
              <h2 className="forecast-header__info-details">
                {Math.floor(currentConditions.Temperature.Metric.Value)}&deg;
                {currentConditions.Temperature.Metric.Unit}
              </h2>
            </div>
          </div>
        )}
      </div>
      <div className="forecast-header__favorites">
        <div
          onClick={toggleHeart}
          style={{ border: "1px solid", cursor: "pointer" }}
        >
          <span className="forecast-header__favorites-text">
            <IconButton style={{ padding: "5px 5px 8px" }}>
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
