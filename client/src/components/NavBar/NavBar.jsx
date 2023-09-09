import style from "./NabBar.module.css"
import { Link } from "react-router-dom";


const NavBar = ()=> {
    return(
        <div className={style.containerNavBar}>
        <div className={style.logo}>
           
            <h1 className="titulo">Countries</h1>
        </div>
        <div className={style.buttons}>
        <Link to="/">
                <button className={style.buttonl}>Landing</button>
            </Link>
            <Link to="/home">
                <button className={style.buttonh}>Home</button>
            </Link>
            <Link to="/Form">
                <button className={style.buttonc}>Crear actividad</button>
            </Link>
            <Link to="/about">
                <button className={style.buttona}>About</button>
            </Link>
        </div>
            
        </div>
    )
}

export default NavBar;