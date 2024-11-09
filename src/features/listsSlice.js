import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  fetchListsService,
  createListService,
  deleteListService,
} from "../services/listService";

export const fetchLists = createAsyncThunk(
  "lists/fetchLists",
  async (boardId, { rejectWithValue }) => {
    try {
      return await fetchListsService(boardId);
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

export const createList = createAsyncThunk(
  "lists/createList",
  async ({ boardId, listName }, { rejectWithValue }) => {
    try {
      return await createListService(boardId, listName);
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

export const deleteList = createAsyncThunk(
  "lists/deleteList",
  async ({ listId }, { rejectWithValue }) => {
    try {
      return await deleteListService(listId);
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
