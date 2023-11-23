import React, { useEffect, useState } from "react";
import { useLocalStorage } from "../custom-hooks/useLocalStorage";
import { fetchCurrentConditions } from "../utils/WeatherApi"; // Update with the correct path
import { CitySuggestion } from "../interfaces";
import ForecastList from "../components/HeaderCmps/ForecastList/ForecastList";

const FavoritesPage: React.FC = () => {
  const [favorites, setFavorites] = useState<CitySuggestion[]>([]);
  const [citysConditions, setCitysConditions] = useState<any[]>([]);
  const { getLocalStorageItem } = useLocalStorage();

  useEffect(() => {
    const storedFavorites = getLocalStorageItem("favorites");
    if (storedFavorites) {
      setFavorites(storedFavorites);
      fetchWeatherConditionsForFavorites(storedFavorites);
    }
  }, []);

  const fetchWeatherConditionsForFavorites = async (
    favorites: CitySuggestion[]
  ) => {
    const conditionsPromises = favorites.map((favorite) =>
      fetchCurrentConditions(favorite.key)
    );
    const conditions = await Promise.all(conditionsPromises);
    const formattedConditions = conditions.map((condition, index) => {
      console.log("conditions:", condition[0]);
      return {
        cityName: favorites[index].city,
        Day: {
          Icon: condition[0].WeatherIcon,
          IconPhrase: condition[0].WeatherText,
        },
        Temperature: {
          Minimum: { Value: condition[0].Temperature.Imperial.Value },
        },
      };
    });
    setCitysConditions(formattedConditions);
  };

  return <section>
    <ForecastList conditionsList = {citysConditions}/>
  </section>;
};

export default FavoritesPage;
