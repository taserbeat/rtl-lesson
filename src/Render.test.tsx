import React from 'react';
import { render, screen } from '@testing-library/react';

import Render from './Render';

// テストの説明
describe('Rendering', () => {
  // テストケース
  it('Should render all the elements correctly', () => {
    // コンポーネントをレンダリングする
    render(<Render />);

    // renderした内容を取得する
    // HTMLの内容を取得できる
    // screen.debug();

    // https://github.com/A11yance/aria-query#elements-to-roles
    // screen.debug(screen.getByRole('heading'));

    // hタグが存在するか？
    // https://jestjs.io/ja/docs/expect
    expect(screen.getByRole('heading')).toBeTruthy();

    // inputタグが存在するか？
    expect(screen.getByRole('textbox')).toBeTruthy();

    // 2つのボタンのうち、1つ目のボタンが存在するか？、および2つ目が存在するか？
    expect(screen.getAllByRole('button')[0]).toBeTruthy();
    expect(screen.getAllByRole('button')[1]).toBeTruthy();

    // HTMLから"Udemy"というテキストの存在を確認する
    expect(screen.getByText('Udemy')).toBeTruthy();

    // HTMLに"Udeeeeemy"というテキストが存在しないことを確認する
    expect(screen.queryByText('Udeeeeemy')).toBeNull();

    // テスト用IDを指定して、エレメントが存在することを確認する
    // https://qiita.com/akameco/items/519f7e4d5442b2a9d2da
    expect(screen.getByTestId('copyright')).toBeTruthy();
  });
});
