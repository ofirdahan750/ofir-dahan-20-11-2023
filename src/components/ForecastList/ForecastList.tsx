import { ForecastListProps, WeeklyWeatherData } from "../../interfaces";
import ForecastCard from "../ForecastCard/ForecastCard";
import "./ForecastList.css";

const ForecastList: React.FC<ForecastListProps> = ({ conditionsList }) => {
  if (!conditionsList) {
    return <div className="empty-state">No forecast data available.</div>;
  }
  return (
    <section className="forecast-list">
      <ul className="forecast-cards list-modifier">
        {conditionsList.map((card: WeeklyWeatherData, index: number) => (
          <ForecastCard key={index} card={card} index={index} />
        ))}
      </ul>
    </section>
  );
};

export default ForecastList;
