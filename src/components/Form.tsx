import { useContext, useState } from 'react';
import PlanetContext from '../context/PlanetContext';
import styles from './form.module.css';

const INITIAL_FORM = {
  name: '',
};

function Form() {
  const { filter } = useContext(PlanetContext);
  const [form, setForm] = useState(INITIAL_FORM);

  return (
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
  );
}

export default Form;
