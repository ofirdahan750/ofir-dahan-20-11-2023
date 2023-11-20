import React, { useState } from 'react';
import TextField from '@mui/material/TextField';
import IconButton from '@mui/material/IconButton';
import SearchIcon from '@mui/icons-material/Search';

interface SearchProps {
  onSearch: (city: string) => void;
}

const AppSearch: React.FC<SearchProps> = ({ onSearch }) => {
  const [city, setCity] = useState('');

  const handleSearch = () => {
    onSearch(city);
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCity(event.target.value);
  };

  return (
    <div style={{ display: 'flex', alignItems: 'center' }}>
      <TextField
        label="City Name"
        variant="outlined"
        value={city}
        onChange={handleInputChange}
      />
      <IconButton onClick={handleSearch}>
        <SearchIcon />
      </IconButton>
    </div>
  );
};

export default AppSearch;
