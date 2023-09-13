import { createContext } from 'react';
import { PlanetContextType } from '../types';

const PlanetContext = createContext<PlanetContextType>({} as PlanetContextType);

export default PlanetContext;
