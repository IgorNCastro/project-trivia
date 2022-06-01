import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../../App';
import renderWithRouterAndRedux from './renderWithRouterAndRedux';

test('testa se o botão Back funciona corretamente', async () => {
  const { history } = renderWithRouterAndRedux(<App/>);
  history.push('/settings');
  const backBtn = await screen.findByText('Back');
  expect(backBtn).toBeInTheDocument();
  userEvent.click(backBtn);
  const { pathname } = history.location;
  expect(pathname).toBe('/');
})