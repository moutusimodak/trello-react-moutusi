import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
const APIKey = import.meta.env.VITE_APIKEY;
const APIToken = import.meta.env.VITE_TOKEN;
const BaseUrl = import.meta.env.VITE_BASE_URL;


export const fetchCards = createAsyncThunk(
  "cards/fetchCards",
  async (listId) => {
    const response = await axios.get(
      `${BaseUrl}/lists/${listId}/cards?key=${APIKey}&token=${APIToken}`
    );
    return {listId, cards:response.data};
  }
);


export const createCard = createAsyncThunk(
  "cards/createCard",
  async ({ listId, cardName }) => {
    const response = await axios.post(
      `${BaseUrl}/cards?name=${encodeURIComponent(cardName)}&idList=${listId}&key=${APIKey}&token=${APIToken}`
    );
    return response.data;  
  }
);


export const deleteCard = createAsyncThunk(
  "cards/deleteCard",
  async (cardId) => {
    await axios.delete(`${BaseUrl}/cards/${cardId}?key=${APIKey}&token=${APIToken}`);
    return cardId; 
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
