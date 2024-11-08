import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const APIKey = import.meta.env.VITE_APIKEY;
const APIToken = import.meta.env.VITE_TOKEN;
const BaseUrl = import.meta.env.VITE_BASE_URL;

export const fetchCheckLists = createAsyncThunk(
  "checkLists/fetchCheckLists",
  async (cardId, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `${BaseUrl}/cards/${cardId}/checklists?key=${APIKey}&token=${APIToken}`
      );
      return { cardId, checkLists: response.data };
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const createCheckList = createAsyncThunk(
  "checkLists/createCheckList",
  async ({ cardId, name }, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        `${BaseUrl}/cards/${cardId}/checklists?key=${APIKey}&token=${APIToken}`,
        { name }
      );
      return { cardId, checkList: response.data };
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const deleteCheckList = createAsyncThunk(
  "checkLists/deleteCheckList",
  async (checkListId, { rejectWithValue }) => {
    try {
      await axios.delete(
        `${BaseUrl}/checklists/${checkListId}?key=${APIKey}&token=${APIToken}`
      );
      return checkListId;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const checkListsSlice = createSlice({
  name: "checkLists",
  initialState: {
    items: {},
    loading: false,
    error: null,
  },
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder

      //Fetch checkList
      .addCase(fetchCheckLists.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchCheckLists.fulfilled, (state, action) => {
        const { cardId, checkLists } = action.payload;
        state.items[cardId] = checkLists;
        state.loading = false;
      })
      .addCase(fetchCheckLists.rejected, (state, action) => {
        state.error = action.payload;
        state.loading = false;
      })

      //Create CheckList
      .addCase(createCheckList.fulfilled, (state, action) => {
        const { cardId, checkList } = action.payload;
        if (!state.items[cardId]) state.items[cardId] = [];
        state.items[cardId].push(checkList);
      })

      //Delete CheckList
      .addCase(deleteCheckList.fulfilled, (state, action) => {
        const checkListId = action.payload;
        for (let cardId in state.items) {
          state.items[cardId] = state.items[cardId].filter(
            (list) => list.id !== checkListId
          );
        }
      });
  },
});

export const { clearError } = checkListsSlice.actions;
export default checkListsSlice.reducer;
