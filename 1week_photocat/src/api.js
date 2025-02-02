const API_ENDPOINT = "https://q9d70f82kd.execute-api.ap-northeast-2.amazonaws.com/dev";

const request = async (url) => {
  try {
    const response = await fetch(url);
    if (!response.ok) {
      switch (response.status) {
        case 400:
          throw new Error("[400] 잘못된 요청입니다.");
        case 404:
          throw new Error("[404] 데이터를 찾을 수 없습니다.");
        case 500:
          throw new Error("[500] 서버 에러입니다.");
        default:
          throw new Error(`[code: ${response.status}] 알 수 없는 에러가 발생했습니다.`);
      }
    }
    return response.json();
  } catch (e) {
    console.warn(e);
  }
};

export const api = {
  fetchCats: (keyword) => {
    return request(`${API_ENDPOINT}/api/cats/search?q=${keyword}`);
  },
  fetchDetailCat: (id) => {
    return request(`${API_ENDPOINT}/api/cats/${id}`);
  },
  fetchRandDomCats: () => {
    return request(`${API_ENDPOINT}/api/caㄷts/random50`);
  },
};
