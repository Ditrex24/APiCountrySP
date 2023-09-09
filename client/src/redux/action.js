import axios from "axios";

export const GET_COUNTRIES = "GET_COUNTRIES";
export const GET_COUNTRIES_BY_NAME = "GET_COUNTRIES_BY_NAME";
export const GET_COUNTRIES_BY_ID = "GET_COUNTRIES_BY_ID";
export const GET_ACTIVITY = "GET_ACTIVITY";
export const ORDER = "ORDER";
export const ORDER_POBLATION = "ORDER_POBLATION"
export const FILTER_BY_CONTINENT = "FILTER_BY_CONTINENT";




export const getCountries = () => {

    return async (dispatch) =>{
        const apiData = await axios.get("http://localhost:3001/countries");
        const countries = apiData.data
       return dispatch({
        type:GET_COUNTRIES , 
        payload: countries
    })
    }
}

export const getCountriesByName = (name) => {
    return async (dispatch) => {
        const apiData = await axios.get(`http://localhost:3001/countries/name?name=${name}`);
        const countries = apiData.data
        return dispatch({
            type:GET_COUNTRIES_BY_NAME, 
            payload: countries
        })
    }
}

export const getCountriesById = (idPais) => {
    return async (dispatch) => {
        const apiData = await axios.get(`http://localhost:3001/countries/${idPais}`);
        const countries = apiData.data
        return dispatch({
            type:GET_COUNTRIES_BY_ID,
             payload: countries
            })
    }
}

export const getActivity = () => async (dispatch) => {
    const activity = await axios.get('http://localhost:3001/activities');
    return dispatch({
        type: GET_ACTIVITY,
        payload: activity.data
    });
};


export const setOrderCountry = (order) => {
    return { type: ORDER , payload: order }
}

export const setOrderByPoblation = (order) => {
    return { type: ORDER_POBLATION , payload: order}
}

export const setFilterCounrtryByContinent = (filter) => {
    return { type: FILTER_BY_CONTINENT , payload: filter }
}

