import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const APIKey = import.meta.env.VITE_APIKEY;
const APIToken = import.meta.env.VITE_TOKEN;
const BaseUrl = import.meta.env.VITE_BASE_URL;


export const fetchLists = createAsyncThunk(
  "lists/fetchLists",
  async (boardId, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `${BaseUrl}/boards/${boardId}/lists?filter=open&key=${APIKey}&token=${APIToken}`
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);


export const createList = createAsyncThunk(
  "lists/createList",
  async ({ boardId, listName }, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        `${BaseUrl}/lists?name=${encodeURIComponent(
          listName
        )}&idBoard=${boardId}&key=${APIKey}&token=${APIToken}`
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);


export const deleteList = createAsyncThunk(
  "lists/deleteList",
  async ({ listId }, { rejectWithValue }) => {
    try {

      await axios.put(
        `${BaseUrl}/lists/${listId}/closed?value=true&key=${APIKey}&token=${APIToken}`
      );
      return listId; 
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);


const listsSlice = createSlice({
  name: "lists",
  initialState: {
    items: [],
    status: "idle",
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder

      //Fetch List
      .addCase(fetchLists.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchLists.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.items = action.payload;
      })
      .addCase(fetchLists.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload || action.error.message;
      })

      // Creating a list
      .addCase(createList.fulfilled, (state, action) => {
        state.items.push(action.payload);
      })
      .addCase(createList.rejected, (state, action) => {
        state.error = action.payload || action.error.message;
      })

      // Deleting a list
      .addCase(deleteList.fulfilled, (state, action) => {
        state.items = state.items.filter((list) => list.id !== action.payload);
      })
      .addCase(deleteList.rejected, (state, action) => {
        state.error = action.payload || action.error.message;
      });
  },
});

export default listsSlice.reducer;
