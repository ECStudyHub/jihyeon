const API_ENDPOINT = "https://q9d70f82kd.execute-api.ap-northeast-2.amazonaws.com/dev";

const request = async (url) => {
  try {
    const result = await fetch(url);
    return result.json();
  } catch (e) {
    console.warn(e);
  }
};

export const api = {
  fetchCats: (keyword) => {
    return request(`${API_ENDPOINT}/api/cats/search?q=${keyword}`);
  },
};
