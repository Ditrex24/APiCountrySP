import axios from "axios";

export const GET_COUNTRIES = "GET_COUNTRIES";
export const GET_COUNTRIES_BY_NAME = "GET_COUNTRIES_BY_NAME";
export const GET_COUNTRIES_BY_ID = "GET_COUNTRIES_BY_ID";
export const GET_ACTIVITY = "GET_ACTIVITY";
export const ORDER = "ORDER";
export const ORDER_POBLATION = "ORDER_POBLATION"
export const FILTER_BY_CONTINENT = "FILTER_BY_CONTINENT";
export const FILTER_BY_ACTIVITY = "FILTER_BY_ACTIVITY";

export{loadContent,loadActivities}

const LOAD_CONTENT='LOAD_CONTENT'
const LOAD_ACTIVITIES= 'LOAD_ACTIVITIES'




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

const loadContent = () => {
    return async (dispatch) => {
        try {
            dispatch(setLoading(true)); // Set loading status to true
            const { data } = await axios.get('http://localhost:3001/countries');
            dispatch({
                type: LOAD_CONTENT,
                payload: data,
            });
            dispatch(setLoading(false)); // Set loading status to false after fetching
        } catch (err) {
            console.error(err);
            dispatch(setLoading(false)); // Set loading status to false on error
        }
    };
};

const loadActivities=()=>{
    return async (dispatch) => {
        try{
        dispatch(setLoading(true))
        const {data}= await axios.get('http://localhost:3001/activities')
                dispatch({
                    type: LOAD_ACTIVITIES,
                    payload: data,
                });
                dispatch(setLoading(false))
        }
        catch (err){
            console.log(err)
            dispatch(setLoading(false))
        }
    };
}


export const setOrderCountry = (order) => {
    return { type: ORDER , payload: order }
}

export const setOrderByPoblation = (order) => {
    return { type: ORDER_POBLATION , payload: order}
}

export const setFilterCounrtryByContinent = (filter) => {
    return { type: FILTER_BY_CONTINENT , payload: filter }
}



export const filterCountriesByActivity = (activity) => {
  return {
    type: FILTER_BY_ACTIVITY,
    payload: activity,
  };
};




