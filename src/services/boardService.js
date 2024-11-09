import { getData, postData, deleteData } from "../api/api";
import config from "../config/index";

const { apiKey, apiToken, baseUrl } = config;


export const fetchBoardsService = async () => {
  const endpoint = `${baseUrl}/members/me/boards?key=${apiKey}&token=${apiToken}`;
  return await getData(endpoint);
};


export const createBoardService = async (name, bgColor) => {
  const endpoint = `${baseUrl}/boards/?name=${encodeURIComponent(
    name
  )}&prefs_background=${bgColor}&key=${apiKey}&token=${apiToken}`;
  return await postData(endpoint, {});
};