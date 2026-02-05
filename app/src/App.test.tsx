import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';

jest.mock('./i18n', () => ({
  getLanguages: () => [
    { code: 'en', text: 'English' },
    { code: 'ja', text: '日本語' },
  ],
}));

jest.mock('react-i18next', () => ({
  useTranslation: () => ({
    t: (str: string) => str,
    i18n: {
      changeLanguage: () => new Promise(() => {}),
    },
  }),
  initReactI18next: {
    type: '3rdParty',
    init: () => {},
  },
}));

test('renders the input form', () => {
  render(<App />);
  const urlTextField = screen.getByLabelText('UPN.Label');
  const numberTextField = screen.getByLabelText('PhoneNumber.Label');
  expect(urlTextField).toBeInTheDocument();
  expect(numberTextField).toBeInTheDocument();
});
