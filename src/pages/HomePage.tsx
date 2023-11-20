import AppSearch from "../../components/AppSearch/AppSearch";
import ForecastHeader from "../../components/ForecastHeader/ForecastHeader";

const HomePage = () => {
    const handleSearch = (city: string) => {
        console.log(`Search for: ${city}`);
      };
  return (
    <>
      <AppSearch onSearch={handleSearch} />
      <ForecastHeader />
    </>
  );
};
export default HomePage;
