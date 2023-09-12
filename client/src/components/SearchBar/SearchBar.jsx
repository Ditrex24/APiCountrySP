import style from './Search.module.css';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { getCountriesByName } from '../../redux/action';

export default function SearchBar() {
  const dispatch = useDispatch();
  const [name, setName] = useState('');
  const [error, setError] = useState('');

  const handleChange = (event) => {
    setName(event.target.value);
    setError(''); // Reiniciar el mensaje de error cuando el usuario comienza a escribir.
  };

  const handleClick = (event) => {
    event.preventDefault();

    // Verificar si el nombre contiene números.
    if (/\d/.test(name)) {
      setError('No se permiten números.');
    } else {
      // Realizar la búsqueda solo si el nombre no contiene números.
      dispatch(getCountriesByName(name))
        .catch(() => {
          setError('País no encontrado.');
        });

      setName(''); // Limpiar el campo de búsqueda después de la búsqueda.
    }
  };

  return (
    <div className={style.divInput}>
      <input
        className={style.input}
        type="search"
        onChange={handleChange}
        value={name}
        placeholder="Buscar país"
      />
      <button className={style.button} onClick={handleClick}>
        🔎
      </button>
      {error && <p className={style.error}>{error}</p>}
    </div>
  );
}