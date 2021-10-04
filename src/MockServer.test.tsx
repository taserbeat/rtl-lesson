import { render, screen, cleanup } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { rest } from 'msw';
import { setupServer } from 'msw/node';
import MockServer from './MockServer';

const server = setupServer(
  rest.get(
    'https://jsonplaceholder.typicode.com/users/1',
    (request, response, context) => {
      return response(
        context.status(200),
        context.json({
          username: 'Bred dummy',
        })
      );
    }
  )
);

// 最初に一度だけ実行する処理
beforeAll(() => {
  server.listen();
});

// テストケースが終わる度に実行する処理
afterEach(() => {
  server.resetHandlers();
  cleanup();
});

// すべてのテストケースが終了したときに実行する処理
afterAll(() => {
  server.close();
});

describe('Mocking API', () => {
  it('[Fetch success] Should display fetched data correctly, and button disable', async () => {
    render(<MockServer />);
    userEvent.click(screen.getByRole('button'));

    // Mock Serverから返ってきた"Bred dummy"のテキストが画面に表示されている
    expect(await screen.findByText('Bred dummy')).toBeInTheDocument();

    // ボタンに"disabled"属性が付いている
    expect(screen.getByRole('button')).toHaveAttribute('disabled');
  });

  it('[Fetch failure] Should display error message, no render heading and button abled', async () => {
    server.use(
      rest.get(
        'https://jsonplaceholder.typicode.com/users/1',
        (request, response, context) => {
          return response(context.status(404));
        }
      )
    );

    render(<MockServer />);
    userEvent.click(screen.getByRole('button'));

    // test用のidが"error"の要素に"Fetching Failed!"という文字が含まれている
    expect(await screen.findByTestId('error')).toHaveTextContent(
      'Fetching Failed!'
    );

    // (fetchに失敗したときは)headerタグが存在しない
    expect(screen.queryByRole('heading')).toBeNull();

    // (fetchに失敗したときは)ボタンが有効のままである
    expect(screen.getByRole('button')).not.toHaveAttribute('disabled');
  });
});
