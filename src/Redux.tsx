import { VFC, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import {
  selectCount,
  increment,
  decrement,
  incrementByAmount,
} from './features/customCounter/CustomCounterSlice';

interface ReduxProps {}

const Redux: VFC<ReduxProps> = (props) => {
  const [value, setValue] = useState('0');
  const count = useSelector(selectCount);
  const dispatch = useDispatch();

  return (
    <div>
      <h3>Redux Integration Test</h3>
      <div>
        <button onClick={() => dispatch(increment())}>+</button>
        <span data-testid="count-value">{count}</span>
        <button onClick={() => dispatch(decrement())}>-</button>

        <button
          onClick={() => {
            const numberOrNan = Number(value);
            const payload = Number.isNaN(numberOrNan) ? 0 : numberOrNan;

            dispatch(incrementByAmount(payload));
          }}
        >
          IncrementByAmount
        </button>
        <input
          type="text"
          placeholder="Enter"
          value={value}
          onChange={(e) => {
            setValue(e.target.value);
          }}
        />
      </div>
    </div>
  );
};

export default Redux;
