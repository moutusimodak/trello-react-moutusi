import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";


import { fetchBoardsService, createBoardService } from "../services/boardService";

export const fetchBoards = createAsyncThunk("boards/fetchBoards", async () => {
  const response = await fetchBoardsService();
  return response;
});

export const createBoard = createAsyncThunk(
  "boards/createBoard",
  async ({ name, bgColor }) => {
    
    const response = await createBoardService(name, bgColor);
    return response;
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
