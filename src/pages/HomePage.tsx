import AppSearch from "../../components/AppSearch/AppSearch";
import ForecastHeader from "../../components/ForecastHeader/ForecastHeader";
import ForecastList from "../../components/ForecastList/ForecastList";

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
