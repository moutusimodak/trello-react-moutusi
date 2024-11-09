
import { getData, postData, putData } from "../api/api";

import config from "../config/index";

const { apiKey, apiToken, baseUrl } = config;

export const fetchListsService = async (boardId) => {
  const endpoint = `${baseUrl}/boards/${boardId}/lists?filter=open&key=${apiKey}&token=${apiToken}`;
  return await getData(endpoint);
};

export const createListService = async (boardId, listName) => {
  const endpoint = `${baseUrl}/lists?name=${encodeURIComponent(
    listName
  )}&idBoard=${boardId}&key=${apiKey}&token=${apiToken}`;
  return await postData(endpoint);
};

export const deleteListService = async (listId) => {
  const endpoint = `${baseUrl}/lists/${listId}/closed?value=true&key=${apiKey}&token=${apiToken}`;
  await putData(endpoint);
  return listId;
};
