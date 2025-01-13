export default class SearchResult {
  $searchResult = null;
  data = null;
  onClick = null;

  constructor({ $target, initialData, onClick }) {
    this.$searchResult = document.createElement("div");
    this.$searchResult.className = "SearchResult";
    $target.appendChild(this.$searchResult);

    this.data = initialData;
    this.onClick = onClick;

    this.render();
  }

  setState(nextData) {
    this.data = nextData;
    this.render();
  }

  render() {
    if (this.data.length === 0) {
      return (this.$searchResult.innerHTML = `<span> 검색 결과가 없습니다. </span>`);
    }

    this.$searchResult.innerHTML = this.data
      .map(
        (cat) => `
            <div class="item" data-name="${cat.name}">
              <img src=${cat.url} alt=${cat.name} />
            </div>
          `
      )
      .join("");

    this.$searchResult.addEventListener("click", (e) => {
      const $item = e.target.closest(".item");
      if ($item) {
        const items = Array.from(this.$searchResult.querySelectorAll(".item"));
        const index = items.indexOf($item);
        this.onClick(this.data[index]);
      }
    });
  }
}
