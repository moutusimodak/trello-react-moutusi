
import { getData, postData, deleteData } from "../api/api";

import config from "../config/index";

const { apiKey, apiToken, baseUrl } = config;

export const fetchCheckListsService = async (cardId) => {
  const endpoint = `${baseUrl}/cards/${cardId}/checklists?key=${apiKey}&token=${apiToken}`;
  const checkLists = await getData(endpoint);
  return { cardId, checkLists };
};

export const createCheckListService = async (cardId, name) => {
  const endpoint = `${baseUrl}/cards/${cardId}/checklists?key=${apiKey}&token=${apiToken}`;
  return { cardId, checkList: await postData(endpoint, { name }) };
};

export const deleteCheckListService = async (checkListId) => {
  const endpoint = `${baseUrl}/checklists/${checkListId}?key=${apiKey}&token=${apiToken}`;
  await deleteData(endpoint);
  return checkListId;
};
