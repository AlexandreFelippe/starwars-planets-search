import { useEffect, useState } from 'react';
import PlanetContext from './PlanetContext';
import { PlanetType, ColumnType, FiltersType } from '../types';
import { fetchApi } from '../utils/fethApi';

type PlanetProviderProps = {
  children: React.ReactNode
};

function PlanetProvider({ children }: PlanetProviderProps) {
  const [data, setData] = useState<PlanetType[]>([]);
  const [backup, setBackup] = useState<PlanetType[]>([]);
  const [loading, setLoading] = useState(true);
  const [filtersArray, setFiltersArray] = useState<FiltersType[]>([]);

  useEffect(() => {
    async function fetchData() {
      const { results } = await fetchApi();
      setData(results);
      setBackup(results);
      setLoading(false);
    }
    fetchData();
  }, []);

  function allFilters(type: string, value: any) {
    if (type === 'INPUT_TEXT') {
      let filtro = backup;
      filtro = backup.filter((planet) => planet
        .name.toLowerCase().includes(value.toLocaleLowerCase()));
      setData(filtro);
    }
    if (type === 'SELECT_COLUMN') {
      let filtro = data;
      const { column, filter, value: valueFilter }: ColumnType = value;
      filtro = filtro.filter((planet) => Number.isNaN(Number(planet[column])) === false);
      if (filter === 'maior que') {
        filtro = filtro.filter((planet) => Number(planet[column]) > Number(valueFilter));
      }
      if (filter === 'menor que') {
        filtro = filtro.filter((planet) => Number(planet[column]) < Number(valueFilter));
      }
      if (filter === 'igual a') {
        filtro = filtro
          .filter((planet) => Number(planet[column]) === Number(valueFilter));
      }
      setData(filtro);
    }
  }

  function restoreFilters(id: string) {
    const newFiltersArray = filtersArray.filter((filter) => filter.column !== id);
    setFiltersArray(newFiltersArray);
    let newData = backup;
    newFiltersArray.forEach((filter) => {
      const { column, filter: filterColumn, value }: ColumnType = filter as ColumnType;
      if (filterColumn === 'maior que') {
        newData = newData
          .filter((planet) => Number(planet[column]) > Number(value));
      }
      if (filterColumn === 'menor que') {
        newData = newData
          .filter((planet) => Number(planet[column]) < Number(value));
      }
      if (filterColumn === 'igual a') {
        newData = newData
          .filter((planet) => Number(planet[column]) === Number(value));
      }
    });
    setData(newData);
  }

  const store = {
    data,
    setData,
    loading,
    allFilters,
    backup,
    setFiltersArray,
    filtersArray,
    restoreFilters,
  };

  return (
    <PlanetContext.Provider value={ store }>
      { children }
    </PlanetContext.Provider>
  );
}

export default PlanetProvider;
