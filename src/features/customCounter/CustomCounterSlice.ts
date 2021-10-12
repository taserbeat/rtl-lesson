import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';
import { RootState } from '../../app/store';
import axios from 'axios';
import { User } from '../../UseEffectRender';

const sleep = (msec: number) => {
  const start = new Date();
  while (new Date().getMilliseconds() - start.getMilliseconds() < msec);
};

export const fetchDummy = createAsyncThunk(
  'fetch/dummy',
  async (num: number) => {
    await sleep(2000);
    return num;
  }
);

export const fetchJson = createAsyncThunk('fetch/api', async () => {
  const response = await axios.get<User>(
    'https://jsonplaceholder.typicode.com/users/1'
  );
  const { username } = response.data;

  return username;
});

export enum Mode {
  Mode0 = 0,
  Mode1,
  Mode2,
}

export interface CustomCounterState {
  value: number;
  mode: Mode;
  username: User['username'];
}

const initialState: CustomCounterState = {
  mode: Mode.Mode0,
  value: 0,
  username: '',
};

export const customCounterSlice = createSlice({
  name: 'customCounter',
  initialState,
  reducers: {
    increment: (state) => {
      switch (state.mode) {
        case Mode.Mode0:
          state.value += 1;
          break;

        case Mode.Mode1:
          state.value += 100;
          break;

        case Mode.Mode2:
          state.value += 10000;
          break;

        default:
          break;
      }
    },
    decrement: (state) => {
      state.value -= 1;
    },
    incrementByAmount: (state, action: PayloadAction<number>) => {
      switch (state.mode) {
        case Mode.Mode0:
          state.value += action.payload;
          break;

        case Mode.Mode1:
          state.value += action.payload * 100;
          break;

        case Mode.Mode2:
          state.value += action.payload * 10000;
          break;

        default:
          break;
      }
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchDummy.fulfilled, (state, action) => {
      state.value = 100 + action.payload;
    });

    builder.addCase(fetchDummy.rejected, (state, action) => {
      const payload = action.payload as number;
      state.value = 100 - payload;
    });

    builder.addCase(fetchJson.fulfilled, (state, action) => {
      state.username = action.payload;
    });
  },
});

export const { increment, decrement, incrementByAmount } =
  customCounterSlice.actions;

export const selectCount = (state: RootState) => state.customCounter.value;
export const selectUsername = (state: RootState) =>
  state.customCounter.username;

export default customCounterSlice.reducer;
