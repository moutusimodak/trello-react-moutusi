
import { getData, postData } from "../api/api";

const APIKey = import.meta.env.VITE_APIKEY;
const APIToken = import.meta.env.VITE_TOKEN;
const BaseUrl = import.meta.env.VITE_BASE_URL;

export const fetchBoards = async () => {
  const endpoint = `${BaseUrl}/members/me/boards?key=${APIKey}&token=${APIToken}`;
  try {
    return await getData(endpoint);
  } catch (error) {
    throw new Error(`Failed to fetch boards: ${error.message}`);
  }
};

export const addBoard = async (boardName, bgColor) => {
  const endpoint = `${BaseUrl}/boards/?key=${APIKey}&token=${APIToken}`;
  const payload = {
    name: boardName,
    prefs_background: bgColor,
  };
  try {
    return await postData(endpoint, payload);
  } catch (error) {
    throw new Error(`Failed to create board: ${error.message}`);
  }
};

