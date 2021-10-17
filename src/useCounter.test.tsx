import { act, renderHook } from '@testing-library/react-hooks';
import { cleanup } from '@testing-library/react';

import { useCounter } from './useCounter';

afterEach(() => {
  cleanup();
});

describe('useCounter custom hook', () => {
  it('Should increment by 1', () => {
    const { result } = renderHook(() => useCounter(3));

    // 初期値が3であるはずである
    expect(result.current.count).toBe(3);

    // カスタムフックで関数を呼び出すにはactで囲う必要がある
    act(() => {
      result.current.increment();
    });
    expect(result.current.count).toBe(4);
  });

  it('Should decrement by 1', () => {
    const { result } = renderHook(() => useCounter(3));

    // 初期値が3であるはずである
    expect(result.current.count).toBe(3);

    act(() => {
      result.current.decrement();
    });
    expect(result.current.count).toBe(2);
  });

  it('Should double the counter value', () => {
    const { result } = renderHook(() => useCounter(3));

    // 初期値が3であるはずである
    expect(result.current.count).toBe(3);

    act(() => {
      result.current.double();
    });
    expect(result.current.count).toBe(6);
  });

  it('Should triple the counter value', () => {
    const { result } = renderHook(() => useCounter(3));

    // 初期値が3であるはずである
    expect(result.current.count).toBe(3);

    act(() => {
      result.current.triple();
    });
    expect(result.current.count).toBe(9);
  });

  it('Should reset the counter value', () => {
    const { result } = renderHook(() => useCounter(3));

    // 初期値が3であるはずである
    expect(result.current.count).toBe(3);

    act(() => {
      result.current.reset();
    });
    expect(result.current.count).toBe(0);
  });
});
