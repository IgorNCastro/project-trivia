import React from 'react';
import { screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Login from '../../pages/Login';
import App from '../../App';
import renderWithRouterAndRedux from './renderWithRouterAndRedux';

const VALID_EMAIL = 'test@test.test';
const USER = 'test';

const apiResponse = Promise.resolve({
    json: () => Promise.resolve(mockData),
    ok: true,
  });
  
  const mockedExchange = jest.spyOn(global, 'fetch').mockImplementation(() => apiResponse);


test('testa se ao acessar a pagina Login está na rota /', () => {
    const { history } = renderWithRouterAndRedux(<Login/>);
    const { pathname } = history.location;
    expect(pathname).toBe('/');
})

test('testa se existe o input email e nome', () => {
    renderWithRouterAndRedux(<Login />);
    const email = screen.getByTestId('input-gravatar-email');
    const name = screen.getByTestId('input-player-name');
    expect(name).toBeInTheDocument(); 
    expect(email).toBeInTheDocument();
})


test('testa se o botao esta desativado ao escrever o email primeiro', () => {
    renderWithRouterAndRedux(<Login />);
    const btnPlay = screen.getByTestId('btn-play');
    expect(btnPlay).toBeInTheDocument();
    expect(btnPlay).toBeDisabled()
    const email = screen.getByTestId('input-gravatar-email');
    userEvent.type(email, VALID_EMAIL);
    expect(btnPlay).toBeDisabled();
    const name = screen.getByTestId('input-player-name');
    userEvent.type(name, USER);
    expect(btnPlay).not.toBeDisabled();
})

test('testa se o botao esta desativado ao escrever o nome primeiro', () => {
    renderWithRouterAndRedux(<Login />);
    const btnPlay = screen.getByTestId('btn-play');
    expect(btnPlay).toBeInTheDocument();
    expect(btnPlay).toBeDisabled()
    const name = screen.getByTestId('input-player-name');
    userEvent.type(name, USER);
    expect(btnPlay).toBeDisabled();
    const email = screen.getByTestId('input-gravatar-email');
    userEvent.type(email, VALID_EMAIL);
    expect(btnPlay).not.toBeDisabled();
})


test('Teste se o a img renderiza', () => {
    renderWithRouterAndRedux(<App />);

    const img = screen.getByRole('img', { name: 'logo' });
    expect(img).toBeDefined();
  });

  test('ao apertar o botao play ele leva para a tela de jogo', async () => {
    const { history } = renderWithRouterAndRedux(<App/>);
    const btnPlay = screen.getByTestId('btn-play');
    const email = screen.getByTestId('input-gravatar-email');
    userEvent.type(email, VALID_EMAIL);
    const name = screen.getByTestId('input-player-name');
    userEvent.type(name, USER);
    expect(btnPlay).not.toBeDisabled;
    fireEvent.click(btnPlay);
    await screen.getByRole('img', { alt: 'test' });
    
})

test('checa se o botão setting existe e leva para a pag', () => {
    const { history } = renderWithRouterAndRedux(<App/>);
    const btnSetting = screen.getByTestId('btn-settings');
    expect(btnSetting).toBeInTheDocument();
    fireEvent.click(btnSetting)
    const { pathname } = history.location;
    expect(pathname).toBe('/settings')
       
})
