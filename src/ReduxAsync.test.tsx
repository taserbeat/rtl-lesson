import { render, screen, cleanup } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';

import customCounterReducer from './features/customCounter/CustomCounterSlice';
import ReduxAsync from './ReduxAsync';

afterEach(() => {
  cleanup();
});

describe('ReduxAsync Test', () => {
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

  it('Should display value with 100 + payload', async () => {
    render(
      <Provider store={store}>
        <ReduxAsync />
      </Provider>
    );

    // find*関数は非同期関数で、4秒程度処理を待ってくれる
    userEvent.click(screen.getByText('FetchDummy'));
    expect(await screen.findByTestId('count-value')).toHaveTextContent('105');
  });
});
