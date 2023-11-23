// Common structures for temperature and weather data
interface Temperature {
  Value: number;
  Unit: string;
  UnitType: number;
}

interface WeatherIconData {
  Icon: number;
  IconPhrase: string;
}

// Base interface for common weather data
interface BaseWeatherData extends WeatherIconData {
  HasPrecipitation: boolean;
  MobileLink: string;
  Link: string;
}

// Extended interfaces for specific data
export interface TodayWeatherData extends BaseWeatherData {
  LocalObservationDateTime: string;
  EpochTime: number;
  WeatherText: string;
  PrecipitationType: string | null;
  IsDayTime: boolean;
  Temperature: {
    Metric: Temperature;
    Imperial: Temperature;
  };
}

export interface WeeklyWeatherData {
  cityName?: string;
  Date?: string;
  EpochDate: number;
  Temperature: {
    Minimum: Temperature;
    Maximum: Temperature;
  };
  Day: BaseWeatherData;
  Night: BaseWeatherData;
  Sources: string[];
  index?: number;
}

export interface CitySuggestion {
  city: string;
  key: string;
}

export interface LocationData {
  Version: number;
  Key: string;
  Type: string;
  Rank: number;
  LocalizedName: string;
  Country: {
    ID: string;
    LocalizedName: string;
  };
  AdministrativeArea: {
    ID: string;
  };
}

export interface SearchProps {
  onSearch: (selected: CitySuggestion) => void;
}

export interface ForecastListProps {
  conditionsList: WeeklyWeatherData[];
}

export interface CityCondition {
  cityName: string;
  Day: WeatherIconData;
  Temperature: {
    Minimum: { Value: number };
  };
}

export interface ForecastCardProps {
  card: WeeklyWeatherData;
  index: number;
}
