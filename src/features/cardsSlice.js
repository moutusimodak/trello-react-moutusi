import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import {
  fetchCardsService,
  createCardService,
  deleteCardService,
} from "../services/cardService";


export const fetchCards = createAsyncThunk(
  "cards/fetchCards",
  async (listId) => {
    return await fetchCardsService(listId);
  }
);


export const createCard = createAsyncThunk(
  "cards/createCard",
  async ({ listId, cardName }) => {
    return await createCardService(listId, cardName); 
  }
);


export const deleteCard = createAsyncThunk(
  "cards/deleteCard",
  async (cardId) => {
    return await deleteCardService(cardId);
  }
);

const cardsSlice = createSlice({
  name: "cards",
  initialState: {
    cardsById: {},
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder

    //Fetch Card
      .addCase(fetchCards.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchCards.fulfilled, (state, action) => {
        const { listId, cards } = action.payload;
        state.loading = false;

        state.cardsById[listId] = cards.reduce((obj, card) => {
          obj[card.id] = card;
          return obj;
        }, {});
       
      })
      .addCase(fetchCards.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })


      //Create Card
      .addCase(createCard.fulfilled, (state, action) => {
        const { idList, id } = action.payload;

        if (!state.cardsById[idList]) {
          state.cardsById[idList] = {};
        }
        state.cardsById[idList][id] = action.payload;
      })

      //Delete Card
      .addCase(deleteCard.fulfilled, (state, action) => {
        const cardId = action.payload;
        Object.keys(state.cardsById).forEach((listId) => {
          if (state.cardsById[listId][cardId]) {
            delete state.cardsById[listId][cardId];
          }
        });
      });
      
  },
});

export default cardsSlice.reducer;
