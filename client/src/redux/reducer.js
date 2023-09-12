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
        // console.log("sin orden");
        return {
          ...state,
          countries: state.allCountries,
        };
      }
      const sortdeCountries =
        action.payload === "Ascendente"
          ? orderCopy.countries
              .slice()
              .sort((a, b) => a.name.localeCompare(b.name))
          : orderCopy.countries
              .slice()
              .sort((a, b) => b.name.localeCompare(a.name));
      // console.log(sortdeCountries);
      return {
        ...state,
        countries: sortdeCountries,
      };
    }
    case ORDER_POBLATION:  {
      const orderCopy = {
        ...state,
        countries: [...state.countries], // Clonar el array de countries
      };
      if (action.payload === "todos") {
        // console.log("sin orden");
        return {
          ...state,
          countries: state.allCountries,
        };
      }
      const sortdeCountries =
        action.payload === "Ascendente"
          ? orderCopy.countries
              .slice()
              .sort((a, b) => a.population - b.population)
          : orderCopy.countries
              .slice()
              .sort((a, b) => b.population - a.population);
      // console.log(sortdeCountries);
      return {
        ...state,
        countries: sortdeCountries,
      };
    }

    case FILTER_BY_CONTINENT: {
      if (action.payload === "Todos") {
        return console.log("Todos funciona");
      }
      if (action.payload === "Africa") {
        const filterAfrica = state.allCountries.filter(
          (pais) => pais.continent === "Africa"
        );
        // console.log(filterAfrica);
        return {
          ...state,
          countries: filterAfrica,
        };
      }
      if (action.payload === "Oceania") {
        const filterOcenia = state.allCountries.filter(
          (pais) => pais.continent === "Oceania"
        );
        console.log(filterOcenia);
        return {
          ...state,
          countries: filterOcenia,
        };
      }
      if (action.payload === "North America") {
        const filterAmericaN = state.allCountries.filter(
          (pais) => pais.continent === "North America"
        );
        // console.log("North America funciona");
        return {
          ...state,
          countries: filterAmericaN,
        };
      }
      if (action.payload === "South America") {
        const filterAmericaS = state.allCountries.filter(
          (pais) => pais.continent === "South America"
        );
        // console.log("South America funciona");
        return {
          ...state,
          countries: filterAmericaS,
        };
      }
      if (action.payload === "Europe") {
        const filterEurope = state.allCountries.filter(
          (pais) => pais.continent === "Europe"
        );
        // console.log("Europe");
        return {
          ...state,
          countries: filterEurope,
        };
      }
      if (action.payload === "Asia") {
        const filterAsia = state.allCountries.filter(
          (pais) => pais.continent === "Asia"
        );
        // console.log("Asia funciona");
        return {
          ...state,
          countries: filterAsia,
        };
      }
      if (action.payload === "Antarctica") {
        const filterAntartica = state.allCountries.filter(
          (pais) => pais.continent === "Antarctica"
        );
        // console.log("Antarctica");
        return {
          ...state,
          countries: filterAntartica,
        };
      }
      return state;
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
      return { ...state };
  }
};

export default rootReducer;

