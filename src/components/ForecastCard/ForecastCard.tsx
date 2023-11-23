import React from "react";
import { ForecastCardProps } from "../../interfaces";
import { setRandomKey } from "../../utils/utils";
import "./ForecastCard.css";

const ForecastCard: React.FC<ForecastCardProps> = ({ card, index }) => {
  const getDayOfWeek = (dateStr: string): string => {
    const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    const date = new Date(dateStr);
    return days[date.getDay()];
  };
  return (
    <li key={setRandomKey(index + 1)} className="forecast-card">
      <div className="forecast-card__content">
        <img
          src={`https://developer.accuweather.com/sites/default/files/${
            card.Day.Icon >= 10 ? card.Day.Icon : "0" + card.Day.Icon
          }-s.png`}
          className="forecast-card__img"
          alt="Forecast card image"
        />
        <span className="forecast-card__degrees">
          {(((card.Temperature.Minimum.Value - 32) * 5) / 9).toFixed()}°C
        </span>
      </div>
      {card.Date && (
        <div className="forecast-card__day">{getDayOfWeek(card.Date)}</div>
      )}
      {card.cityName && (
        <div className="forecast-card__day" style={{ fontWeight: 500 }}>
          {card.cityName.toUpperCase()}
        </div>
      )}
      <div className="forecast-card__weather-info">{card.Day.IconPhrase}</div>
    </li>
  );
};

export default ForecastCard;
