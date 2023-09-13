import { useEffect, useState } from 'react';
import PlanetContext from './PlanetContext';
import { PlanetType } from '../types';
import { fetchApi } from '../utils/fethApi';

type PlanetProviderProps = {
  children: React.ReactNode
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

  function filter(type: string, value: string) {
    if (type === 'INPUT_TEXT') {
      const filtro = backup.filter((planet) => planet
        .name.toLowerCase().includes(value.toLocaleLowerCase()));
      setData(filtro);
    }
    if (type === 'maior que') {
      const filtro = data.filter((planet) => Number(planet
        .population) > Number(value));
      setData(filtro);
    }
    if (type === 'menor que') {
      const filtro = data.filter((planet) => Number(planet
        .population) < Number(value));
      setData(filtro);
    }
    if (type === 'igual a') {
      const filtro = data.filter((planet) => Number(planet
        .population) === Number(value));
      setData(filtro);
    }
  }

  // function filterPlanets(filters: FiltersType) {
  //   let filtro = data;
  //   switch (filtro) {
  //     case 'maior que':
  //       filtro = data.filter((planet) => Number(planet) > Number(value));
  //       break;
  //     case 'menor que':
  //       filtro = data.filter((planet) => Number(planet) < Number(value));
  //       break;
  //     case 'igual a':
  //       filtro = data.filter((planet) => Number(planet) === Number(value));
  //       break;
  //     default:
  //       return data;
  //   }

  const store = {
    data,
    setData,
    loading,
    filter,
  };

  return (
    <PlanetContext.Provider value={ store }>
      { children }
    </PlanetContext.Provider>
  );
}

export default PlanetProvider;
