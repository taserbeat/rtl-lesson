import { render, screen } from '@testing-library/react';

import UseEffectRender from './UseEffectRender';

describe('useEffect rendering', () => {
  it('Should render only after async function resolved', async () => {
    render(<UseEffectRender />);

    // レンダリングされた当初は"I am"で始まるテキストが存在しないはずである
    expect(screen.queryByText(/I am/)).toBeNull();

    // findByTextは非同期関数で、指定したテキストが表示されるまで待ってくれる
    // 4秒程度でタイムアウトしてしまうので、それまでに表示されればテストに成功する。
    expect(await screen.findByText(/I am/)).toBeInTheDocument();
  });
});
