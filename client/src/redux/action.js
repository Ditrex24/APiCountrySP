import axios from "axios";  // Importa axios para realizar solicitudes HTTP

// Definición de acciones como constantes
export const GET_COUNTRIES = "GET_COUNTRIES";
export const GET_COUNTRIES_BY_NAME = "GET_COUNTRIES_BY_NAME";
export const GET_COUNTRIES_BY_ID = "GET_COUNTRIES_BY_ID";
export const GET_ACTIVITY = "GET_ACTIVITY";
export const ORDER = "ORDER";
export const ORDER_POBLATION = "ORDER_POBLATION";
export const FILTER_BY_CONTINENT = "FILTER_BY_CONTINENT";
export const FILTER_BY_ACTIVITY = "FILTER_BY_ACTIVITY";

// Importa funciones adicionales loadContent y loadActivities
export { loadContent, loadActivities };

// Definición de acciones como constantes adicionales
const LOAD_CONTENT = "LOAD_CONTENT";
const LOAD_ACTIVITIES = "LOAD_ACTIVITIES";

// Acción para obtener todos los países
export const getCountries = () => {
  return async (dispatch) => {
    // Realiza una solicitud GET a la API para obtener todos los países
    const apiData = await axios.get("http://localhost:3001/countries");
    const countries = apiData.data;

    // Despacha la acción GET_COUNTRIES con los países obtenidos
    return dispatch({
      type: GET_COUNTRIES,
      payload: countries,
    });
  };
};

// Acción para obtener países por nombre
export const getCountriesByName = (name) => {
  return async (dispatch) => {
    // Realiza una solicitud GET a la API para obtener países por nombre
    const apiData = await axios.get(`http://localhost:3001/countries/name?name=${name}`);
    const countries = apiData.data;

    // Despacha la acción GET_COUNTRIES_BY_NAME con los países obtenidos
    return dispatch({
      type: GET_COUNTRIES_BY_NAME,
      payload: countries,
    });
  };
};

// Acción para obtener un país por su ID
export const getCountriesById = (idPais) => {
  return async (dispatch) => {
    // Realiza una solicitud GET a la API para obtener un país por su ID
    const apiData = await axios.get(`http://localhost:3001/countries/${idPais}`);
    const countries = apiData.data;

    // Despacha la acción GET_COUNTRIES_BY_ID con el país obtenido
    return dispatch({
      type: GET_COUNTRIES_BY_ID,
      payload: countries,
    });
  };
};

// Acción para obtener todas las actividades
export const getActivity = () => async (dispatch) => {
  // Realiza una solicitud GET a la API para obtener todas las actividades
  const activity = await axios.get('http://localhost:3001/activities');

  // Despacha la acción GET_ACTIVITY con las actividades obtenidas
  return dispatch({
    type: GET_ACTIVITY,
    payload: activity.data,
  });
};

// Función para cargar contenido
const loadContent = () => {
  return async (dispatch) => {
    try {
      dispatch(setLoading(true)); // Activa el estado de carga

      // Realiza una solicitud GET a la API para cargar contenido
      const { data } = await axios.get('http://localhost:3001/countries');

      // Despacha la acción LOAD_CONTENT con los datos cargados
      dispatch({
        type: LOAD_CONTENT,
        payload: data,
      });

      dispatch(setLoading(false)); // Desactiva el estado de carga
    } catch (err) {
      console.error(err);
      dispatch(setLoading(false)); // Desactiva el estado de carga en caso de error
    }
  };
};

// Función para cargar actividades
const loadActivities = () => {
  return async (dispatch) => {
    try {
      dispatch(setLoading(true)); // Activa el estado de carga

      // Realiza una solicitud GET a la API para cargar actividades
      const { data } = await axios.get('http://localhost:3001/activities');

      // Despacha la acción LOAD_ACTIVITIES con las actividades cargadas
      dispatch({
        type: LOAD_ACTIVITIES,
        payload: data,
      });

      dispatch(setLoading(false)); // Desactiva el estado de carga
    } catch (err) {
      console.log(err);
      dispatch(setLoading(false)); // Desactiva el estado de carga en caso de error
    }
  };
};

// Acción para establecer el orden de países
export const setOrderCountry = (order) => {
  return { type: ORDER, payload: order };
};

// Acción para establecer el orden por población
export const setOrderByPoblation = (order) => {
  return { type: ORDER_POBLATION, payload: order };
};

// Acción para filtrar países por continente
export const setFilterCounrtryByContinent = (filter) => {
  return { type: FILTER_BY_CONTINENT, payload: filter };
};

// Acción para filtrar países por actividad
export const filterCountriesByActivity = (activity) => {
  return {
    type: FILTER_BY_ACTIVITY,
    payload: activity,
  };
};
