import axios from "axios";

import { API_URL, KEY } from "../utils/config.js";

export const searchData = async (query) => {
  try {
    const response = await fetch(`${API_URL}?search=${query}&key=${KEY}`);
    const recipes = await response.json();
    return recipes;
  } catch (err) {
    console.error(`${err}`);
    throw err;
  }
};

export const getRecipe = async (id) => {
  try {
    const response = await fetch(`${API_URL}/${id}`);
    const recipe = await response.json();
    return recipe;
  } catch (err) {
    console.error(`${err}`);
    throw err;
  }
};

export const uploadRecipe = (data) => {
  console.log(data);
  axios
    .post(`${API_URL}?key=${KEY}`, data)
    .then((res) => console.log(res))
    .then(() => console.log("Upload successful"))
    .catch((error) => console.log(error));
};
