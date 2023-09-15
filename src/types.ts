export type PlanetType = {
  name: string,
  rotation_period: string,
  orbital_period: string,
  diameter: string,
  climate: string,
  gravity: string,
  terrain: string,
  surface_water: string,
  population: string,
  films: string[],
  created: string,
  edited: string,
  url: string
};

export type PlanetContextType = {
  data: PlanetType[],
  loading: boolean,
  allFilters: (type:string, value:any) => void,
  backup: PlanetType[],
  setData: (data:PlanetType[]) => void,
  setFiltersArray: (filtersArray:FiltersType[]) => void,
  filtersArray: FiltersType[],
  restoreFilters: (a: string) => void,
};

export type FiltersType = {
  // id: number;
  column: string;
  filter: string;
  value: string;
};

export type ColumnType = {
  column:
  'population' | 'orbital_period' | 'diameter' | 'rotation_period' | 'surface_water';
  filter: 'maior que' | 'menor que' | 'igual a';
  value: string;
};
