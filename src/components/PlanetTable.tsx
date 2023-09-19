import { useContext } from 'react';
import { PlanetType } from '../types';
import PlanetContext from '../context/PlanetContext';
import styles from './PlanetTable.module.css';

export default function PlanetTable() {
  const { data, loading } = useContext(PlanetContext);

  if (loading) {
    return <h1>Carregando...</h1>;
  }

  return (
    <table className={ styles.tabela }>
      <thead>
        <tr className={ styles.header }>
          <th>Name</th>
          <th>Rotation Period</th>
          <th>Orbital Period</th>
          <th>Diameter</th>
          <th>Gravity</th>
          <th>Climate</th>
          <th>Terrain</th>
          <th>Surface Water</th>
          <th>Population</th>
          <th>Films</th>
          <th>Created</th>
          <th>Edited</th>
          <th>URL</th>
        </tr>
      </thead>
      <tbody className={ styles.tbody }>
        {data.map((info: PlanetType) => (
          <tr
            key={ info.name }

          >
            <td
              data-testid="planet-name"
            >
              {info.name}
            </td>
            <td>{info.rotation_period}</td>
            <td>{info.orbital_period}</td>
            <td>{info.diameter}</td>
            <td>{info.gravity}</td>
            <td>{info.climate}</td>
            <td>{info.terrain}</td>
            <td>{info.surface_water}</td>
            <td>{info.population}</td>
            <td className={ styles.film }>{info.films.map((film) => film)}</td>
            <td>{info.created}</td>
            <td>{info.edited}</td>
            <td>{info.url}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
