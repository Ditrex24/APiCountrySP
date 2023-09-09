

import {
  GET_COUNTRIES,
  GET_COUNTRIES_BY_NAME,
  GET_COUNTRIES_BY_ID,
  ORDER,
  FILTER_BY_CONTINENT,
  ORDER_POBLATION,
} from "./action";

const initialState = {
  countries: [],
  countryDetail: [],
  allCountries: [],
};

const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_COUNTRIES:
      return {
        ...state,
        countries: action.payload,
        allCountries: action.payload,
      };

    case GET_COUNTRIES_BY_NAME:
      return { ...state, countries: action.payload };

    case GET_COUNTRIES_BY_ID:
      return { countryDetail: action.payload };

    case ORDER: {
      const orderCopy = {
        ...state,
        countries: [...state.countries], // Clonar el array de countries
      };
      if (action.payload === "todos") {
        return {
          ...state,
          countries: state.allCountries,
        };
      }
      const sortedCountries =
        action.payload === "Ascendente"
          ? orderCopy.countries.slice().sort((a, b) => a.name.localeCompare(b.name))
          : orderCopy.countries.slice().sort((a, b) => b.name.localeCompare(a.name));
      return {
        ...state,
        countries: sortedCountries,
      };
    }

    case ORDER_POBLATION: {
      const orderCopy = {
        ...state,
        allCountries: [...state.allCountries], // Clonar el array de allCountries
      };
      if (action.payload === "todos") {
        return {
          ...state,
          countries: state.allCountries,
        };
      }
      const sortedCountries =
        action.payload === "Ascendente"
          ? orderCopy.allCountries.slice().sort((a, b) => a.population - b.population)
          : orderCopy.allCountries.slice().sort((a, b) => b.population - a.population);
      return {
        ...state,
        countries: sortedCountries,
      };
    }

    case FILTER_BY_CONTINENT: {
      if (action.payload === "Todos") {
        return {
          ...state,
          countries: state.allCountries,
        };
      }
      const filteredCountries = state.allCountries.filter(
        (pais) => pais.continent === action.payload
      );
      return {
        ...state,
        countries: filteredCountries,
      };
    }

    default:
      return { ...state };
  }
};

export default rootReducer;
