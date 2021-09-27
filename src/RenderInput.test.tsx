import React from 'react';
import { render, screen, cleanup } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import RenderInput from './RenderInput';

/*
各テストケース(it)が終わったときに行いたい処理
cleanup()はReactのレンダリングをアンマウントしてくれる
*/
afterEach(() => {
  cleanup();
});

describe('Rendering', () => {
  it('Should render all the elements correctly', () => {
    render(<RenderInput outputConsole={() => {}} />);

    expect(screen.getByRole('button')).toBeTruthy();

    // inputタグのプレースホルダからエレメントを探す
    expect(screen.getByPlaceholderText('Enter')).toBeTruthy();
  });
});

describe('Input form onChange event', () => {
  it('Should update input value correctly', () => {
    render(<RenderInput outputConsole={() => {}} />);

    // input要素に入力された文字が正しいことを確認する
    const inputElement = screen.getByPlaceholderText(
      'Enter'
    ) as HTMLInputElement; // HTMLElementという型定義をアサーションしなければならない

    // input要素で"test"という文字を入力する
    userEvent.type(inputElement, 'test');

    // valueに"test"がセットされているか？
    expect(inputElement.value).toBe('test');
  });
});

describe('Console button conditionary triggered', () => {
  it('Should not trigger output function', () => {
    const outputConsoleMock = jest.fn();
    render(<RenderInput outputConsole={outputConsoleMock} />);

    // ボタンをクリック
    userEvent.click(screen.getByRole('button'));

    // ダミーのモック関数が呼ばれていないことを確認する
    expect(outputConsoleMock).not.toHaveBeenCalled();
  });

  it('Should trigger output function', () => {
    const outputConsoleMock = jest.fn();
    render(<RenderInput outputConsole={outputConsoleMock} />);

    // ユーザーが何らかの文字列をinputに入力することをシミュレート
    const inputElement = screen.getByPlaceholderText(
      'Enter'
    ) as HTMLInputElement;
    userEvent.type(inputElement, 'test');

    // ボタンをクリックする
    userEvent.click(screen.getByRole('button'));

    // ダミーのモック関数が呼ばれていることを確認する
    expect(outputConsoleMock).toHaveBeenCalledTimes(1);
  });
});
