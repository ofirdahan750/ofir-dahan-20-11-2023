// Base interface for common weather data
interface BaseWeatherData {
  WeatherIcon: number;
  IconPhrase: string;
  HasPrecipitation: boolean;
  MobileLink: string;
  Link: string;
  Icon: number;
}

// Interface for Temperature Data
interface TemperatureData {
  Value: number;
  Unit: string;
  UnitType: number;
}

export interface TodayWeatherData extends Omit<BaseWeatherData, "Temperature"> {
  LocalObservationDateTime: string;
  EpochTime: number;
  WeatherText: string;
  PrecipitationType: string | null;
  IsDayTime: boolean;
  Temperature: {
    Metric: TemperatureData;
    Imperial: TemperatureData;
  };
}

export interface WeeklyWeatherData {
  cityName?: string;
  Date?: string;
  EpochDate: number;
  Temperature: {
    Minimum: TemperatureData;
    Maximum: TemperatureData;
  };
  Day: BaseWeatherData;
  Night: BaseWeatherData;
  Sources: string[];
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
  weeklyConditions: WeeklyWeatherData[];
}

export interface CityCondition {
  cityName: string;
  Day: {
    Icon: number;
    IconPhrase: string;
  };
  Temperature: {
    Minimum: { Value: number };
  };
}
