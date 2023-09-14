import { useEffect, useState } from 'react';
import PlanetContext from './PlanetContext';
import { PlanetType } from '../types';
import { fetchApi } from '../utils/fethApi';

type PlanetProviderProps = {
  children: React.ReactNode
};
type ColumnType = {
  column:
  'population' | 'orbital_period' | 'diameter' | 'rotation_period' | 'surface_water';
  filter: 'maior que' | 'menor que' | 'igual a';
  value: string;
};

function PlanetProvider({ children }: PlanetProviderProps) {
  const [data, setData] = useState<PlanetType[]>([]);
  const [backup, setBackup] = useState<PlanetType[]>([]);
  const [loading, setLoading] = useState(true);

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

  const store = {
    data,
    setData,
    loading,
    allFilters,
    backup,
  };

  return (
    <PlanetContext.Provider value={ store }>
      { children }
    </PlanetContext.Provider>
  );
}

export default PlanetProvider;
