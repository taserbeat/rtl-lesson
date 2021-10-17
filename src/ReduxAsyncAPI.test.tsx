import { render, screen, cleanup } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { rest } from 'msw';
import { setupServer } from 'msw/node';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';

import customCounterReducer from './features/customCounter/CustomCounterSlice';
import ReduxAsync from './ReduxAsync';

const mockServer = setupServer(
  rest.get(
    'https://jsonplaceholder.typicode.com/users/1',
    (request, response, context) => {
      return response(
        context.status(200),
        context.json({ username: 'Bred dummy' })
      );
    }
  )
);

// テスト全体の開始前
beforeAll(() => {
  mockServer.listen();
});

// 各テストケースの終了後
afterEach(() => {
  mockServer.resetHandlers();
  cleanup();
});

// テスト全体の終了後
afterAll(() => {
  mockServer.close();
});

describe('ReduxAsync API Mocking', () => {
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

  it('[Fetch Success] Should display username in h3 tag', async () => {
    render(
      <Provider store={store}>
        <ReduxAsync />
      </Provider>
    );

    // fetchが走る前はhタグは存在しないはずである
    expect(screen.queryByRole('heading')).toBeNull();

    // FetchJsonをクリックするとMockサーバーのレスポンスが表示されるはずである
    userEvent.click(screen.getByText('FetchJson'));
    expect(await screen.findByText('Bred dummy')).toBeInTheDocument();
  });

  it('[Fetch Failed] Should display `anonymous` in h3 tag', async () => {
    // APIサーバーが404エラーを返すことをMockする
    mockServer.use(
      rest.get(
        'https://jsonplaceholder.typicode.com/users/1',
        (request, response, context) => {
          return response(context.status(404));
        }
      )
    );

    render(
      <Provider store={store}>
        <ReduxAsync />
      </Provider>
    );

    // fetchが走る前はhタグは存在しないはずである
    expect(screen.queryByRole('heading')).toBeNull();

    // FetchJsonをクリックすると`anonymous`文字列が表示されるはずである
    userEvent.click(screen.getByText('FetchJson'));
    expect(await screen.findByText('anonymous')).toBeInTheDocument();
  });
});
