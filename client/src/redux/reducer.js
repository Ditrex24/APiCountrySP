import {
  GET_COUNTRIES,
  GET_COUNTRIES_BY_NAME,
  GET_COUNTRIES_BY_ID,
  ORDER,
  FILTER_BY_CONTINENT,
  ORDER_POBLATION,
  FILTER_BY_ACTIVITY , // Agregado para filtrar por actividad
} from "./action";

const initialState = {
  countries: [],
  countryDetail: [],
  allCountries: [],
  allActivities: [], // Agregado para almacenar todas las actividades
  selectedActivity: [], // Agregado para almacenar la actividad seleccionada
};

// ... Importaciones y estado inicial

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
      // Crea una copia del estado actual
      const newState = { ...state };
      
      if (action.payload === "todos") {
        return {
          ...newState,
          countries: state.allCountries,
        };
      }
      
      // Aplica el filtro de orden sin afectar otros datos
      const sortedCountries =
        action.payload === "Ascendente"
          ? newState.countries.slice().sort((a, b) => a.name.localeCompare(b.name))
          : newState.countries.slice().sort((a, b) => b.name.localeCompare(a.name));
      
      return {
        ...newState,
        countries: sortedCountries,
      };
    }

    case ORDER_POBLATION: {
      // Crea una copia del estado actual
      const newState = { ...state };

      if (action.payload === "todos") {
        return {
          ...newState,
          countries: state.allCountries,
        };
      }

      // Aplica el filtro de orden por población sin afectar otros datos
      const sortedCountries =
        action.payload === "Ascendente"
          ? newState.countries.slice().sort((a, b) => a.population - b.population)
          : newState.countries.slice().sort((a, b) => b.population - a.population);

      return {
        ...newState,
        countries: sortedCountries,
      };
    }

    case FILTER_BY_CONTINENT: {
      // Crea una copia del estado actual
      const newState = { ...state };

      if (action.payload === "Todos") {
        return {
          ...newState,
          countries: state.allCountries,
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
      // Crea una copia del estado actual
      const newState = { ...state };

      if (action.payload === 'All' || action.payload === 'Null') {
        // Aplica el filtro por actividad sin afectar otros datos
        const Activity = (newState.allCountries || []).filter((country) =>
          country.Activities.some((activity) =>
            (newState.allActivity || []).some((allActivity) =>
              activity.name.includes(allActivity.name)
            )
          )
        );

        return {
          ...newState,
          countries: Activity,
          selectedActivity: action.payload, // Actualizar la actividad seleccionada
        };
      } else {
        const selectedActivity = action.payload;
        // Aplica el filtro por actividad sin afectar otros datos
        const filteredActivities = newState.allCountries.filter((country) =>
          country.Activity.some((activity) =>
            activity?.name.includes(selectedActivity)
          )
        );

        return {
          ...newState,
          countries: filteredActivities,
          selectedActivity: action.payload, // Actualizar la actividad seleccionada
        };
      }
    }

    default:
      return { ...state };
  }
};

export default rootReducer;


