import React, { useState, useCallback, useEffect, useRef } from "react";
import TextField from "@mui/material/TextField";
import { fetchAutocomplete } from "../../../utils/WeatherApi";
import "./AppSearch.css";

interface SearchProps {
  onSearch: (selected: { city: string; key: string }) => void;
}

const AppSearch: React.FC<SearchProps> = ({ onSearch }) => {
  const [city, setCity] = useState("");
  const [suggestions, setSuggestions] = useState<any[]>([]);
  const wrapperRef = useRef<HTMLDivElement>(null);

  const debounce = (func: (...args: any[]) => void, delay: number) => {
    let timer: any = null;
    return (...args: any[]) => {
      if (timer) {
        clearTimeout(timer);
      }
      timer = setTimeout(() => func(...args), delay);
    };
  };

  const clearSuggestions = () => setSuggestions([]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        wrapperRef.current &&
        !wrapperRef.current.contains(event.target as Node)
      ) {
        clearSuggestions();
      }
    };

    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [wrapperRef]);

  const callAutocomplete = async (query: string) => {
    const data = await fetchAutocomplete(query);
    console.log("data:", data);
    if (city.length >= 2) {
      setSuggestions(data);
    } else {
      clearSuggestions();
    }
  };

  const debounceAutocomplete = useCallback(debounce(callAutocomplete, 3000), [
    city,
  ]);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = event.target.value;
    setCity(inputValue);
    if (inputValue.length >= 2) {
      debounceAutocomplete(inputValue);
    } else {
      clearSuggestions();
    }
  };


  const handleSuggestionClick = (suggestion: { city: string; key: string }) => {
    setCity(suggestion.city);
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
