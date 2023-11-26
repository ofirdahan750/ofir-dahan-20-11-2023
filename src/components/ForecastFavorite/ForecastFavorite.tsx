import { useEffect, useState } from "react";
import { useLocalStorage } from "../../custom-hooks/useLocalStorage";
import { CitySuggestion } from "../../interfaces";
import { useSelector } from "react-redux";
import { IconButton } from "@mui/material";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import "./ForecastFavorite.css";

const ForecastFavorite = () => {
  const { getLocalStorageItem, setLocalStorageItem } = useLocalStorage();
  const [filled, setFilled] = useState(false);
  const isDarkMode: boolean = useSelector(
    (state: any) => state.darkModeModule.isDarkMode
  );
  const selectedCity: CitySuggestion = useSelector(
    (state: any) => state.selectedCityModule.selectedCity
  );
  useEffect(() => {
    const favorites = getLocalStorageItem("favorites") || [];
    setFilled(
      favorites.some((city: CitySuggestion) => city.key === selectedCity.key)
    );
  }, [selectedCity.key, getLocalStorageItem]);

  const toggleHeart = () => {
    const favorites = getLocalStorageItem("favorites") || [];
    const cityObject = { city: selectedCity.city, key: selectedCity.key };

    if (filled) {
      const updatedFavorites = favorites.filter(
        (city: CitySuggestion) => city.key !== selectedCity.key
      );
      setLocalStorageItem("favorites", updatedFavorites);
    } else {
      setLocalStorageItem("favorites", [...favorites, cityObject]);
    }
    setFilled(!filled);
  };
  return (
    <div className="forecast-header__favorite">
      <div
        onClick={toggleHeart}
        className={`forecast-header__favorite-wrapper ${
          isDarkMode && "forecast-header__favorite-wrapper_theme_dark"
        }`}
      >
        <span
          className={`forecast-header__favorite-text ${
            isDarkMode && "forecast-header__favorite-text_theme_dark"
          } `}
        >
          <IconButton style={{ padding: "5px 5px 8px" }}>
            {filled ? (
              <FavoriteIcon className="heart-icon filled" />
            ) : (
              <FavoriteBorderIcon
                className={`heart-icon ${
                  isDarkMode && "heart-icon_theme_dark"
                }`}
              />
            )}
          </IconButton>
          {filled ? "Remove from Favorites" : "Add to Favorites"}
        </span>
      </div>
    </div>
  );
};
export default ForecastFavorite;
