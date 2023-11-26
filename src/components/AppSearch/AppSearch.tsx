import React, { useState, useRef } from "react";
import TextField from "@mui/material/TextField";
import { fetchAutocomplete } from "../../utils/WeatherApi";
import { useDispatch, useSelector } from "react-redux";
import { setCurrentCity } from "../../store/actions/selectedCityAction";
import useDebounce from "../../custom-hooks/useDebounce";
import { CitySuggestion, SearchProps } from "../../interfaces";
import { setRandomKey } from "../../utils/utils";
import "./AppSearch.css";
import useOutsideClick from "../../custom-hooks/useOutsideClick";

const AppSearch: React.FC<SearchProps> = ({ onSearch }) => {
  const [city, setCity] = useState("");
  const [suggestions, setSuggestions] = useState<CitySuggestion[]>([]);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const dispatch = useDispatch();

  const isDarkMode: boolean = useSelector(
    (state: any) => state.darkModeModule.isDarkMode
  );
  const [errorMessage, setErrorMessage] = useState("");

  useOutsideClick(wrapperRef, () => {
    setSuggestions([]);
  });
  async function callAutocomplete(query: string) {
    if (query.length >= 2) {
      const data = await fetchAutocomplete(query);
      setSuggestions(data);
    } else {
      setSuggestions([]);
    }
  }

  const debounceAutocomplete = useDebounce(callAutocomplete, 3000);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = event.target.value;
    if (/^[a-zA-Z\s\-\(\)]*$/.test(inputValue)) {
      setCity(inputValue);
      debounceAutocomplete(inputValue);
      setErrorMessage("");
    } else {
      setErrorMessage("Please enter English letters only.");
    }
  };

  const handleSuggestionClick = (suggestion: { city: string; key: string }) => {
    dispatch(setCurrentCity(suggestion));
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
          error={!!errorMessage}
          helperText={errorMessage}
          fullWidth
          InputLabelProps={{
            style: { color: isDarkMode ? "#fff" : "" },
          }}
          InputProps={{
            style: {
              color: isDarkMode ? "#fff" : "",

              backgroundColor: isDarkMode ? "rgba(255, 255, 255, 0.1)" : "",
              borderColor: isDarkMode ? "#fff" : "",
            },
          }}
        />
        {suggestions.length > 0 && (
          <ul
            className={`search__autocomplete-dropdown ${
              isDarkMode && "search__autocomplete-dropdown_theme_dark"
            }`}
          >
            {suggestions.map((suggestion: CitySuggestion, index: number) => (
              <li
                key={setRandomKey(index + 1)}
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
