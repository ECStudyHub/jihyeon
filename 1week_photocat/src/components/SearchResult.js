import Component from "./Component.js";

export default class SearchResult extends Component {
  constructor($target, props) {
    const $container = document.createElement("div");
    $container.className = "search-result";
    $target.appendChild($container);
    super($container, props);
  }
  setup() {
    this.state = {
      data: this.props.initialData,
    };
  }

  template() {
    const { data } = this.state;

    if (data.length === 0) {
      return `<span> 검색 결과가 없습니다. </span>`;
    }

    return `${data
      .map(
        (cat) => `
            <div class="item" data-name="${cat.name}">
              <img loading="lazy" src=${cat.url} alt=${cat.name} />
            </div>
          `
      )
      .join("")}`;
  }

  setEvent() {
    const { onClick } = this.props;
    this.addEvent("click", ".item", (e) => {
      const $item = e.target.closest(".item");
      if ($item) {
        const items = Array.from(this.$target.querySelectorAll(".item"));
        const index = items.indexOf($item);
        onClick(this.state.data[index]);
      }
    });
  }
}
