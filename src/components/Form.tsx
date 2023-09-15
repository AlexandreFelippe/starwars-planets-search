import { useContext, useState } from 'react';
import PlanetContext from '../context/PlanetContext';
import styles from './form.module.css';
// import { FiltersType } from '../types';

const ColumnFilter = ['population', 'orbital_period',
  'diameter', 'rotation_period', 'surface_water'];

const INITIAL_FILTER = {
  name: '',
  column: 'population',
  filter: 'maior que',
  value: '0',
};

function Form() {
  const { allFilters, setData, backup,
    setFiltersArray, filtersArray, restoreFilters } = useContext(PlanetContext);
  const [renderFilter, setRenderFilter] = useState(false);
  const [columnFilter, setColumnFilter] = useState(ColumnFilter);
  const [form, setForm] = useState(INITIAL_FILTER);
  console.log(form);

  function handleFilter({ target }: React.ChangeEvent<HTMLInputElement |
  HTMLSelectElement>) {
    const { name, value } = target;
    setForm({ ...form, [name]: value });
    // setAllrendersFilters(...allRenderFilters, renderFilter);
  }

  function handleDeleteFilters() {
    setRenderFilter(false);
    setData(backup);
  }

  function hiddenColumn(value: string) {
    if (form.column.length && form.column === value) {
      const newFilter = columnFilter.filter((op) => op !== value);
      setColumnFilter(newFilter);
    }
  }

  return (
    <>
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
            {columnFilter.map((column, i) => (
              <option
                key={ i }
                value={ column }
              >
                {column}
              </option>
            ))}
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
              setRenderFilter(true);
              hiddenColumn(form.column);
              setFiltersArray([...filtersArray, { column, filter, value }]);
              setForm({
                ...form,
                column: columnFilter.filter((op) => op !== column)[0] || '' });
            } }
          >
            Filtrar
          </button>
        </div>
      </form>
      {filtersArray && filtersArray.map((filter) => (
        <div
          key={ filter.column }
          data-testid="filter"
        >
          <p>
            {filter.column}
            {' '}
            {filter.filter}
            {' '}
            {filter.value}
          </p>
          <button
            onClick={ () => {
              restoreFilters(filter.column);
              setColumnFilter([...columnFilter, filter.column]);
            } }
          >
            X
          </button>
        </div>
      ))}
      <button
        data-testid="button-remove-filters"
        onClick={ handleDeleteFilters }
      >
        Remover Filtros
      </button>
    </>
  );
}

export default Form;
