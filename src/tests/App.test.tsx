import { render, screen, waitFor } from '@testing-library/react';
import App from '../App';
import { vi } from 'vitest';
import userEvent from '@testing-library/user-event';
import PlanetProvider from '../context/PlanetProvider';
import fetchData from '../utils/mockData';

beforeEach(() => {
  const MOCK_API = fetchData;
  const MOCK_RESPONSE = {
    ok: true,
    status: 200,
    json: async () => MOCK_API,
  } as Response;

  const mockFetch = vi.spyOn(global, 'fetch').mockResolvedValue(MOCK_RESPONSE);
});

afterEach(() => {
  vi.restoreAllMocks();
});

test('Verifica se os campos do form estão na tela', async () => {
  render(<PlanetProvider><App/></PlanetProvider>);
  const inputFilterName = screen.getByRole('textbox')
  expect(inputFilterName).toBeInTheDocument();
  const selectFilterColumn = screen.getByTestId('column-filter')
  expect(selectFilterColumn).toHaveTextContent('population');
  const selectFilterComparison = screen.getByTestId('comparison-filter')
  expect(selectFilterComparison).toBeInTheDocument();
  const inputValueFilter = screen.getByTestId('value-filter')
  expect(inputValueFilter).toBeInTheDocument();
  const buttonFilter = screen.getByRole('button', { name: /filtrar/i })
  expect(buttonFilter).toBeInTheDocument();
  const buttonClear = screen.getByRole('button', { name: /remover filtros/i })
  expect(buttonClear).toBeInTheDocument();
});

test('Verifica se os dados da tabela estão renderizados', async () => {
  render(
    <PlanetProvider>
      <App/>
    </PlanetProvider>);
    expect(global.fetch).toBeCalled();
    expect(global.fetch).toHaveBeenCalledWith('https://swapi.dev/api/planets');
    expect(global.fetch).toHaveBeenCalledTimes(1);
  await waitFor(() => {
  expect(screen.getByRole('cell', { name: /tatooine/i})).toBeInTheDocument();
  }, { timeout: 5000 })
  screen.debug();
  const selectFilterColumn = screen.getByTestId('column-filter')
  const selectFilterComparison = screen.getByTestId('comparison-filter')
  const inputValueFilter = screen.getByTestId('value-filter')
  await userEvent.selectOptions(selectFilterColumn, 'population');
  await userEvent.selectOptions(selectFilterComparison, 'menor que');
  await userEvent.type(inputValueFilter, '100000');
  await userEvent.click(screen.getByRole('button', { name: /filtrar/i }));
  const rows = screen.getAllByRole('row');
  expect(rows.length).toBe(2);
  expect(screen.getByRole('cell', { name: /Yavin IV/i})).toBeInTheDocument();
  const inputFilterName = screen.getByRole('textbox')
  await userEvent.type(inputFilterName, 'Al');
  expect(screen.getByRole('cell', { name: /Alderaan/i})).toBeInTheDocument();
});