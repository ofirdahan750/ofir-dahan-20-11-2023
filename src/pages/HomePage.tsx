import { useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import AppSearch from "../components/AppSearch/AppSearch";
import ForecastHeader from "../components/ForecastHeader/ForecastHeader";
import ForecastList from "../components/ForecastList/ForecastList";

import {
  fetchCurrentConditions,
  fetchFiveDayForecast,
} from "../utils/WeatherApi";
import { setCurrentConditions } from "../store/actions/currentConditionsAction";
import { setCurrentCity } from "../store/actions/selectedCityAction";
import { setWeeklyConditions } from "../store/actions/weeklyConditionsAction";

const HomePage = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const dispatch = useDispatch();
  const weeklyConditions = useSelector(
    (state: any) => state.weeklyConditionsModule.weeklyConditions
  );
  useEffect(() => {
    const fetchConditions = async () => {
      try {
        const locationKey = searchParams.get("key") || "";
        const locationCity = searchParams.get("cityName");

        if (locationKey) {
          const data = await fetchCurrentConditions(locationKey);
          dispatch(setCurrentConditions(data[0]));
          const forecastData = await fetchFiveDayForecast(locationKey);
          dispatch(setWeeklyConditions(forecastData.DailyForecasts));
        }
        if (locationCity) {
          dispatch(setCurrentCity({ city: locationCity, key: locationKey }));
        }
      } catch (error) {
        console.error("Error fetching current conditions:", error);
      }
    };
    fetchConditions();
  }, [searchParams, dispatch]);

  const handleSearch = (selected: { city: string; key: string }) => {
    navigate(`?key=${selected.key}&cityName=${selected.city}`);
  };

  return (
    <>
      <AppSearch onSearch={handleSearch} />
      <ForecastHeader />
      <ForecastList conditionsList={weeklyConditions} />
    </>
  );
};

export default HomePage;
