import React, { useState, useCallback, useEffect, useRef } from "react";
import TextField from "@mui/material/TextField";
import IconButton from "@mui/material/IconButton";
import SearchIcon from "@mui/icons-material/Search";
import { fetchAutocomplete } from "../../../utils/WeatherApi";
import "./AppSearch.css";

interface SearchProps {
  onSearch: (city: string) => void;
}

const AppSearch: React.FC<SearchProps> = ({ onSearch }) => {
  const [city, setCity] = useState("");
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const wrapperRef = useRef<HTMLDivElement>(null); // Correctly typed ref

  // Debounce function
  const debounce = (func: (...args: any[]) => void, delay: number) => {
    let timer: any = null;
    return (...args: any[]) => {
      if (timer) {
        clearTimeout(timer);
      }
      timer = setTimeout(() => func(...args), delay);
    };
  };

  // Function to clear suggestions
  const clearSuggestions = () => setSuggestions([]);

  // Detect click outside component
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target as Node)) {
        clearSuggestions();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [wrapperRef]);

  const callAutocomplete = async (query: string) => {
    const data = await fetchAutocomplete(query);
    if (city.length >= 2) {
      setSuggestions(data);
    } else {
      clearSuggestions();
    }
  };

  const debounceAutocomplete = useCallback(
    debounce(callAutocomplete, 3000),
    [city]
  );

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = event.target.value;
    setCity(inputValue);
    if (inputValue.length >= 2) {
      debounceAutocomplete(inputValue);
    } else {
      clearSuggestions();
    }
  };

  const handleSearch = () => {
    onSearch(city);
  };

  const handleSuggestionClick = (suggestion: string) => {
    setCity(suggestion);
    clearSuggestions();
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
                {suggestion}
              </li>
            ))}
          </ul>
        )}
        <IconButton onClick={handleSearch}>
          <SearchIcon />
        </IconButton>
      </div>
    </div>
  );
};

export default AppSearch;
