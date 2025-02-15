import Component from "./Component.js";
export default class SearchInput extends Component {
  constructor($target, props) {
    const $container = document.createElement("div");
    $container.className = "search-input";
    $target.appendChild($container);
    super($container, props);
  }
  template() {
    return `<input type="text" class="SearchInput" placeholder="고양이를 검색해보세요.|" />`;
  }

  mounted() {
    const $input = this.$target.querySelector(".SearchInput");
    if ($input) {
      $input.focus();
    }
    if (this.props.lastKeyword) {
      $input.value = this.props.lastKeyword;
    }
  }

  setEvent() {
    const { onSearch } = this.props;
    this.addEvent("keyup", ".SearchInput", (e) => {
      if (e.key !== "Enter") return;
      onSearch(e.target.value);
    });

    this.addEvent("click", ".SearchInput", (e) => {
      const $input = e.target.closest(".SearchInput");
      if ($input) {
        $input.value = "";
      }
    });
  }
}
