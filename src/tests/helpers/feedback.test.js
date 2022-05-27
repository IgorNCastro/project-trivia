import React from 'react';
import { screen, fireEvent } from '@testing-library/react';
// import App from '../../App';
import Feedback from '../../pages/Feedback';
import renderWithRouterAndRedux from './renderWithRouterAndRedux';

test('Testa botões na tela', () => {
  renderWithRouterAndRedux(<Feedback />);
  const playAgainBtn = screen.getByText('Play Again');
  const rankingBtn = screen.getByText('Ranking');
  expect(playAgainBtn).toBeInTheDocument();
  expect(rankingBtn).toBeInTheDocument();
})

test('Testa textos de placar final e acertos', () => {
  renderWithRouterAndRedux(<Feedback />);
  const PlacarFinal = screen.getByText('Placar Final:');
  const acertos = screen.getByText('Acertos:');
  expect(PlacarFinal).toBeInTheDocument();
  expect(acertos).toBeInTheDocument();
})

test('verifica se o botão playAgain leva para a pagina login', () => {
  const { history } = renderWithRouterAndRedux(<Feedback />);
  const playAgainBtn = screen.getByText('Play Again');
  expect(playAgainBtn).toBeInTheDocument();
  fireEvent.click(playAgainBtn);
  const { pathname } = history.location;
  expect(pathname).toBe('/');
})

test('verifica se o botão ranking leva para a pagina ranking', () => {
  const { history } = renderWithRouterAndRedux(<Feedback />);
  const rankingBtn = screen.getByText('Ranking');
  expect(rankingBtn).toBeInTheDocument();
  fireEvent.click(rankingBtn);
  const { pathname } = history.location;
  expect(pathname).toBe('/ranking');
})