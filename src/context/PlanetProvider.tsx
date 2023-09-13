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
    // let filtro = data;
    if (type === 'INPUT_TEXT') {
      const filtro = backup.filter((planet) => planet
        .name.toLowerCase().includes(value.toLocaleLowerCase()));
      setData(filtro);
    }
  }

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
