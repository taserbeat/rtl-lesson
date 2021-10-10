import reducer, {
  increment,
  incrementByAmount,
  CustomCounterState,
  Mode,
} from '../src/features/customCounter/CustomCounterSlice';

describe('Reducer of ReduxToolKit', () => {
  describe('increment action', () => {
    it('Should increment by 1 with mode 0', () => {
      const initialState: CustomCounterState = {
        mode: Mode.Mode0,
        value: 1,
        username: '',
      };

      const action = { type: increment.type };
      const state = reducer(initialState, action);

      expect(state.value).toEqual(2);
    });

    it('Should increment by 100 with mode 1', () => {
      const initialState: CustomCounterState = {
        mode: Mode.Mode1,
        value: 1,
        username: '',
      };

      const action = { type: increment.type };
      const state = reducer(initialState, action);

      expect(state.value).toEqual(101);
    });

    it('Should increment by 10000 with mode 2', () => {
      const initialState: CustomCounterState = {
        mode: Mode.Mode2,
        value: 1,
        username: '',
      };

      const action = { type: increment.type };
      const state = reducer(initialState, action);

      expect(state.value).toEqual(10001);
    });
  });

  describe('incrementByAmount', () => {
    it('Should increment by payload value eith mode 0', () => {
      const initialState: CustomCounterState = {
        mode: Mode.Mode0,
        value: 1,
        username: '',
      };

      const action = { type: incrementByAmount.type, payload: 3 };
      const state = reducer(initialState, action);

      expect(state.value).toEqual(4);
    });

    it('Should increment by payload x100 value eith mode 1', () => {
      const initialState: CustomCounterState = {
        mode: Mode.Mode1,
        value: 1,
        username: '',
      };

      const action = { type: incrementByAmount.type, payload: 3 };
      const state = reducer(initialState, action);

      expect(state.value).toEqual(301);
    });

    it('Should increment by payload x10000 value eith mode 2', () => {
      const initialState: CustomCounterState = {
        mode: Mode.Mode2,
        value: 1,
        username: '',
      };

      const action = { type: incrementByAmount.type, payload: 3 };
      const state = reducer(initialState, action);

      expect(state.value).toEqual(30001);
    });
  });
});
