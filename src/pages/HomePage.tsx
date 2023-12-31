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
import { setCurrentCity } from "../store/actions/selectedCityAction";
import { setLoading } from "../store/actions/loadingAction";
import AppSpinner from "../components/AppSpinner/AppSpinner";
import { WeeklyWeatherData } from "../interfaces";
import {
  setCurrentConditions,
  setWeeklyConditions,
} from "../store/actions/weatherConditionsAction";

const HomePage = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const dispatch = useDispatch();
  const weeklyConditions: WeeklyWeatherData[] = useSelector(
    (state: any) => state.weatherConditionsModule.weeklyConditions
  );
  const isLoading: boolean = useSelector(
    (state: any) => state.loadingModule.isLoading
  );
  useEffect(() => {
    const fetchWeatherData = async () => {
      dispatch(setLoading(true));
      let locationKey = searchParams.get("key") || "215854";
      let locationCity = searchParams.get("cityName") || "Tel Aviv";
      dispatch(setCurrentCity({ city: locationCity, key: locationKey }));
      try {
        const data = await fetchCurrentConditions(locationKey);
        dispatch(setCurrentConditions(data[0]));
        const forecastData = await fetchFiveDayForecast(locationKey);
        dispatch(setWeeklyConditions(forecastData));
      } catch (error) {
        console.error("Error fetching current conditions:", error);
      } finally {
        dispatch(setLoading(false));
      }
    };
    fetchWeatherData();
  }, [searchParams, dispatch]);

  const handleSearch = (selected: { city: string; key: string }) => {
    navigate(`?key=${selected.key}&cityName=${selected.city}`);
  };

  return (
    <section className="home-page fade-in">
      <AppSearch onSearch={handleSearch} />
      {!isLoading ? (
        <>
          <ForecastHeader />
          <ForecastList conditionsList={weeklyConditions} />
        </>
      ) : (
        <AppSpinner />
      )}
    </section>
  );
};

export default HomePage;
