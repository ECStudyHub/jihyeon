export function storeSearch(keyword, data) {
  localStorage.setItem("lastKeyword", keyword);
  localStorage.setItem("lastData", JSON.stringify(data));
}

export function restoreLastSearch(setState) {
  const lastKeyword = localStorage.getItem("lastKeyword");
  const lastData = localStorage.getItem("lastData");
  if (lastKeyword && lastData) {
    setState(JSON.parse(lastData));
    document.querySelector(".SearchInput").value = lastKeyword;
  }
}
