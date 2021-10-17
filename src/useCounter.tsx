import { useState } from 'react';

/** カウンター機能のカスタムフック */
export const useCounter = (
  initialCount: number = 0
): {
  count: number;
  increment: () => void;
  decrement: () => void;
  double: () => void;
  triple: () => void;
  reset: () => void;
} => {
  const [count, setCount] = useState(initialCount);

  const increment = () => {
    setCount((previous) => previous + 1);
  };

  const decrement = () => {
    setCount((previous) => previous - 1);
  };

  const double = () => {
    setCount((previous) => previous * 2);
  };

  const triple = () => {
    setCount((previous) => previous * 3);
  };

  const reset = () => {
    setCount(0);
  };

  return {
    count,
    increment,
    decrement,
    double,
    triple,
    reset,
  };
};
