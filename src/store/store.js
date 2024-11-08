
import { configureStore } from "@reduxjs/toolkit";
import boardsReducer from "../features/boardsSlice";
import listsReducer from "../features/listsSlice";
import cardsReducer from "../features/cardsSlice"
import checkListsSliceReducer from "../features/checkListsSlice"
import checkListItemsReducer from "../features/checkListItemsSlice"



const store = configureStore({
  reducer: {
    boards: boardsReducer,
    lists: listsReducer,
    cards:cardsReducer,
    checkLists:checkListsSliceReducer,
    checkListItems: checkListItemsReducer
  
 

  },
});

export default store;
