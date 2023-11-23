import React, { useEffect, useState } from "react";
import { useLocalStorage } from "../custom-hooks/useLocalStorage";
import { fetchCurrentConditions } from "../utils/WeatherApi";
import { CityCondition, CitySuggestion } from "../interfaces";
import ForecastList from "../components/ForecastList/ForecastList";

const FavoritesPage: React.FC = () => {
  const [cityConditions, setCityConditions] = useState<CityCondition[]>([]);
  const { getLocalStorageItem } = useLocalStorage();

  useEffect(() => {
    const storedFavorites = getLocalStorageItem(
      "favorites"
    ) as CitySuggestion[];
    if (storedFavorites?.length > 0) {
      fetchWeatherConditionsForFavorites(storedFavorites);
    }
  }, []);

  const fetchWeatherConditionsForFavorites = async (
    favorites: CitySuggestion[]
  ) => {
    try {
      const conditionsPromises = favorites.map((favorite) =>
        fetchCurrentConditions(favorite.key)
      );
      const conditions = await Promise.all(conditionsPromises);
      const formattedConditions = conditions.map((condition, index) => ({
        cityName: favorites[index].city,
        Day: {
          Icon: condition[0].WeatherIcon,
          IconPhrase: condition[0].WeatherText,
        },
        Temperature: {
          Minimum: { Value: condition[0].Temperature.Imperial.Value },
        },
      }));
      setCityConditions(formattedConditions);
    } catch (error) {
      console.error("Failed to fetch weather conditions: ", error);
    }
  };

  return (
    <section>
      <ForecastList conditionsList={cityConditions} />
    </section>
  );
};

export default FavoritesPage;
