import { render, screen, cleanup } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Provider } from 'react-redux';
import { configureStore, EnhancedStore } from '@reduxjs/toolkit';

import Redux from './Redux';
import customCounterReducer from '../src/features/customCounter/CustomCounterSlice';

afterEach(() => {
  cleanup();
});

describe('Redux Integration Test', () => {
  let store = configureStore({
    reducer: {
      customCounter: customCounterReducer,
    },
  });
  beforeEach(() => {
    store = configureStore({
      reducer: {
        customCounter: customCounterReducer,
      },
    });
  });

  it('Shoud display value with increment by 1 per click', () => {
    render(
      <Provider store={store}>
        <Redux />
      </Provider>
    );

    // `+`を3回クリックすると、カウンターの値が`3`になる
    userEvent.click(screen.getByText('+'));
    userEvent.click(screen.getByText('+'));
    userEvent.click(screen.getByText('+'));
    expect(screen.getByTestId('count-value')).toHaveTextContent('3');
  });

  it('Should display value with decrement by 1 per click', () => {
    render(
      <Provider store={store}>
        <Redux />
      </Provider>
    );

    // `-`を2回クリックすると、カウンターの値が`-2`になる
    userEvent.click(screen.getByText('-'));
    userEvent.click(screen.getByText('-'));
    expect(screen.getByTestId('count-value')).toHaveTextContent('-2');
  });

  it('Should display value with incrementByAmount', () => {
    render(
      <Provider store={store}>
        <Redux />
      </Provider>
    );

    // フォームに`30`を入力した状態で、`IncrementByAmount`を2回クリックすると、カウンターの値が`60`になる
    userEvent.type(screen.getByPlaceholderText('Enter'), '30');
    userEvent.click(screen.getByText('IncrementByAmount'));
    userEvent.click(screen.getByText('IncrementByAmount'));
    expect(screen.getByTestId('count-value')).toHaveTextContent('60');
  });
});
