import { useSelector } from "react-redux";
import { CitySuggestion, TodayWeatherData } from "../../interfaces";
import ForecastFavorite from "../ForecastFavorite/ForecastFavorite";
import "./ForecastHeader.css";

const ForecastHeader = () => {
  const currentConditions: TodayWeatherData = useSelector(
    (state: any) => state.currentConditionsModule.currentConditions
  );
  const selectedCity: CitySuggestion = useSelector(
    (state: any) => state.selectedCityModule.selectedCity
  );
  const isFahrenheit: boolean = useSelector(
    (state: any) => state.temperatureModule.isFahrenheit
  );

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
              <h3 className="forecast-header__info-city">
                {selectedCity.city}
              </h3>
              <h2 className="forecast-header__info-details">
                {!isFahrenheit
                  ? `${currentConditions.Temperature.Metric.Value.toFixed()}°${
                      currentConditions.Temperature.Metric.Unit
                    }`
                  : `${currentConditions.Temperature.Imperial.Value.toFixed()}°${
                      currentConditions.Temperature.Imperial.Unit
                    }`}
              </h2>
            </div>
          </div>
        )}
      </div>

      <ForecastFavorite />
    </section>
  );
};
export default ForecastHeader;
