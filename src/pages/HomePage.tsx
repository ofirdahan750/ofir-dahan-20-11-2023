import { useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useDispatch } from "react-redux";

import AppSearch from "../components/HeaderCmps/AppSearch/AppSearch";
import ForecastHeader from "../components/HeaderCmps/ForecastHeader/ForecastHeader";
import ForecastList from "../components/HeaderCmps/ForecastList/ForecastList";

import { fetchCurrentConditions } from "../utils/WeatherApi"; // Adjust the import path as needed
import { setCurrentConditions } from "../store/actions/currentConditionsAction";
import { setCurrentCity } from "../store/actions/selectedCityAction";

const HomePage = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchConditions = async () => {
      try {
        const locationKey = searchParams.get("key");
        const locationCity = searchParams.get("cityName");

        if (locationKey) {
          const data = await fetchCurrentConditions(locationKey);
          dispatch(setCurrentConditions(data[0]));
        }
        if (locationCity) {
          dispatch(setCurrentCity(locationCity));
        }
      } catch (error) {
        console.error("Error fetching current conditions:", error);
      }
    };
    fetchConditions();
  }, [searchParams, dispatch]);

  const handleSearch = (selected: { city: string; key: string }) => {
    console.log(`Search for: ${selected.city}, Key: ${selected.key}`);
    navigate(`?key=${selected.key}&cityName=${selected.city}`);
  };

  return (
    <>
      <AppSearch onSearch={handleSearch} />
      <ForecastHeader />
      <ForecastList />
    </>
  );
};

export default HomePage;
