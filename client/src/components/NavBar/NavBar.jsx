import React from "react";
import style from "./NabBar.module.css";
import { Link } from "react-router-dom";
import SearchBar from "../SearchBar/SearchBar"; // Importa el componente SearchBar

const NavBar = ({ onSearch }) => {
  return (
    <div className={style.containerNavBar}>
      <div className={style.logo}>
        <h1 className="titulo">Countries</h1>
      </div>
      <div className={style.buttons}>
        <SearchBar onSearch={onSearch} className={style.SearchBar} />
        <Link to="/home">
          <button className={style.buttonh}>Home</button>
        </Link>
        <Link to="/Form">
          <button className={style.buttonc}>Crear actividad</button>
        </Link>
        <Link to="/">
          <button className={style.buttonl}>Salir</button>
        </Link>
      </div>
    </div>
  );
};

export default NavBar;
