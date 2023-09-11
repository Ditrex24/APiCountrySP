import {
  GET_COUNTRIES,
  GET_COUNTRIES_BY_NAME,
  GET_COUNTRIES_BY_ID,
  ORDER,
  FILTER_BY_CONTINENT,
  ORDER_POBLATION,
  FILTER_BY_ACTIVITY, // Agregado para filtrar por actividad
} from "./action";

const initialState = {
  countries: [],
  countryDetail: [],
  allCountries: [],
  allActivities: [], // Agregado para almacenar todas las actividades
  selectedActivity: [], // Agregado para almacenar la actividad seleccionada
};

const rootReducer = (state = initialState, action) => {
  // Crea una copia del estado actual
  const newState = { ...state };

  switch (action.type) {
    case GET_COUNTRIES:
      return {
        ...newState,
        countries: action.payload,
        allCountries: action.payload,
      };

    case GET_COUNTRIES_BY_NAME:
      return { ...newState, countries: action.payload };

    case GET_COUNTRIES_BY_ID:
      return { ...newState, countryDetail: action.payload };

    case ORDER: {
      // Aplica el filtro de orden sin afectar otros datos
      let sortedCountries = [...newState.countries];

      if (action.payload === "Ascendente") {
        sortedCountries = sortedCountries.sort((a, b) => a.name.localeCompare(b.name));
      } else if (action.payload === "Descendente") {
        sortedCountries = sortedCountries.sort((a, b) => b.name.localeCompare(a.name));
      }

      return {
        ...newState,
        countries: sortedCountries,
      };
    }

    case ORDER_POBLATION: {
      // Aplica el filtro de orden por población sin afectar otros datos
      let sortedCountries = [...newState.countries];

      if (action.payload === "Ascendente") {
        sortedCountries = sortedCountries.sort((a, b) => a.population - b.population);
      } else if (action.payload === "Descendente") {
        sortedCountries = sortedCountries.sort((a, b) => b.population - a.population);
      }

      return {
        ...newState,
        countries: sortedCountries,
      };
    }

    case FILTER_BY_CONTINENT: {
      if (action.payload === "Todos") {
        return {
          ...newState,
          countries: newState.allCountries,
        };
      }

      // Aplica el filtro por continente sin afectar otros datos
      const filteredCountries = newState.allCountries.filter(
        (pais) => pais.continent === action.payload
      );

      return {
        ...newState,
        countries: filteredCountries,
      };
    }

    case FILTER_BY_ACTIVITY: {
      if (action.payload === 'All' || action.payload === 'Null') {
        // Aplica el filtro por actividad sin afectar otros datos
        const filteredCountries = newState.allCountries.filter((country) =>
          country.Activities && country.Activities.some((activity) =>
            newState.allActivities.some((allActivity) =>
              activity.name.includes(allActivity.name)
            )
          )
        );

        return {
          ...newState,
          countries: filteredCountries,
          selectedActivity: action.payload, // Actualizar la actividad seleccionada
        };
      } else {
        const selectedActivity = action.payload;
        // Aplica el filtro por actividad sin afectar otros datos
        const filteredCountries = newState.allCountries.filter((country) =>
          country.Activities.some((activity) =>
            activity?.name.includes(selectedActivity)
          )
        );

        return {
          ...newState,
          countries: filteredCountries,
          selectedActivity: action.payload, // Actualizar la actividad seleccionada
        };
      }
    }

    default:
      return { ...newState };
  }
};

export default rootReducer;

