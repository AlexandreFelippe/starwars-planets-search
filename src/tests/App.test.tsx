import { render, screen } from '@testing-library/react';
import App from '../App';
import { mockData } from '../utils/mockData';
import { vi } from 'vitest';
// import userEvent from '@testing-library/user-event';

beforeEach(() => {
  const mockResponse = {
    ok: true,
    status: 200,
    json: async () => mockData,
  } as Response;

  const mockFetch = vi.spyOn(global, 'fetch').mockResolvedValue(mockResponse);
});

afterEach(() => {
  vi.restoreAllMocks();
});

test('Verifica se os campos do form estão na tela', async () => {
  // render(<App />);
  // const inputFilterName = screen.getByRole('textbox')
  // expect(inputFilterName).toBeInTheDocument();
  // const selectFilterColumn = screen.getByTestId('column-filter')
  // expect(selectFilterColumn).toHaveTextContent('population');
  // const selectFilterComparison = screen.getByTestId('comparison-filter')
  // expect(selectFilterComparison).toBeInTheDocument();
  // const inputValueFilter = screen.getByTestId('value-filter')
  // expect(inputValueFilter).toBeInTheDocument();
  // const buttonFilter = screen.getByRole('button', { name: /filtrar/i })
  // expect(buttonFilter).toBeInTheDocument();
  // const buttonClear = screen.getByRole('button', { name: /remover filtros/i })
  // expect(buttonClear).toBeInTheDocument();
});

test('Verifica se os dados da tabela estão renderizados', async () => {
  render(<App />);
  // const inputFilterName = screen.getByRole('textbox')
  // await userEvent.type(inputFilterName, 'at');
  // expect('Tatooine').toBeInTheDocument();
});
