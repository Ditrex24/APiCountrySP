import style from "./Detail.module.css";
import { getCountriesById } from '../../redux/action.js'; // Importa la acción para obtener detalles de un país
import { useParams } from "react-router-dom"; // Importa useParams para obtener el ID del país de la URL
import { useDispatch, useSelector } from 'react-redux'; // Importa useDispatch y useSelector para interactuar con el estado global
import { useEffect } from "react"; // Importa useEffect para realizar efectos secundarios en el componente

const Detail = () => {
    const dispatch = useDispatch(); // Inicializa useDispatch para enviar acciones al almacenamiento global
    const { id } = useParams(); // Obtiene el parámetro de ID de la URL
    const idPais = id.substring(1); // Extrae el ID del país de la URL sin el prefijo ":"

    const countryDetail = useSelector((state) => state.countryDetail); // Obtiene los detalles del país del estado global

    useEffect(() => {
        // Efecto secundario que se ejecuta cuando el componente se monta o cuando idPais cambia
        dispatch(getCountriesById(idPais)); // Envía una acción para obtener los detalles del país por su ID
    }, [dispatch, idPais]); // Dependencias del efecto, se ejecutará cuando cambien dispatch o idPais

    return (
        <div className={style.Detail}>
            <div className={style.containerDetail}>
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
