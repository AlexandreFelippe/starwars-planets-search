import { useContext, useState } from 'react';
import { PlanetType } from '../types';
import PlanetContext from '../context/PlanetContext';

const INITIAL_ORDER = {
  column: 'population',
  sort: 'ASC',
};

export default function Sort() {
  const [order, setOrder] = useState(INITIAL_ORDER);
  const { data, setData } = useContext(PlanetContext);

  function handleChange(target: { name: string, value: string }) {
    const { name, value } = target;
    setOrder({
      ...order,
      [name]: value,
    });
  }

  function sortPlanets(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const { column, sort } = order;
    let sortedPlanets = data
      .filter((planet) => Number.isNaN(Number(planet[column])) === false);
    const planetsWithNun = data
      .filter((planet) => Number.isNaN(Number(planet[column])) === true);
    sortedPlanets = sortedPlanets.sort((a: PlanetType, b: PlanetType) => (sort === 'ASC'
      ? Number(a[column]) - Number(b[column])
      : Number(b[column]) - Number(a[column])));
    setData([...sortedPlanets, ...planetsWithNun]);
  }

  return (
    <form onSubmit={ sortPlanets }>
      <select
        name="column"
        data-testid="column-sort"
        onChange={ ({ target }) => handleChange(target) }
      >
        <option value="population">population</option>
        <option value="orbital_period">orbital_period</option>
        <option value="diameter">diameter</option>
        <option value="rotation_period">rotation_period</option>
        <option value="surface_water">surface_water</option>
      </select>
      <label>
        ASC
        <input
          name="sort"
          type="radio"
          data-testid="column-sort-input-asc"
          onChange={ () => handleChange({ value: 'ASC', name: 'sort' }) }
        />
      </label>
      <label>
        DESC
        <input
          name="sort"
          type="radio"
          data-testid="column-sort-input-desc"
          onChange={ () => handleChange({ value: 'DESC', name: 'sort' }) }
        />
      </label>
      <button
        data-testid="column-sort-button"
      >
        Ordenar
      </button>
    </form>
  );
}
