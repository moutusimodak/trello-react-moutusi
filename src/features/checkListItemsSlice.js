import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import {
  fetchCheckItemsService,
  createCheckItemService,
  deleteCheckItemService,
  updateCheckItemStatusService,
} from "../services/checkListItemService";


export const fetchCheckItems = createAsyncThunk(
  "checkListItems/fetchCheckItems",
  async (checkListId, { rejectWithValue }) => {
    try {
      return await fetchCheckItemsService(checkListId);
    } catch (error) {
      return rejectWithValue("Error fetching checklist items.");
    }
  }
);

export const createCheckItem = createAsyncThunk(
  "checkListItems/createCheckItem",
  async ({ checkListId, name }, { rejectWithValue }) => {
    try {
      return await createCheckItemService(checkListId, name);
    } catch (error) {
      return rejectWithValue("Error creating checklist item.");
    }
  }
);

export const deleteCheckItem = createAsyncThunk(
  "checkListItems/deleteCheckItem",
  async ({checkListId, itemId}, { rejectWithValue }) => {
    try {
      return await deleteCheckItemService(checkListId, itemId);
    } catch (error) {
      return rejectWithValue("Error deleting checklist item.");
    }
  }
);

export const updateCheckItemStatus = createAsyncThunk(
  "checkListItems/updateCheckItemStatus",
  async ({ cardId, itemId, newStatus }, { rejectWithValue }) => {
    try {
      return await updateCheckItemStatusService(cardId, itemId, newStatus);
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
