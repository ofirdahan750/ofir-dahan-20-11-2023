import AppSearch from "../../components/AppSearch/AppSearch";

const HomePage = () => {
    const handleSearch = (city: string) => {
        console.log(`Search for: ${city}`);
      };
return(
    <AppSearch onSearch={handleSearch} />

)
}
export default HomePage