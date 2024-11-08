import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const APIKey = import.meta.env.VITE_APIKEY;
const APIToken = import.meta.env.VITE_TOKEN;
const BaseUrl = import.meta.env.VITE_BASE_URL;


export const fetchCheckItems = createAsyncThunk(
  "checkListItems/fetchCheckItems",
  async (checkListId, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `${BaseUrl}/checklists/${checkListId}/checkItems?key=${APIKey}&token=${APIToken}`
      );
      return { checkListId, items: response.data };
    } catch (error) {
      return rejectWithValue("Error fetching checklist items.");
    }
  }
);

export const createCheckItem = createAsyncThunk(
  "checkListItems/createCheckItem",
  async ({ checkListId, name }, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        `${BaseUrl}/checklists/${checkListId}/checkItems?name=${name}&key=${APIKey}&token=${APIToken}`
      );
      return { checkListId, item: response.data };
    } catch (error) {
      return rejectWithValue("Error creating checklist item.");
    }
  }
);

export const deleteCheckItem = createAsyncThunk(
  "checkListItems/deleteCheckItem",
  async ({ checkListId, itemId }, { rejectWithValue }) => {
    try {
      await axios.delete(
        `${BaseUrl}/checklists/${checkListId}/checkItems/${itemId}?key=${APIKey}&token=${APIToken}`
      );
      return { checkListId, itemId };
    } catch (error) {
      return rejectWithValue("Error deleting checklist item.");
    }
  }
);

export const updateCheckItemStatus = createAsyncThunk(
  "checkListItems/updateCheckItemStatus",
  async ({ cardId, itemId, newStatus }, { rejectWithValue }) => {
    try {
      await axios.put(
        `${BaseUrl}/cards/${cardId}/checkItem/${itemId}?state=${newStatus ? "complete" : "incomplete"}&key=${APIKey}&token=${APIToken}`
      );
      return { itemId, newStatus };
    } catch (error) {
      return rejectWithValue("Failed to update checklist item status.");
    }
  }
);

const checkListItemsSlice = createSlice({
  name: "checkListItems",
  initialState: {
    itemsByCheckListId: {},
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder

    //Fetch CheckItems
      .addCase(fetchCheckItems.fulfilled, (state, action) => {
        state.itemsByCheckListId[action.payload.checkListId] = action.payload.items;
        state.loading = false;
      })

      //Create CheckItems
      .addCase(createCheckItem.fulfilled, (state, action) => {
        state.itemsByCheckListId[action.payload.checkListId].push(action.payload.item);
      })

      //Delete CheckItems
      .addCase(deleteCheckItem.fulfilled, (state, action) => {
        state.itemsByCheckListId[action.payload.checkListId] = state.itemsByCheckListId[
          action.payload.checkListId
        ].filter((item) => item.id !== action.payload.itemId);
      })

      //CheckItem status
      .addCase(updateCheckItemStatus.fulfilled, (state, action) => {
        const items = state.itemsByCheckListId;
        const item = Object.values(items).flat().find((item) => item.id === action.payload.itemId);
        if (item) item.state = action.payload.newStatus ? "complete" : "incomplete";
      });
  },
});

export default checkListItemsSlice.reducer;
