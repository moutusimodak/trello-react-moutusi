import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const APIKey = import.meta.env.VITE_APIKEY;
const APIToken = import.meta.env.VITE_TOKEN;
const BaseUrl = import.meta.env.VITE_BASE_URL;

export const fetchBoards = createAsyncThunk("boards/fetchBoards", async () => {
  const response = await axios.get(
    `${BaseUrl}/members/me/boards?key=${APIKey}&token=${APIToken}`
  );
  return response.data;
});

export const createBoard = createAsyncThunk(
  "boards/createBoard",
  async ({ name, bgColor }) => {
    const response = await axios.post(
      `${BaseUrl}/boards/?name=${encodeURIComponent(
        name
      )}&prefs_background=${bgColor}&key=${APIKey}&token=${APIToken}`
    );

    return response.data;
  }
);

const boardsSlice = createSlice({
  name: "board",
  initialState: {
    board: null,
    items: [],
    status: "idle",
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      //Fetch Board
      .addCase(fetchBoards.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchBoards.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.items = action.payload;
      })
      .addCase(fetchBoards.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })

      //Create Board
      .addCase(createBoard.fulfilled, (state, action) => {
        state.items.push(action.payload);
      });
  },
});

export default boardsSlice.reducer;
