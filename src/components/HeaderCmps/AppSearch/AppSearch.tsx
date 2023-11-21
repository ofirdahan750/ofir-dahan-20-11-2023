import React, { useState, useEffect, useRef } from "react";
import TextField from "@mui/material/TextField";
import { fetchAutocomplete } from "../../../utils/WeatherApi";
import "./AppSearch.css";
import { useDispatch, useSelector } from "react-redux";
import { setCurrentCity } from "../../../store/actions/selectedCityAction";
import useDebounce from "../../../custom-hooks/useDebounce"; // Corrected import path

interface SearchProps {
  onSearch: (selected: { city: string; key: string }) => void;
}

const AppSearch: React.FC<SearchProps> = ({ onSearch }) => {
  const [city, setCity] = useState("");
  const [suggestions, setSuggestions] = useState<any[]>([]);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const dispatch = useDispatch(); 
  const selectedCity = useSelector((state: any) => state.selectedCityModule.selectedCity);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target as Node)) {
        setSuggestions([]);
      }
    };

    if (selectedCity) {
      setCity(selectedCity);
    }

    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, [selectedCity]);

  async function callAutocomplete(query: string) {
    if (query.length >= 2) {
      const data = await fetchAutocomplete(query);
      setSuggestions(data);
    } else {
      setSuggestions([]);
    }
  }

  // Debounce hook usage
  const debounceAutocomplete = useDebounce(callAutocomplete, 3000);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = event.target.value;
    setCity(inputValue);
    debounceAutocomplete(inputValue);
  };

  const handleSuggestionClick = (suggestion: { city: string; key: string }) => {
    dispatch(setCurrentCity(suggestion.city));
    setSuggestions([]);
    onSearch(suggestion); 
  };

  return (
    <div className="search" ref={wrapperRef}>
      <div className="search__text-wrapper">
        <TextField
          label="City Name"
          variant="outlined"
          value={city}
          autoComplete="off"
          onChange={handleInputChange}
          fullWidth
        />
        {suggestions.length > 0 && (
          <ul className="search__autocomplete-dropdown">
            {suggestions.map((suggestion, index) => (
              <li
                key={index}
                className="search__autocomplete-item"
                onClick={() => handleSuggestionClick(suggestion)}
              >
                {suggestion.city}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default AppSearch;
