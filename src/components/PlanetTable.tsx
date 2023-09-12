import { useEffect, useState } from 'react';
import { fetchApi } from '../utils/fethApi';
import { PlanetContextType } from '../types';

export default function PlanetTable() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      const { results } = await fetchApi();
      setData(results);
      setLoading(false);
    }
    fetchData();
  }, []);

  if (loading) {
    <h1>Carregando...</h1>;
  }

  return (
    <table>
      <thead>
        <tr>
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
      <tbody>
        {data.map((info: PlanetContextType) => (
          <tr key={ info.name }>
            <td>{info.name}</td>
            <td>{info.rotation_period}</td>
            <td>{info.orbital_period}</td>
            <td>{info.diameter}</td>
            <td>{info.gravity}</td>
            <td>{info.climate}</td>
            <td>{info.terrain}</td>
            <td>{info.surface_water}</td>
            <td>{info.population}</td>
            <td>{info.films.map((film) => film)}</td>
            <td>{info.created}</td>
            <td>{info.edited}</td>
            <td>{info.url}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
