import style from "./Card.module.css";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

const Card = (props) => {
  const { image, name, continent, id, area } = props; 
  return (
    <Link to={`/detail/:${id}`} className={style.card}>
    <div  className={style.card} >
      
        <img src={image} alt={`imagen de la bandera de ${name}`} />
        <p> País: {name}</p>
        <p> Contienete: {continent} </p>
   
      
    </div>
    </Link>
  );
};

Card.propTypes = {
  image: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  continent: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
};

export default Card;
