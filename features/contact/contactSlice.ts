import { PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import { create, getAllContacts } from './actions';

import { Contact } from '~/model/contact';

export interface contactState {
  contacts: Contact[];
  isLoading: boolean;
  isError: boolean;
  totalContact: number;
}

export const addNewContact = createAsyncThunk<
  Contact,
  Contact,
  { rejectValue: { isError: boolean } }
>('contact/addNewContact', async (data, thunkApi) => {
  const { rejectWithValue } = thunkApi;
  try {
    const contact = await create(data);
    return contact;
  } catch {
    return rejectWithValue({ isError: true });
  }
});
// export const UpdateContactStatus = createAsyncThunk<
//   { id: string; status: string },
//   { id: string; status: string },
//   { rejectValue: { isError: boolean } }
// >('contact/updateContactStatus', async ({ id, status }, thunkApi) => {
//   const { rejectWithValue } = thunkApi;
//   try {
//     const data = await updateStatus(id, status);
//     return data;
//   } catch {
//     return rejectWithValue({ isError: true });
//   }
// });
// export const DeleteContact = createAsyncThunk<
//   { id: string },
//   { id: string },
//   { rejectValue: { isError: boolean } }
// >('contact/deleteContact', async ({ id }, thunkApi) => {
//   const { rejectWithValue } = thunkApi;
//   try {
//     const data = await deleteContact(id);
//     return data;
//   } catch {
//     return rejectWithValue({ isError: true });
//   }
// });
export const getAllContact = createAsyncThunk<
  Contact[],
  { name: string },
  { rejectValue: { isError: boolean } }
>('contact/getAllContacts', async (data, thunkApi) => {
  const { rejectWithValue } = thunkApi;
  try {
    const contacts = await getAllContacts(data);
    return contacts;
  } catch {
    return rejectWithValue({ isError: true });
  }
});

const initialState: contactState = {
  contacts: [],
  isLoading: true,
  isError: false,
  totalContact: 0,
};

const contactSlice = createSlice({
  name: 'contact',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(addNewContact.pending, (state: contactState) => {
      state.isLoading = true;
      state.isError = false;
    });
    builder.addCase(
      addNewContact.fulfilled,
      (state: contactState, action: PayloadAction<Contact>) => {
        state.contacts.unshift(action.payload);
        state.totalContact += 1;
        state.isLoading = false;
      }
    );
    builder.addCase(addNewContact.rejected, (state: contactState, action) => {
      state.isError = action.payload?.isError ?? true;
      state.isLoading = false;
    });
    builder.addCase(getAllContact.pending, (state: contactState) => {
      state.isLoading = true;
      state.isError = false;
    });
    builder.addCase(
      getAllContact.fulfilled,
      (state: contactState, action: PayloadAction<Contact[]>) => {
        state.contacts = action.payload;
        state.totalContact = action.payload.length;
        state.isLoading = false;
      }
    );
    builder.addCase(getAllContact.rejected, (state: contactState, action) => {
      state.isError = action.payload?.isError ?? true;
      state.isLoading = false;
    });
  },
});

export default contactSlice.reducer;
