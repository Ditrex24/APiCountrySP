import style from "./Detail.module.css";
import { getCountriesById } from '../../redux/action.js';
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from "react";

const Detail = () => {
    const dispatch = useDispatch();
    const { id } = useParams();
    const idPais = id.substring(1); 

    const countryDetail = useSelector((state) => state.countryDetail);

    useEffect(() => {
        dispatch(getCountriesById(idPais));
    }, [dispatch, idPais]);

    return (
        <div className={style.Detail}>
        <div className={style.containerDetail}>
            <h1>Detalle del País</h1>
            <h2>{countryDetail.name}</h2>
            <p>ID: {idPais}</p>
            <p>Continente: {countryDetail.continent}</p>
            <p>Capital: {countryDetail.capital}</p>
            <p>Subregión: {countryDetail.subregion}</p>
            <p>Área: {countryDetail.area}</p>
            <p>Población: {countryDetail.population}</p>
            <img src={countryDetail.image} alt={`Bandera de ${countryDetail.name}`} />
          
        </div>
        </div>
    );
}

export default Detail;
