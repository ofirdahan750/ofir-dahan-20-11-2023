import React, { useEffect, useState } from "react";
import { useLocalStorage } from "../custom-hooks/useLocalStorage";
import { fetchCurrentConditions } from "../utils/WeatherApi";
import { CitySuggestion } from "../interfaces";
import ForecastList from "../components/ForecastList/ForecastList";
import { setLoading } from "../store/actions/loadingAction";
import { useDispatch, useSelector } from "react-redux";
import AppSpinner from "../components/AppSpinner/AppSpinner";

const FavoritesPage: React.FC = () => {
  const [citysConditions, setCitysConditions] = useState<any[]>([]);
  const { getLocalStorageItem } = useLocalStorage();
  const dispatch = useDispatch();
  const isLoading = useSelector((state: any) => state.loadingModule.isLoading);

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
      dispatch(setLoading(true));
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
      setCitysConditions(formattedConditions);
    } catch (error) {
      console.error("Failed to fetch weather conditions: ", error);
    } finally {
      dispatch(setLoading(false));
    }
  };

  return (
    <section>
      {!isLoading ? (
        <ForecastList conditionsList={citysConditions} />
      ) : (
        <AppSpinner/>
      )}
    </section>
  );
};

export default FavoritesPage;
