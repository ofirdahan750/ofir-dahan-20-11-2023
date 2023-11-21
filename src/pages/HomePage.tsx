import { useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import AppSearch from "../components/HeaderCmps/AppSearch/AppSearch";
import ForecastHeader from "../components/HeaderCmps/ForecastHeader/ForecastHeader";
import ForecastList from "../components/HeaderCmps/ForecastList/ForecastList";

import { fetchCurrentConditions } from '../utils/WeatherApi'; // Adjust the import path as needed
import { setCurrentConditions } from "../store/actions/currentConditionsAction";

const HomePage = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const dispatch = useDispatch(); // useDispatch hook for dispatching actions
  const currentConditions = useSelector((state:any) => state.currentConditionsModule.currentConditions);

  useEffect(() => {
    const locationKey = searchParams.get('key');
    if (locationKey) {
      fetchCurrentConditions(locationKey)
        .then((data) => {
          console.log('Current Conditions:', data[0]);
          dispatch(setCurrentConditions(data[0])); // Dispatch the action with the API response data
        })
        .catch((error) => console.error('Error fetching current conditions:', error));
    }
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
