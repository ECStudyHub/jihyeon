const BASE_URL = "https://h6uc5l8b1g.execute-api.ap-northeast-2.amazonaws.com/dev";

export const apiClient = {
  async fetch(url: string, options: RequestInit = {}) {
    const response = await fetch(`${BASE_URL}${url}`, {
      ...options,
      headers: {
        "Content-Type": "application/json",
        ...options.headers,
      },
    });

    if (!response.ok) {
      throw new Error("API 호출 에러");
    }

    return response.json();
  },
};
