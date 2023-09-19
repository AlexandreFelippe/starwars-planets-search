import Form from './components/Form';
import PlanetTable from './components/PlanetTable';
import styles from './App.module.css';
import Sort from './components/Sort';

function App() {
  return (
    <div className={ styles.container }>
      <Form />
      <Sort />
      <PlanetTable />
    </div>
  );
}

export default App;
