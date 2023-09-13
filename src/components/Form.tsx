import { useContext, useState } from 'react';
import PlanetContext from '../context/PlanetContext';

const INITIAL_FORM = {
  name: '',
};

function Form() {
  const { filter } = useContext(PlanetContext);
  const [form, setForm] = useState(INITIAL_FORM);

  return (
    <div>
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
