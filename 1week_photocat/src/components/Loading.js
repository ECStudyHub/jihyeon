import Component from "./Component.js";

export default class Loading extends Component {
  constructor($target, props) {
    const $container = document.createElement("div");
    $container.className = "loading";
    $target.appendChild($container);
    super($container, props);
  }
  setup() {
    this.state = { isLoading: this.props.isLoading };
  }
  template() {
    return `
        <div class='loading'>
            <div>loading... </div>
            <button class="reload">새로고침</button>
        </div>`;
  }
  mounted() {
    const { isLoading } = this.state;
    const $loading = document.querySelector(".loading");

    if (isLoading) {
      $loading.style.display = "block";
    } else {
      $loading.style.display = "none";
    }
  }

  setEvent() {
    this.addEvent("click", ".reload", () => {
      window.location.reload();
    });
  }
}
