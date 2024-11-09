
import { getData, postData, deleteData, putData } from "../api/api";


import config from "../config/index";

const { apiKey, apiToken, baseUrl } = config;

export const fetchCheckItemsService = async (checkListId) => {
  const endpoint = `${baseUrl}/checklists/${checkListId}/checkItems?key=${apiKey}&token=${apiToken}`;
  const items = await getData(endpoint);
  return { checkListId, items };
};

export const createCheckItemService = async (checkListId, name) => {
  const endpoint = `${baseUrl}/checklists/${checkListId}/checkItems?name=${name}&key=${apiKey}&token=${apiToken}`;
  return { checkListId, item: await postData(endpoint) };
};

export const deleteCheckItemService = async (checkListId, itemId) => {
  const endpoint = `${baseUrl}/checklists/${checkListId}/checkItems/${itemId}?key=${apiKey}&token=${apiToken}`;
  await deleteData(endpoint);
  return { checkListId, itemId };
};

export const updateCheckItemStatusService = async (cardId, itemId, newStatus) => {
  const endpoint = `${baseUrl}/cards/${cardId}/checkItem/${itemId}?state=${newStatus ? "complete" : "incomplete"}&key=${apiKey}&token=${apiToken}`;
  await putData(endpoint);
  return { itemId, newStatus };
};
