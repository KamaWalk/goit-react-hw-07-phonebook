import axios from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';

axios.defaults.baseURL = 'https://665048c6ec9b4a4a6031726d.mockapi.io';

export const fetchContacts = createAsyncThunk(
  'phonebook/fetchAll',
  async (_, thunkAPI) => {
    try {
      const response = await axios.get('/phonebook');
      return response.data;
    } catch (e) {
      return thunkAPI.rejectWithValue(e.message);
    }
  }
);

export const addContact = createAsyncThunk(
  'phonebook/addContact',
  async ({ name, phone }, thunkAPI) => {
    const state = thunkAPI.getState();
    const existingContact = state.contacts.contacts.find(
      contact => contact.name.toLowerCase() === name.trim().toLowerCase()
    );
    if (existingContact) {
      return thunkAPI.rejectWithValue(`${name} is already in your phonebook!`);
    }
    try {
      const response = await axios.post('/phonebook', {
        name,
        phone,
      });
      return response.data;
    } catch (e) {
      return thunkAPI.rejectWithValue(e.message);
    }
  }
);

export const deleteContact = createAsyncThunk(
  'phonebook/deleteContact',
  async (contactId, thunkAPI) => {
    try {
      const response = await axios.delete(`/phonebook/${contactId}`);
      return response.data;
    } catch (e) {
      return thunkAPI.rejectWithValue(e.message);
    }
  }
);