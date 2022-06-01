import React from 'react';
// import { createMemoryHistory } from 'history';
import { screen, waitForElementToBeRemoved } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../../App';
import Feedback from '../../pages/Feedback';
import renderWithRouterAndRedux from './renderWithRouterAndRedux';

global.localStorage.setItem("ranking", JSON.stringify([{
  name: "Muca",
  picture: "",
  score: 10,
}]));

test('testa se a pagina feedback está na rota correta', () => {
  const { history } = renderWithRouterAndRedux(<App/>);
  history.push('/feedback');
  const { pathname } = history.location;
  expect(pathname).toBe('/feedback');
})

test('Testa botões na tela', async () => {
  // global.localStorage.setItem("ranking", JSON.stringify([{
  //   name: "Muca",
  //   picture: "",
  //   score: 10,
  // }]));
  renderWithRouterAndRedux(<App/>, {}, '/feedback');
  const playAgainBtn = await screen.findByText(/Play Again/i);
  const rankingBtn = await screen.findByText('Ranking');
  expect(playAgainBtn).toBeInTheDocument();
  expect(rankingBtn).toBeInTheDocument();
})

test('Testa textos de placar final e acertos', () => {
  // global.localStorage.setItem("ranking", JSON.stringify([{
  //   name: "Muca",
  //   picture: "",
  //   score: 10,
  // }]));
  renderWithRouterAndRedux(<Feedback />);
  const PlacarFinal = screen.getByText('Placar Final:');
  const acertos = screen.getByText('Acertos:');
  expect(PlacarFinal).toBeInTheDocument();
  expect(acertos).toBeInTheDocument();
})

test('verifica se o botão playAgain leva para a pagina login', async () => {
  const { history } = renderWithRouterAndRedux(<App/>, {}, '/feedback');
  const playAgainBtn = screen.getByText('Play Again');
  expect(playAgainBtn).toBeInTheDocument();
  userEvent.click(playAgainBtn);
  await waitForElementToBeRemoved(playAgainBtn);
  const { pathname } = history.location;
  expect(pathname).toBe('/');
})

test('verifica se o botão ranking leva para a pagina ranking', () => {
  // global.localStorage.setItem("ranking", JSON.stringify([{
  //   name: "Muca",
  //   picture: "",
  //   score: 10,
  // }]));
  const { history } = renderWithRouterAndRedux(<App/>, {}, '/feedback');
  const rankingBtn = screen.getByTestId('btn-ranking');
  expect(rankingBtn).toBeInTheDocument();
  userEvent.click(rankingBtn);
  const { pathname } = history.location;
  expect(pathname).toBe('/ranking');
})

// // const customHistory = createMemoryHistory();
// // renderWithRouter(<App />);
// // customHistory.push('/feedback')