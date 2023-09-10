import React from 'react';
import style from "./Landing.module.css"
import Fondo from "../../assets/PlanetaGirando.mp4"
import Logo from "../../assets/logo.png"
import giticon from "../../assets/githubIcon.png"
import linkicon from "../../assets/linkedincon.png"
import { Link } from "react-router-dom";

const Landing = () => {
  return (
    <div className={style.containerLanding}>
      {/* Video de fondo */}
      <video src={Fondo} autoPlay loop muted className={style.videoBackground}>
        Tu navegador no soporta videos.
      </video>

      <div className={style.icons}>
        {/* Enlace a GitHub */}
        <a href="https://github.com/Ditrex24" target="_blank" rel="noopener noreferrer">
          <img className={style.giticon} src={giticon} alt="github" />
        </a>

        {/* Enlace a LinkedIn */}
        <a href="https://www.linkedin.com/in/sergio-vasquez-6752aa264/" target="_blank" rel="noopener noreferrer">
          <img className={style.linkicon} src={linkicon} alt="linkedin" />
        </a>
      </div>

      <div className={style.boxTitulo}>
        {/* Título */}
        <h1 className={style.titulo}> Presiona el avion para viajar </h1>
      </div>

      <div className={style.Cbutton}>
        {/* Botón que redirige a la página de inicio */}
        <Link to="/home">
          <div className={style.button}>
            <img src={Logo} alt="Botón de Viajar" />
          </div>
        </Link>
      </div>
    </div>
  );
}

export default Landing;
