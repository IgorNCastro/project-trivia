import React from 'react';
import { screen, waitForElementToBeRemoved } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../../App';
import Ranking from '../../pages/Ranking';
import renderWithRouterAndRedux from './renderWithRouterAndRedux';

global.localStorage.setItem("ranking", JSON.stringify([{
  name: "Muca",
  picture: "",
  score: 10,
}]));

test('testa se a pagina ranking está na rota correta', () => {
  const { history } = renderWithRouterAndRedux(<App/>);
  history.push('/ranking');
  const { pathname } = history.location;
  expect(pathname).toBe('/ranking');
})

test('testa se o botão Go Home funciona corretamente', async () => {
  const { history } = renderWithRouterAndRedux(<App/>);
  history.push('/ranking');
  const goHomeBtn = await screen.findByText('Go Home');
  expect(goHomeBtn).toBeInTheDocument();
  userEvent.click(goHomeBtn);
  const { pathname } = history.location;
  expect(pathname).toBe('/ranking');
})

