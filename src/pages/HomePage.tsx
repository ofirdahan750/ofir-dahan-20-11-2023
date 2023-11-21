import AppSearch from "../components/HeaderCmps/AppSearch/AppSearch";
import ForecastHeader from "../components/HeaderCmps/ForecastHeader/ForecastHeader";
import ForecastList from "../components/HeaderCmps/ForecastList/ForecastList";

const HomePage = () => {
    const handleSearch = (city: string) => {
        console.log(`Search for: ${city}`);
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
