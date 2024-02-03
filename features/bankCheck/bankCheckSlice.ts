import { PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import { create, deleteBankCheck, getAllChecks, updateStatus } from './actions';

import { BankCheck } from '~/model/bank-check';

export interface bankCheckState {
  bankChecks: BankCheck[];
  isLoading: boolean;
  isError: boolean;
  totalAmount: number;
}

export const addNewBankCheck = createAsyncThunk<
  BankCheck,
  BankCheck,
  { rejectValue: { isError: boolean } }
>('bankCheck/addNewBankCheck', async (data, thunkApi) => {
  const { rejectWithValue } = thunkApi;
  try {
    const bankCheck = await create(data);
    return bankCheck;
  } catch {
    return rejectWithValue({ isError: true });
  }
});
export const UpdateBankCheckStatus = createAsyncThunk<
  { id: string; status: string },
  { id: string; status: string },
  { rejectValue: { isError: boolean } }
>('bankCheck/updateBankCheckStatus', async ({ id, status }, thunkApi) => {
  const { rejectWithValue } = thunkApi;
  try {
    const data = await updateStatus(id, status);
    return data;
  } catch {
    return rejectWithValue({ isError: true });
  }
});
export const DeleteBankCheck = createAsyncThunk<
  { id: string },
  { id: string },
  { rejectValue: { isError: boolean } }
>('bankCheck/deleteBankCheck', async ({ id }, thunkApi) => {
  const { rejectWithValue } = thunkApi;
  try {
    const data = await deleteBankCheck(id);
    return data;
  } catch {
    return rejectWithValue({ isError: true });
  }
});
export const getAllBankChecks = createAsyncThunk<
  BankCheck[],
  { checkNumber: string; checkType: 'personal' | 'customer'; checkStatus: string },
  { rejectValue: { isError: boolean } }
>('bankCheck/getAllBankChecks', async (data, thunkApi) => {
  const { rejectWithValue } = thunkApi;
  try {
    const bankChecks = await getAllChecks(data);
    return bankChecks;
  } catch {
    return rejectWithValue({ isError: true });
  }
});

const initialState: bankCheckState = {
  bankChecks: [],
  isLoading: true,
  isError: false,
  totalAmount: 0,
};
const calculateTotalAmount = (bankChecks: BankCheck[]): number => {
  return bankChecks
    .filter((check) => check.checkStatus === 'open')
    .reduce((total, check) => total + check.amount, 0);
};

const bankCheckSlice = createSlice({
  name: 'bankCheck',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(addNewBankCheck.pending, (state: bankCheckState) => {
      state.isLoading = true;
      state.isError = false;
    });
    builder.addCase(
      addNewBankCheck.fulfilled,
      (state: bankCheckState, action: PayloadAction<BankCheck>) => {
        state.bankChecks.unshift(action.payload);
        state.totalAmount = action.payload.amount;
        state.isLoading = false;
      }
    );
    builder.addCase(addNewBankCheck.rejected, (state: bankCheckState, action) => {
      state.isError = action.payload?.isError ?? true;
      state.isLoading = false;
    });
    builder.addCase(UpdateBankCheckStatus.pending, (state: bankCheckState) => {
      state.isLoading = true;
      state.isError = false;
    });
    builder.addCase(
      UpdateBankCheckStatus.fulfilled,
      (state: bankCheckState, action: PayloadAction<{ id: string; status: string }>) => {
        const { id, status } = action.payload;
        state.bankChecks.map((bankCheck) => {
          if (bankCheck.id === id) {
            bankCheck.checkStatus = status;
          }
          return bankCheck;
        });
        state.isLoading = false;
      }
    );
    builder.addCase(UpdateBankCheckStatus.rejected, (state: bankCheckState, action) => {
      state.isError = action.payload?.isError ?? true;
      state.isLoading = false;
    });
    builder.addCase(DeleteBankCheck.pending, (state: bankCheckState) => {
      state.isLoading = true;
      state.isError = false;
    });
    builder.addCase(
      DeleteBankCheck.fulfilled,
      (state: bankCheckState, action: PayloadAction<{ id: string }>) => {
        const { id } = action.payload;
        state.bankChecks = state.bankChecks.filter((bankCheck) => bankCheck.id !== id);
        state.isLoading = false;
      }
    );
    builder.addCase(DeleteBankCheck.rejected, (state: bankCheckState, action) => {
      state.isError = action.payload?.isError ?? true;
      state.isLoading = false;
    });
    builder.addCase(getAllBankChecks.pending, (state: bankCheckState) => {
      state.isLoading = true;
      state.isError = false;
    });
    builder.addCase(
      getAllBankChecks.fulfilled,
      (state: bankCheckState, action: PayloadAction<BankCheck[]>) => {
        state.bankChecks = action.payload;
        state.totalAmount = calculateTotalAmount(action.payload);
        state.isLoading = false;
      }
    );
    builder.addCase(getAllBankChecks.rejected, (state: bankCheckState, action) => {
      state.isError = action.payload?.isError ?? true;
      state.isLoading = false;
    });
  },
});

export default bankCheckSlice.reducer;
