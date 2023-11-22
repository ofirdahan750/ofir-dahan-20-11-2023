import { useSelector } from "react-redux";
import "./ForecastList.css";
import { getDayOfWeek, setRandomKey } from "../../../utils/utils";
import { WeeklyWeatherData } from "../../../interfaces";
const ForecastList = () => {
  const weeklyConditions = useSelector(
    (state: any) => state.weeklyConditionsModule.weeklyConditions
    );

  if (weeklyConditions)
    return (
      <section className="forecast-list">
        <ul className="forecast-cards list-modifier">
          {weeklyConditions.map((card: WeeklyWeatherData, index: number) => (
            <li key={setRandomKey(index+1)} className="forecast-card">
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  margin: "14px 0 0 ",
                }}
              >
                <img
                  src={`https://developer.accuweather.com/sites/default/files/${card.Day.Icon > 10 ? card.Day.Icon: '0' + card.Day.Icon}-s.png`} 
                  className="forecast-card__img"
                  alt="forecast card image"
                />
                <span className="forecast-card__degrees">{((card.Temperature.Minimum.Value - 32) * 5/9).toFixed()}&deg;C</span>
              </div>
              <div className="forecast-card__day">{getDayOfWeek(card.Date)}</div>
              <div className="forecast-card__weather-info">{card.Day.IconPhrase}</div>
            </li>
          ))}
        </ul>
      </section>
    );
  else {
    return <div></div>;
  }
};
export default ForecastList;
