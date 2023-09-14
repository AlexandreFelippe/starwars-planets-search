import { useContext, useState } from 'react';
import PlanetContext from '../context/PlanetContext';
import styles from './form.module.css';

const INITIAL_FILTER = {
  id: 0,
  name: '',
  column: 'population',
  filter: 'maior que',
  value: '0',
};

function Form() {
  const { allFilters } = useContext(PlanetContext);
  const [form, setForm] = useState(INITIAL_FILTER);

  function handleFilter({ target }: React.ChangeEvent<HTMLInputElement |
  HTMLSelectElement>) {
    const { name, value } = target;
    setForm({ ...form, [name]: value });
  }

  return (
    <form>
      <div className={ styles.container }>
        <input
          data-testid="name-filter"
          type="text"
          name="name"
          onChange={ ({ target: { value, name } }) => {
            setForm({ ...form, [name]: value });
            allFilters('INPUT_TEXT', value);
          } }
        />
      </div>
      <div className={ styles.container }>
        <select
          data-testid="column-filter"
          name="column"
          defaultValue={ form.column }
          onChange={ handleFilter }
        >
          <option value="population">population</option>
          <option value="orbital_period">orbital_period</option>
          <option value="diameter">diameter</option>
          <option value="rotation_period">rotation_period</option>
          <option value="surface_water">surface_water</option>
        </select>
        <select
          data-testid="comparison-filter"
          name="filter"
          defaultValue={ form.filter }
          onChange={ handleFilter }
        >
          <option value="maior que">maior que</option>
          <option value="menor que">menor que</option>
          <option value="igual a">igual a</option>
        </select>
        <input
          data-testid="value-filter"
          type="number"
          onChange={ handleFilter }
          name="value"
          value={ form.value }
        />
        <button
          type="button"
          data-testid="button-filter"
          onClick={ () => {
            const { column, filter, value } = form;
            allFilters('SELECT_COLUMN', { column, filter, value });
          } }
        >
          Filtrar
        </button>
      </div>
    </form>
  );
}

export default Form;
