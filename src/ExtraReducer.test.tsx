import reducer, {
  fetchDummy,
  CustomCounterState,
  Mode,
} from '../src/features/customCounter/CustomCounterSlice';

describe('extraReducers', () => {
  const initialState: CustomCounterState = {
    mode: Mode.Mode0,
    value: 0,
    username: '',
  };

  it('Should output 100 + payload when fulfilled', () => {
    const action = { type: fetchDummy.fulfilled, payload: 5 };
    const state = reducer(initialState, action);

    expect(state.value).toEqual(105);
  });

  it('Should output 100 - payload when rejected', () => {
    const action = { type: fetchDummy.rejected, payload: 5 };
    const state = reducer(initialState, action);

    expect(state.value).toEqual(95);
  });
});
