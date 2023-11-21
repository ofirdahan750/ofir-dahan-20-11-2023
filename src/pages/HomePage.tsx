import { useNavigate } from "react-router";
import AppSearch from "../components/HeaderCmps/AppSearch/AppSearch";
import ForecastHeader from "../components/HeaderCmps/ForecastHeader/ForecastHeader";
import ForecastList from "../components/HeaderCmps/ForecastList/ForecastList";
import { useSearchParams } from "react-router-dom";
import { useEffect } from "react";
import { fetchCurrentConditions } from '../utils/WeatherApi'; // Adjust the import path as needed


const HomePage = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();


  useEffect(() => {
    const locationKey = searchParams.get('key');
    if (locationKey) {
        fetchCurrentConditions(locationKey)
            .then((data) => {
                console.log('Current Conditions:', data[0]);
            })
            .catch((error) => console.error('Error fetching current conditions:', error));
    }
}, [searchParams]);
  
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
