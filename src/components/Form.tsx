import { useContext, useState } from 'react';
import PlanetContext from '../context/PlanetContext';
import styles from './form.module.css';

const INITIAL_FORM = {
  name: '',
};

const INITIAL_FILTER = {
  id: 0,
  column: 'population',
  filter: 'maior que',
  value: 0,
};

function Form() {
  const { filter } = useContext(PlanetContext);
  const [form, setForm] = useState(INITIAL_FORM);
  const [filterForm, setFilterForm] = useState(INITIAL_FILTER);

  function handleFilter({ target }: React.ChangeEvent<HTMLInputElement |
  HTMLSelectElement>) {
    const { name, value } = target;
    setFilterForm({ ...filterForm, [name]: value });
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
            filter('INPUT_TEXT', value);
          } }
        />
      </div>
      <div className={ styles.container }>
        <select
          data-testid="column-filter"
          name="column"
          defaultValue={ filterForm.column }
          onChange={ handleFilter }
        >
          <option value="population">Population</option>
          <option value="orbital_period">Orbital Period</option>
          <option value="diameter">Diameter</option>
          <option value="rotation_period">Rotation Period</option>
          <option value="surface_water">Surface Water</option>
        </select>
        <select
          data-testid="comparison-filter"
          name="filter"
          defaultValue={ filterForm.filter }
          onChange={ handleFilter }
        >
          <option value="maior que">Maior que</option>
          <option value="menor que">Menor que</option>
          <option value="igual a">Igual a</option>
        </select>
        <input data-testid="value-filter" type="number" />
        <button
          type="button"
          data-testid="button-filter"
          onClick={ (event) => {
            event.preventDefault();
            setFilterForm({ ...filterForm, id: filterForm.id + 1 });
          } }
        >
          Filtrar
        </button>
      </div>
    </form>
  );
}

export default Form;
