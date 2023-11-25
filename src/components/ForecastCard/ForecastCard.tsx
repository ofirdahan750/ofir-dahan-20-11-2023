import React from "react";
import { ForecastCardProps } from "../../interfaces";
import { setRandomKey } from "../../utils/utils";
import "./ForecastCard.css";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router";

const ForecastCard: React.FC<ForecastCardProps> = ({ card, index }) => {
  const navigate = useNavigate();
  const isFahrenheit = useSelector(
    (state: any) => state.temperatureModule.isFahrenheit
  );
  const isDarkMode = useSelector(
    (state: any) => state.darkModeModule.isDarkMode
  );
  const getDayOfWeek = (dateStr: string): string => {
    const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    const date = new Date(dateStr);
    return days[date.getDay()];
  };

  const navigateToWeekly = () => {
    if (card.city) {
      navigate(`/?key=${card.city.key}&cityName=${card.city.city}`);
    }
  };
  return (
    <li
      key={setRandomKey(index + 1)}
      className={`forecast-card ${isDarkMode && "forecast-card_theme_dark"}`}
      onClick={navigateToWeekly}
      style={card.city && { cursor: "pointer" }}
    >
      <div className="forecast-card__content">
        <img
          src={`https://developer.accuweather.com/sites/default/files/${
            card.Day.Icon >= 10 ? card.Day.Icon : "0" + card.Day.Icon
          }-s.png`}
          className="forecast-card__img"
          alt="Forecast card image"
        />
        <span className="forecast-card__degrees">
          {isFahrenheit
            ? `${card.Temperature.Minimum.Value.toFixed()}°F`
            : `${(
                ((card.Temperature.Minimum.Value - 32) * 5) /
                9
              ).toFixed()}°C`}
        </span>
      </div>
      {card.Date && (
        <div className="forecast-card__day">{getDayOfWeek(card.Date)}</div>
      )}
      {card.city && (
        <div className="forecast-card__day" style={{ fontWeight: 500 }}>
          {card.city.city.toUpperCase()}
        </div>
      )}
      <div className="forecast-card__weather-info">{card.Day.IconPhrase}</div>
    </li>
  );
};

export default ForecastCard;
