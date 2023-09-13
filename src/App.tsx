import Form from './components/Form';
import PlanetTable from './components/PlanetTable';
import styles from './App.module.css';

function App() {
  return (
    <div className={ styles.container }>
      <Form />
      <PlanetTable />
    </div>
  );
}

export default App;
