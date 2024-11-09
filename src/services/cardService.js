
import { getData, postData, deleteData } from "../api/api";

import config from "../config/index";

const { apiKey, apiToken, baseUrl } = config;

export const fetchCardsService = async (listId) => {
  const endpoint = `${baseUrl}/lists/${listId}/cards?key=${apiKey}&token=${apiToken}`;
  const cards = await getData(endpoint);
  return { listId, cards };
};

export const createCardService = async (listId, cardName) => {
  const endpoint = `${baseUrl}/cards?name=${encodeURIComponent(
    cardName
  )}&idList=${listId}&key=${apiKey}&token=${apiToken}`;
  return await postData(endpoint);
};

export const deleteCardService = async (cardId) => {
  const endpoint = `${baseUrl}/cards/${cardId}?key=${apiKey}&token=${apiToken}`;
  await deleteData(endpoint);
  return cardId;
};
