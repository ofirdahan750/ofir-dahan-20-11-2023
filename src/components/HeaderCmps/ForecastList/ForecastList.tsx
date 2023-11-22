import { ForecastListProps, WeeklyWeatherData } from "../../../interfaces";
import { getDayOfWeek, setRandomKey } from "../../../utils/utils";
import "./ForecastList.css";

const ForecastList: React.FC<ForecastListProps> = ({ weeklyConditions }) => {
  if (!weeklyConditions) {
    return <div className="empty-state">No forecast data available.</div>;
  }
  return (
    <section className="forecast-list">
      <ul className="forecast-cards list-modifier">
        {weeklyConditions.map((card: WeeklyWeatherData, index: number) => (
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
            <div className="forecast-card__day">{getDayOfWeek(card.Date)}</div>
            <div className="forecast-card__weather-info">
              {card.Day.IconPhrase}
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
};

export default ForecastList;
