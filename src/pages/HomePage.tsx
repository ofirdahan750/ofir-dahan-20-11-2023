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
import { setLoading } from "../store/actions/loadingAction";
import AppSpinner from "../components/AppSpinner/AppSpinner";

const HomePage = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const dispatch = useDispatch();
  const weeklyConditions = useSelector(
    (state: any) => state.weeklyConditionsModule.weeklyConditions
  );
  const isLoading = useSelector((state: any) => state.loadingModule.isLoading);
  useEffect(() => {
    const fetchConditions = async () => {
      try {
        dispatch(setLoading(true));
        let locationKey = searchParams.get("key");
        let locationCity = searchParams.get("cityName");
        if (!locationKey || !locationCity) {
          locationKey = "215854";
          locationCity = "Tel Aviv";
        }
        dispatch(setCurrentCity({ city: locationCity, key: locationKey }));
        const data = await fetchCurrentConditions(locationKey);
        dispatch(setCurrentConditions(data[0]));
        const forecastData = await fetchFiveDayForecast(locationKey);
        dispatch(setWeeklyConditions(forecastData.DailyForecasts));
      } catch (error) {
        console.error("Error fetching current conditions:", error);
      } finally {
        dispatch(setLoading(false));
        console.log("done");
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
      {!isLoading ? (
        <>
          <ForecastHeader />
          <ForecastList conditionsList={weeklyConditions} />
        </>
      ) : (
       <AppSpinner/>
      )}
    </>
  );
};

export default HomePage;
